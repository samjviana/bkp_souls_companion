from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from socket import socket

from json import loads

from logger import Logger


class DataHandler:
    _SET_GAME = None
    _LOG = None
    _GAME_DATA = None
    
    handlers: dict = None
    client: 'socket' = None

    def __init__(self) -> None:
        from event_handlers import SetGameHandler
        from event_handlers import LogHandler
        from event_handlers import GameDataHandler
        
        DataHandler._SET_GAME = SetGameHandler()
        DataHandler._LOG = LogHandler()
        DataHandler._GAME_DATA = GameDataHandler()

        DataHandler.handlers = {
            'set_game': DataHandler._SET_GAME,
            'log': DataHandler._LOG,
            'game_data': DataHandler._GAME_DATA
        }

    @staticmethod
    def handle(data: str) -> None:
        """
        Handle the received data

        #### Arguments:
            - data (`str`): The received data.
        """
        # TODO: Don't know why this is happening
        if data == '""':
            return
        
        try:
            data = loads(data)
            DataHandler._process(data)
        except Exception:
            Logger.info(data)

    @staticmethod
    def _process(data: dict) -> None:
        """
        Process the data

        #### Arguments:
            - data (`dict`): The data to process.
        """
        event = data['event']
        data = data['data']
        if event not in DataHandler.handlers:
            Logger.error(f'Event {event} not found.')
            return
        
        DataHandler.handlers[event].handle(data)