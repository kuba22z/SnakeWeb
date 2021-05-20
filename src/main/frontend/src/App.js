import "./App.css";
import GameBoard from "./Components/GameBoard";
import React, { useEffect, useRef, useState } from "react";
import ScoreBoard from "./Components/ScoreBoard";
import GameOver from "./Components/GameOver";
import { fetchAllUsers, updateRecord } from "./Store/User";

const STEP = 25;
const PARTSIZE = 23;

const INIT = {
  posX: STEP,
  posY: 2 * STEP,
  length: 4, //4 Rectangle
};
//Borders of the game board
const BORDERS = {
  highX: 500,
  lowX: 0,
  highY: 500,
  lowY: 0,
};

let direction = {
  x: STEP,
  y: 0,
  get: "right",
  changed: false,
};

function App() {
  function initSnake() {
    const temp = [];

    for (let i = 0, k = 3 * STEP; i < INIT.length; i++, k -= STEP) {
      temp.push({
        x: INIT.posX + k,
        y: INIT.posY,
      });
    }
    return temp;
  }

  const [snake, setSnake] = useState(initSnake);
  const [food, setFood] = useState(spawnFood);
  const [score, setScore] = useState(0);
  const [delay, setDelay] = useState(null);
  const [level, setLevel] = useState(null);
  let gameOver = false;

  function resetGame() {
    fetchAllUsers();
    setSnake(initSnake());
    setScore(0);
    direction = {
      x: STEP,
      y: 0,
      get: "right",
      changed: false,
    };
  }

  function spawnFood() {
    let temp = [];
    let colors = [
      "#c0c0c0",
      "#808080",
      "#800000",
      "#ff0000",
      "#800080",
      "#ff00ff",
      "#008000",
      "#00ff00",
      "#808000",
      "#ffff00",
      "#000080",
      "#0000ff",
    ];
    let color = colors[Math.floor(Math.random() * colors.length)];
    do {
      temp = {
        //Math.floor round down the argument
        x:
          Math.floor(
            (Math.random() * (BORDERS.highX - BORDERS.lowX + 1) +
              BORDERS.lowX) /
              STEP
          ) * STEP,
        y:
          Math.floor(
            (Math.random() * (BORDERS.highY - BORDERS.lowY + 1) +
              BORDERS.lowY) /
              STEP
          ) *
            STEP +
          BORDERS.lowY,
        color: color,
      };
    } while (collision(temp.x, temp.y));
    return temp;
  }

  function checkSpawnFood() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(spawnFood());
      snake.push({
        x: snake[snake.length - 1].x,
        y: snake[snake.length - 1].y,
      });
      setSnake(snake);
      setScore(score + 1);
    }
  }

  const trackOnKey = (key) => {
    if (direction.changed) return; //to synchronize changing direction with game speed

    if (key === "ArrowUp" && direction.get !== "down") {
      //to disable changing in a opposite direction
      direction.get = "up";
    } else if (key === "ArrowDown" && direction.get !== "up") {
      direction.get = "down";
    } else if (key === "ArrowRight" && direction.get !== "left") {
      direction.get = "right";
    } else if (key === "ArrowLeft" && direction.get !== "right") {
      direction.get = "left";
    }
    direction.changed = true;
  };

  function moveAllParts() {
    //set Direction
    switch (direction.get) {
      case "down":
        direction.x = 0;
        direction.y = STEP;
        break;
      case "up":
        direction.x = 0;
        direction.y = -STEP;
        break;
      case "right":
        direction.x = STEP;
        direction.y = 0;
        break;
      case "left":
        direction.x = -STEP;
        direction.y = 0;
    }
    //The first(head of Snake) Rectangle indicates the direction of Snake
    //change position of the first Rectanngle according to Key pressed
    const newX = snake[0].x + direction.x;
    const newY = snake[0].y + direction.y;
    let newSnake = [
      {
        x: newX,
        y: newY,
      },
    ];
    //The remaining Rectangles follow the first Rectangle -> shift of the postions
    // eslint-disable-next-line array-callback-return
    for (let i = 1; i < snake.length; i++) newSnake.push(snake[i - 1]);

    setSnake(newSnake); //this will be show the new Snake
  }

  function checkEnd() {
    if (
      snake[0].x >= BORDERS.highX ||
      snake[0].x < BORDERS.lowX ||
      snake[0].y >= BORDERS.highY ||
      snake[0].y < BORDERS.lowY ||
      collision(snake[0].x, snake[0].y)
    ) {
      gameOver = true;
      updateRecord(score);
      return false;
    }
    return true;
  }

  function collision(X, Y) {
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === X && snake[i].y === Y) return true;
    }
    return false;
  }

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      trackOnKey(e.key);
    });
  }, []);

  useInterval(
    () => {
      //will be called every value of delay
      moveAllParts();
      checkSpawnFood();
      direction.changed = false;
    },
    checkEnd() ? delay : null
  );

  function stopGame() {
    setLevel(delay);
    setDelay(null);
  }

  function continueGame(delay = level) {
    setDelay(delay);
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  return (
    <div className="app">
      <div className="game">
        <ScoreBoard
          score={score}
          continueGame={continueGame}
          resetGame={resetGame}
          stopGame={stopGame}
        />
        <GameBoard
          snake={snake}
          size={PARTSIZE}
          borders={BORDERS}
          food={food}
        />
        {gameOver ? <GameOver resetGame={resetGame} score={score} /> : false}
      </div>
    </div>
  );
}

export default App;
