import { currentUser } from "../Store/User";
import logo from "../logo.svg";
import Menu from "./Menu";
import Ranking from "./Ranking";

const ScoreBoard = ({ score, resetGame, continueGame, stopGame }) => {
  return (
    <header className="scoreBoard">
      <img
        src={logo}
        width={100}
        height={100}
        className="App-logo"
        alt="logo"
      />
      <ul className="headerlist">
        <li>
          <Menu
            continueGame={continueGame}
            stopGame={stopGame}
            resetGame={resetGame}
          />
        </li>
        <li>
          <Ranking
            score={score}
            continueGame={continueGame}
            stopGame={stopGame}
          />
        </li>
        <li>{currentUser ? currentUser.name : "Guest"}</li>
        <li>score:{score}</li>
        <li>record:{currentUser ? currentUser.record : 0}</li>
      </ul>
    </header>
  );
};
export default ScoreBoard;
