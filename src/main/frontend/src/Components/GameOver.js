
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

const GameOver= ({resetGame}) => {
    const [modalIsOpen,setIsOpen] = React.useState(true);

    function closeModal(){
        setIsOpen(false);
    }

    return (
        <div>
            <Modal
                isOpen={modalIsOpen}
                /* onAfterOpen={afterOpenModal}*/
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
<div className="gameOverModal">
                <h2>GameOver</h2>

                    <button onClick={resetGame}>Again</button>
</div>
            </Modal>
        </div>
    );

}


export default GameOver
