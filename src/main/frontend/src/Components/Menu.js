
import React from 'react';
import Modal from 'react-modal';
import axios from "axios";
import {useState} from 'react'

const port=8080;

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width : "400px",
        background : "dodgerblue"
    }
};

const Menu= ({setDelay,setUser,resetGame}) => {
    const [modalIsOpen,setIsOpen] = React.useState(true);

    function openModal() {
        setDelay(null)
        setIsOpen(true);
    }

    function closeModal(){
        determineLevel()
        setIsOpen(false);
    }
    function determineLevel(){
        switch(level) {
            case 'easy':
                setDelay(250)
                break
            case 'medium':
                setDelay(100)
                break
            case 'hard':
                setDelay(50)
        }
    }


    /* function afterOpenModal() {
         // references are now sync'd and can be accessed.
         subtitle.style.color = '#f00';
     }*/
    const [userName, setUserName] = useState('')
    const [level, setLevel] = useState("easy")
    let [message,setMessage] =useState('')


    const addUser = (user) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        //to add new Student to otherStudents
        // setotherStudents([...otherstudents,newStudent])



        axios.post("http://localhost:"+port.toString()+"/api/user", user, {headers})
            .then(res => {
                console.log(res.data);
            }).catch(error => {
            console.log(error.response)
            setMessage("can't connect to the database. You will play as guest");
        })
    }

   const onSubmit= (e) => {
       if (!userName ) {
           alert('Please add a name');
           return;
       }

        addUser({
            name:userName
            ,record: 0
        })
       if(message!=='')
           alert(message);

        setUser(userName)

      determineLevel()

       closeModal()
        setUserName('')
       setMessage('')
       resetGame()
    }
    const asGuest = (e) => {

        switch(level) {
            case 'easy':
                setDelay(250)
                break
            case 'medium':
                setDelay(100)
                break
            case 'hard':
                setDelay(50)
        }
        setLevel('easy')
        closeModal()
        resetGame()
    }


    return (
        <div>
            <button className="menuBtn" onClick={openModal}>Menu</button>

            <Modal
                isOpen={modalIsOpen}
               /* onAfterOpen={afterOpenModal}*/
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2>SnakeWeb</h2>

                <button className="close" onClick={closeModal}>&times;</button>

                <div className="menuForm">
                <form onSubmit={onSubmit}>
                    <div className="user">
                    <label>User name</label><br/>
                    <input id="userName" type="text" value={userName} onChange={(e) => setUserName
                    (e.target.value)}/> <br/> <br/>
                    </div>

                    <label>Level of Difficulty</label><br/>
                    <select onChange=
                        {(e) => setLevel
                        (e.target.value)}
                       value={level}>
                        <option>easy</option>
                        <option selected>medium</option>
                        <option>hard</option>
                    </select><br/> <br/>
                    <input type='submit' value="Start"/>
                    <br/> <br/>
                </form>

                    <button onClick={asGuest}>Start as Guest </button>
                </div>

            </Modal>
        </div>
    );

}


export default Menu

