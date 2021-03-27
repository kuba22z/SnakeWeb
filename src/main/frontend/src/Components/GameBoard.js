import React from "react";
import Snake from "./Snake";

const GameBoard= ({snake}) => {

    return (
        <svg width={500} height={500} style={{background: "#9FF", display: "block" ,margin:"auto"}}>
            <Snake snake={snake} />
        </svg>
    );
}
export default GameBoard