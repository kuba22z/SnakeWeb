import React from "react";
import logo from "../logo.svg";
import Menu from "./Menu";
import Ranking from "./Ranking";
const ScoreBoard= ({score,start}) => {
    return (
        <header className="scoreBoard">
            <img src={logo} width={100} height={100} className="App-logo" alt="logo"/>
            <ul className="headerlist">
                <li><Menu start={start} /></li>
                <li><Ranking /></li>
                <li>score:{score}</li>
                <li>record:</li>
                </ul>
            </header>
    );
}
export default ScoreBoard