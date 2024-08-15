from data_handler import DataHandler
from game_manager import GameManager
from memory_watcher import MemoryWatcher
from logger import Logger

Logger()

DataHandler()
GameManager()

MemoryWatcher(debug=True)
MemoryWatcher.main_loop()