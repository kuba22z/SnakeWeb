import React, {useState,useEffect} from "react";
import logo from "../logo.svg";
import Menu from "./Menu";
import Ranking from "./Ranking";
import axios from "axios";
const port=8080;

const ScoreBoard= ({score,setDelay,resetGame}) => {
    const [user,setUser] =useState('')

 function setcurrentUser(currentUser){
     if(currentUser!=='') {
         axios.get("http://localhost:" + port.toString() + "/api/user/" + currentUser).then(res => {
             console.log(res);
             setUser(res.data)
         });
     }
    }
    return (
        <header className="scoreBoard">
            <img src={logo} width={100} height={100} className="App-logo" alt="logo"/>
            <ul className="headerlist">
                <li><Menu setDelay={setDelay} setUser={setUser} resetGame={resetGame} /></li>
                <li><Ranking /></li>
                <li>{user ? user : "Guest"}</li>
                <li>score:{score}</li>
                <li>record:{user ? user.record : 0}</li>
                </ul>
            </header>
    );
}
export default ScoreBoard