
import React from 'react';
import Modal from 'react-modal';

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

const Menu= ({start}) => {
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

   /* function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }*/
    function startGame(){
        start()
        closeModal()
    }

    function closeModal(){
        setIsOpen(false);
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
                <form>
                    <div className="user">
                    <label>User name</label><br/>
                    <input id="userName" type="text"/> <br/> <br/>
                    </div>

                    <label>Level of Difficulty</label><br/>
                    <select>
                        <option>easy</option>
                        <option selected>medium</option>
                        <option>hard</option>
                    </select><br/> <br/>

                </form>

                    <button onClick={startGame}>Start </button>
                </div>

            </Modal>
        </div>
    );

}


export default Menu

