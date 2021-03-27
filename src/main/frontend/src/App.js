import logo from './logo.svg';
import './App.css';
import GameBoard from "./Components/GameBoard";

const INIT_POSX = 80;
const INIT_POSY = 80;
const INIT_LENGHT = 4; //4 Rectangle ->4X20
const SIZE =20;






function App() {

    class snake {
        direction= 'right';

        constructor() {

            this.state = []

            for (let i = 0, k = 3 * SIZE; i < INIT_LENGHT; i++, k -= SIZE) {
                this.state.push({
                    x: INIT_POSX + k,
                    y: INIT_POSY,
                    width: SIZE,
                    height: SIZE
                });
            }

        }
    }
  return (
      <div className="app">
        <div className="game">
          <header className="scoreBoard">
            <img src={logo} width={100} height={100} className="App-logo" alt="logo" />
          </header>
          <GameBoard snake={new snake().state} />
        </div>
      </div>
  );
}

export default App;