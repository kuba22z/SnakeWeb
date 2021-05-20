import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import { addUser, fetchAllUsers, setUserToGuest } from "../Store/User";

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

const Menu = ({ continueGame, stopGame, resetGame }) => {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function openModal() {
    stopGame();
    setIsOpen(true);
  }

  function closeModal() {
    fetchAllUsers();
    determineLevel();
    setIsOpen(false);
  }
  function determineLevel() {
    switch (level) {
      case "easy":
        continueGame(250);
        break;
      case "medium":
        continueGame(100);
        break;
      case "hard":
        continueGame(50);
    }
  }

  const [userName, setUserName] = useState("");
  const [level, setLevel] = useState("easy");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!userName) {
      alert("Please add a name");
      return;
    }

    addUser({
      name: userName,
      record: 0,
    });
    fetchAllUsers();

    determineLevel();

    closeModal();
    setUserName("");
    resetGame();
  };
  const asGuest = () => {
    determineLevel();
    setUserToGuest();
    fetchAllUsers();
    setLevel("easy");
    closeModal();
    resetGame();
  };

  return (
    <div>
      <button className="menuBtn" onClick={openModal}>
        Menu
      </button>

      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        /* onAfterOpen={afterOpenModal}*/
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>SnakeWeb</h2>

        <button className="close" onClick={closeModal}>
          &times;
        </button>

        <div className="menuForm">
          <form onSubmit={onSubmit}>
            <div className="user">
              <label>User name</label>
              <br />
              <input
                id="userName"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />{" "}
              <br /> <br />
            </div>
            <label>Level of Difficulty</label>
            <br />
            <select onChange={(e) => setLevel(e.target.value)} value={level}>
              <option>easy</option>
              <option>medium</option>
              <option>hard</option>
            </select>
            <br /> <br />
            <input type="submit" value="Start" />
            <br /> <br />
          </form>

          <button onClick={asGuest}>Start as Guest </button>
        </div>
      </Modal>
    </div>
  );
};

export default Menu;
