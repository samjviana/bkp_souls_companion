from game_manager import GameManager
from logger import Logger
from memory_watcher import MemoryWatcher
from .event_handler import EventHandler


class LogHandler(EventHandler):
    def __init__(self) -> None:
        super().__init__()

    def handle(self, log: dict) -> None:
        """
        Log the received data

        #### Arguments:
            - data (`dict`): The received data.
        """
        getattr(Logger, log['level'])(log['message'])