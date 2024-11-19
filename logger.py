from logging import getLogger, basicConfig
from logging import INFO
from logging import FileHandler, StreamHandler, Formatter


class Logger:
    logger = None

    def __init__(self) -> None:
        Logger.logger = getLogger('souls_companion')
        Logger.logger.setLevel(INFO)

        file_handler = FileHandler('souls_companion.log')
        stream_handler = StreamHandler()

        formatter = Formatter('[%(asctime)s] [%(levelname)s] %(message)s', datefmt='%d/%m/%Y %H:%M:%S')
        file_handler.setFormatter(formatter)
        stream_handler.setFormatter(formatter)

        Logger.logger.addHandler(file_handler)
        Logger.logger.addHandler(stream_handler)

    @staticmethod
    def info(message):
        Logger.logger.info(message)

    @staticmethod
    def debug(message):
        Logger.logger.debug(message)

    @staticmethod
    def warning(message):
        Logger.logger.warning(message)

    @staticmethod
    def error(message):
        Logger.logger.error(message)

    @staticmethod
    def critical(message):
        Logger.logger.critical(message)