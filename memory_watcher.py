from configparser import ConfigParser
from json import dumps
from socket import socket
from threading import Thread
from data_handler import DataHandler
from pathlib import Path
from frida import attach, ProcessNotFoundError
from time import sleep
import sys

from game_manager import GameManager
from logger import Logger


class MemoryWatcher:
    debug: bool = False
    is_server_running: bool = False
    is_frida_running: bool = False
    host: str = ''
    port: int = 0
    server: socket = None
    server_thread: Thread = None
    frida_thread: Thread = None

    def __init__(self, debug: bool = False) -> None:
        if not Path('config.ini').exists():
            Logger.warning('Config file not found. Creating a new one.')
            with open('config.ini', 'w') as f:
                f.write('[socket]\nhost = 127.0.0.1\nport = 9090')

        config = ConfigParser()
        config.read('config.ini')

        MemoryWatcher.debug = debug
        MemoryWatcher.is_server_running = False      
        MemoryWatcher.is_frida_running = False  

        try:
            MemoryWatcher.host = config['socket']['host']
            MemoryWatcher.port = int(config['socket']['port'])

            MemoryWatcher.server = socket()
            MemoryWatcher.server.bind((MemoryWatcher.host, MemoryWatcher.port))
            MemoryWatcher.server_thread = Thread(target=MemoryWatcher._start_server)

            MemoryWatcher.init_frida()

            MemoryWatcher.is_server_running = True
        except Exception as ex:
            Logger.error(f'Unexpected error: {ex}')
            return
        
        MemoryWatcher.server_thread.start()

    @staticmethod
    def _start_server() -> None:
        """
        Start the server thread to listen for incoming connections
        """
        MemoryWatcher.server.listen()
        Logger.info(f'Server started at {MemoryWatcher.host}:{MemoryWatcher.port}')

        while MemoryWatcher.is_server_running:
            client, address = MemoryWatcher.server.accept()
            Logger.info(f'Client connected from {address}')

            client_thread = Thread(target=MemoryWatcher._handle_client, args=(client,))
            DataHandler.client = client
            client_thread.start()

    @staticmethod
    def init_frida() -> None:
        """
        Initialize the Frida thread
        """
        MemoryWatcher.frida_thread = Thread(target=MemoryWatcher._start_frida)

    @staticmethod
    def _on_message(message: dict, data: dict) -> None:
        """
        Handle the Frida message

        #### Arguments:
            - message (`dict`): The message.
            - data (`dict`): The data.
        """
        payload = ''
        if message['type'] == 'send':
            payload = dumps(message['payload'])
        elif message['type'] == 'error':
            error_msg = f'{message["description"]} - {message["fileName"]}:{message["lineNumber"]}:{message["columnNumber"]}\n'
            error_msg += f'{message["stack"]}\n'
            payload = dumps({
                'event': 'log',
                'data': {
                    'level': 'error',
                    'message': error_msg
                }
            })

        DataHandler.handle(payload)

    @staticmethod
    def _start_frida() -> None:
        """
        Start the Frida script
        """
        if GameManager.current_game is None or GameManager.current_game == '':
            Logger.info('No game selected.')
            return

        script = MemoryWatcher._load_script()

        while True:
            try:
                session = attach(GameManager.current_game.executable)
                break
            except ProcessNotFoundError as ex:
                sleep(250 / 1000) # 250ms

        script = session.create_script(script)
        script.on('message', MemoryWatcher._on_message)
        script.load()

        MemoryWatcher.is_frida_running = True

        script.exports.start()

        while MemoryWatcher.is_frida_running:
            pass

        script.unload()
        session.detach()

    def stop_frida() -> None:
        """
        Stop the Frida script
        """
        MemoryWatcher.is_frida_running = False
        MemoryWatcher.frida_thread.join()
        MemoryWatcher.frida_thread = None
        
    @staticmethod
    def _load_script() -> str:
        """
        Load the Frida script

        #### Returns:
            - `str`: The Frida script
        """
        if hasattr(sys, '_MEIPASS'):
            base_path = Path(sys._MEIPASS)
        else:
            base_path = Path(__file__).parent
        global_folder = base_path / 'js'
        game_assets_folder = base_path / 'js' / 'games' / GameManager.current_game.assets_folder

        global_files = global_folder.glob('*.js')
        game_files = game_assets_folder.rglob('*.js')
        files = list(global_files) + list(game_files)

        script = MemoryWatcher._load_script_globals()
        for file in files:
            file_name = file.name
            with open(file, 'r') as f:
                script += f'// {file_name}\n'
                script += f.read()
                script += '\n\n'

        if MemoryWatcher.debug:
            with open('script.js', 'w') as f:
                f.write(script)

        return script

    @staticmethod
    def _load_script_globals() -> str:
        """
        Load the Frida script globals

        #### Returns:
            - `str`: The Frida script globals
        """
        script = '// globals\n'
        script += f'const mainModule = \'{GameManager.current_game.executable}\';'
        script += '\n\n'

        return script

    @staticmethod
    def _handle_client(client: socket) -> None:
        """
        Handle the client connection

        #### Arguments:
            - client (`socket`): The client socket.
        """
        try:
            while True:
                data = client.recv(1024)
                if not data:
                    break

                DataHandler.handle(data.decode())
        except Exception as ex:
            Logger.error(f'Unexpected error: {ex}')
        finally:
            client.close()

    @staticmethod
    def send_data(data: dict) -> None:
        """
        Initiate a new thread to send data to the client
        """
        sender_thread = Thread(target=MemoryWatcher._send_data, args=(data,))
        sender_thread.start()

    @staticmethod
    def _send_data(data: dict) -> None:
        """
        Send data to the client

        #### Arguments:
            - data (`dict`): The data to send.
        """
        try:
            payload = dumps(data)
            DataHandler.client.sendall(payload.encode())
        except Exception as ex:
            Logger.error(f'Unexpected error while sending data: {ex}')

    @staticmethod
    def main_loop() -> None:
        """
        Main loop
        """
        while MemoryWatcher.is_server_running:
            pass

        if MemoryWatcher.server_thread is not None:
            MemoryWatcher.server_thread.join()
        
        if MemoryWatcher.frida_thread is not None:
            MemoryWatcher.frida_thread.join()