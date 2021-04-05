import React from "react";
import logo from "../logo.svg";
const ScoreBoard= ({score}) => {
    return (
        <header className="scoreBoard">
            <img src={logo} width={100} height={100} className="App-logo" alt="logo"/>
            <ul className="headerlist">
                <li>score:{score}</li>
                <li>record:</li>
                </ul>
            </header>
    );
}
export default ScoreBoard