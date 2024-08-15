from games.ds1r_config import DS1RConfig
from games.er_config import ERConfig
from games.game_config import GameConfig


class GameManager:
    games: dict[str, GameConfig] = None
    current_game: GameConfig = None

    def __init__(self) -> None:
        GameManager.games = {
            'Dark Souls Remastered': DS1RConfig(),
            'Elden Ring': ERConfig()
        }

    @staticmethod
    def set_game(game: str) -> None:
        """
        Sets the current game to have its data updated.

        #### Arguments:
            - game (`str`): The game to set.
        """
        if game == '':
            GameManager.current_game = None
        if game not in GameManager.games:
            return

        GameManager.current_game = GameManager.games[game]