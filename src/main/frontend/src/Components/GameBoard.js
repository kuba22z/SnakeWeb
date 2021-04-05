import React from "react";
import Snake from "./Snake";
import Food from "./Food";

const GameBoard= ({snake,size,borders,food}) => {

    return (
        <svg width={borders.highY-borders.lowY} height={borders.highX-borders.lowX} style={{background: "#9FF", display: "block" ,margin:"auto"}}>
            <Snake snake={snake} size={size} />
            <Food part={food} size={size}/>
        </svg>
    );
}
export default GameBoard