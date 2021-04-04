import React from "react";
import Snake from "./Snake";

const GameBoard= ({snake,size,borders}) => {

    return (
        <svg width={borders.highY-borders.lowY} height={borders.highX-borders.lowX} style={{background: "#9FF", display: "block" ,margin:"auto"}}>
            <Snake snake={snake} size={size} />
        </svg>
    );
}
export default GameBoard