from game_manager import GameManager
from memory_watcher import MemoryWatcher
from .event_handler import EventHandler


class GameDataHandler(EventHandler):
    def __init__(self) -> None:
        super().__init__()

    def handle(self, data: dict) -> None:
        """
        Handles the game data received from the frida client.

        #### Arguments:
            - data (`dict`): The game data.
        """
        MemoryWatcher.send_data(data)