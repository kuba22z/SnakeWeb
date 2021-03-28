import logo from './logo.svg';
import './App.css';
import GameBoard from "./Components/GameBoard";
import React, {useEffect, useRef, useState} from "react";

const INIT_POSX = 80;
const INIT_POSY = 80;
const INIT_LENGHT = 4; //4 Rectangle ->4X20
const SIZE = 20;

const HIGH_X = 400;
const LOW_X = 0;
const HIGH_Y = 400;
const LOW_Y = 40;         //=40 because of the Label score
const PANE_WID = HIGH_X - LOW_X;
const PANE_HEI = HIGH_Y - LOW_Y;

let x = SIZE, y = 0;
let direction = 'right'
let directionChanged = false

function App() {

  function initSnake(){
        const temp =[];

       for (let i = 0, k = 3 * SIZE; i < INIT_LENGHT; i++, k -= SIZE) {
         temp.push({
               x: INIT_POSX + k,
               y: INIT_POSY,
               width: SIZE,
               height: SIZE
           });
       }
    return temp;

    }
    const [snake, setSnake] = useState(initSnake);


    useEffect(() => {
        window.addEventListener('keydown', e => {

            trackOnKey(e.key);
        });
    }, []);

    const trackOnKey = key => {
        if(directionChanged) return

        if (key==='ArrowUp'&& direction !== "down") { //Dir==2 to disable changing in a opposite direction
        direction='up'
        } else if (key==='ArrowDown' && direction !== 'up') {
           direction='down'
        } else if (key==='ArrowRight' && direction !=='left') {
          direction='right'
        } else if (key==='ArrowLeft' && direction !=='right') {
         direction='left'
        }
        directionChanged=true;
    };


    function moveAllParts() {

        switch (direction) {    //set Direction
            case 'down':
                x = 0;
                y = SIZE;
                break;
            case 'up':
                x = 0;
                y = -SIZE;
                break;
            case 'right':
                x = SIZE;
                y = 0;
                break;
            case 'left':
                x = -SIZE;
                y = 0;
        }
//The first(head of Snake) Rectangle indicates the direction of Snake
//change position of the first Rectanngle according to Key pressed
        const newX=snake[0].x+x
        const newY=snake[0].y+y
      let newSnake =[{
                x: newX,
                y: newY,
                width:20,
                height:20
        }
        ]
//The remaining Rectangles follow the first Rectangle -> shift of the postions
// eslint-disable-next-line array-callback-return
        for (let i=1; i<snake.length;i++)
            newSnake.push(snake[i - 1])

        setSnake(newSnake)
    }
 function checkEnd() {
        if (snake[0].x >= HIGH_X || snake[0].x < LOW_X ||
            snake[0].y >= HIGH_Y || snake[0].y < LOW_Y ||
            collision(snake[0].x, snake[0].y)) {
            return true;
           // update_highscore();

          //  isRunning = false;

        }
        return false;
    }
 function collision( X, Y) {    //prove whether parts(Snake) collided with X and Y
    // const exists = snake.some(v => (v.x === X && v.y === Y && v!==snake[0]));

        for (let i = 1; i < snake.length; i++) {
            if ( snake.some(v => (v.x === X && v.y === Y && v!==snake[0])))
                return true;
        }
        return false;
    }

    useInterval(() => {
            //will be called every 500ms
        if(!checkEnd())
            moveAllParts()
            directionChanged=false;
        }
        , 250)

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
                <header className="scoreBoard">
                    <img src={logo} width={100} height={100} className="App-logo" alt="logo"/>
                </header>
                <GameBoard snake={snake} />

            </div>
        </div>
    );
}

export default App;