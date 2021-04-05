import './App.css';
import GameBoard from "./Components/GameBoard";
import randomColor from "randomcolor";
import React, {useEffect, useRef, useState} from "react";
import ScoreBoard from "./Components/ScoreBoard";

const STEP = 20;
const PARTSIZE = 18;

const INIT ={
    posX : 20,
    posY : 80,
    length : 4 //4 Rectangle
}
//Borders of the game board
const BORDERS ={
    highX : 500,
    lowX : 0,
    highY: 500,
    lowY: 0
}
let delay=100;
let direction ={
    x : STEP,
    y : 0,
    get: "right",
    changed : false
}


function App() {

  function initSnake(){
        const temp =[];

       for (let i = 0, k = 3 * STEP; i < INIT.length; i++, k -= STEP) {
         temp.push({
               x: INIT.posX + k,
               y: INIT.posY,
           });
       }
    return temp;

    }
    const [snake, setSnake] = useState(initSnake)
    const [food, setFood] = useState(spawnFood)

    function spawnFood() {
        let temp =[];
        let color= randomColor() ;
        if(color==="#9FF")
            color="red"
        do{
            temp={ //Math.floor round down the argument
                x:  Math.floor((Math.random() * (BORDERS.highX - BORDERS.lowX + 1) + BORDERS.lowX)/STEP)*STEP,
                y:   Math.floor((Math.random() * (BORDERS.highY - BORDERS.lowY + 1) + BORDERS.lowY)/STEP)*STEP +BORDERS.lowY,
                color : color
            };
        }
        while (collision(temp.x, temp.y));
       return temp
    }
    function checkSpawnFood(){
        if (snake[0].x === food.x && snake[0].y === food.y) {
            setFood(spawnFood())
            snake.push({
                 x : snake[snake.length-1].x,
                 y : snake[snake.length-1].y
                })
            setSnake(snake)
        }
    }

    const trackOnKey = key => {
        if(direction.changed) return //to synchronize changing direction with game speed

        if (key==='ArrowUp'&& direction.get !== "down") { //to disable changing in a opposite direction
        direction.get='up'
        } else if (key==='ArrowDown' && direction.get !== 'up') {
           direction.get='down'
        } else if (key==='ArrowRight' && direction.get !=='left') {
          direction.get='right'
        } else if (key==='ArrowLeft' && direction.get !=='right') {
         direction.get='left'
        }
        direction.changed=true;
    };

    function moveAllParts() {
        //set Direction
        switch (direction.get) {
            case 'down':
                direction.x = 0;
                direction.y = STEP;
                break;
            case 'up':
                direction.x = 0;
                direction.y = -STEP;
                break;
            case 'right':
                direction.x = STEP;
                direction.y = 0;
                break;
            case 'left':
                direction.x = -STEP;
                direction.y = 0;
        }
//The first(head of Snake) Rectangle indicates the direction of Snake
//change position of the first Rectanngle according to Key pressed
        const newX=snake[0].x+direction.x
        const newY=snake[0].y+direction.y
      let newSnake =[{
                x: newX,
                y: newY,
        }]
//The remaining Rectangles follow the first Rectangle -> shift of the postions
// eslint-disable-next-line array-callback-return
        for (let i=1; i<snake.length;i++)
            newSnake.push(snake[i - 1]);

        setSnake(newSnake) //this will be show the new Snake
    }
 function checkEnd() {
            return !(snake[0].x >=BORDERS.highX  || snake[0].x < BORDERS.lowX ||
                snake[0].y >= BORDERS.highY || snake[0].y < BORDERS.lowY ||
                collision(snake[0].x, snake[0].y));
    }
 function collision( X, Y) {
        for (let i = 1; i < snake.length; i++) {
            if ( snake[i].x === X && snake[i].y === Y)
                return true;
        }
        return false;
    }

    useEffect(() => {
        window.addEventListener('keydown', e => {
            trackOnKey(e.key);
        });
    }, []);

    useInterval(() => {
            //will be called every value of delay

            moveAllParts()
            checkSpawnFood()
            direction.changed = false;
        }
        , checkEnd() ? delay : null)

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
                <ScoreBoard />
                <GameBoard snake={snake} size={PARTSIZE} borders={BORDERS} food={food} />

            </div>
        </div>
    );
}

export default App;