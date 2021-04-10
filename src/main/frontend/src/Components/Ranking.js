
import React from 'react';
import Modal from 'react-modal';
import Menu from "./Menu";
import SnakePart from "./SnakePart";


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

const Ranking= () => {
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
    let i=0;
    /* function afterOpenModal() {
         // references are now sync'd and can be accessed.
         subtitle.style.color = '#f00';
     }*/
    function closeModal(){
        setIsOpen(false);
    }

    return (
        <div>
            <button className="menuBtn" onClick={openModal}>Ranking</button>
            <Modal
                isOpen={modalIsOpen}
                /* onAfterOpen={afterOpenModal}*/
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >

                <h2>Ranking</h2>

                <button className="close" onClick={closeModal}>&times;</button>
                <div className="rankTable">
                <table  >
                    <tr className="rankHeaderRow">
                        <th>position</th>
                        <th>user</th>
                        <th>highest score</th>

                    </tr>


                    {[["user",1]].map((score, index) => {
                        i+=1;
                        return (
                            <tr className="rankRow">
                                <td >{i}</td>
                                <td>{score[0]}</td>
                                <td >{score[1]}</td>

                            </tr>
                        )
                    })}
                </table>
                </div>





            </Modal>
        </div>
    );

}


export default Ranking

