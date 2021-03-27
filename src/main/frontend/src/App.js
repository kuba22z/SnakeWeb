import logo from './logo.svg';
import './App.css';
import GameBoard from "./Components/GameBoard";

function App() {

  return (
      <div className="app">
        <div className="game">
          <header className="scoreBoard">
            <img src={logo} width={100} height={100} className="App-logo" alt="logo" />
          </header>
          <GameBoard />
        </div>
      </div>
  );
}

export default App;