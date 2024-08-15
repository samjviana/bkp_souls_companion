from game_manager import GameManager
from memory_watcher import MemoryWatcher
from .event_handler import EventHandler


class SetGameHandler(EventHandler):
    def __init__(self) -> None:
        super().__init__()

    def handle(self, game: str) -> None:
        """
        Sets the current game to have its data updated.

        #### Arguments:
            - data (`str`): The game to set.
        """
        GameManager.set_game(game)

        if MemoryWatcher.is_frida_running:
            MemoryWatcher.stop_frida()	

        MemoryWatcher.init_frida()
        MemoryWatcher.frida_thread.start()