import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    background: "dodgerblue",
  },
};

const GameOver = ({ resetGame }) => {
  const [modalIsOpen] = React.useState(true);

  return (
    <div>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
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
};

export default GameOver;
