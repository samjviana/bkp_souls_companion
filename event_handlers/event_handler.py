from typing import Any


class EventHandler:
    def __init__(self) -> None:
        pass

    def handle(self, data: Any) -> None:
        """
        Handle the data

        #### Arguments:
            - data (`Any`): The data to handle.
        """
        raise NotImplementedError