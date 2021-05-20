import React from "react";
import Modal from "react-modal";
import { fetchAllUsers, users } from "../Store/User";

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

const Ranking = ({ continueGame, stopGame }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    stopGame();
    setIsOpen(true);
    fetchAllUsers();
  }

  function closeModal() {
    setIsOpen(false);
    continueGame();
  }

  return (
    <div>
      <button className="menuBtn" onClick={openModal}>
        Ranking
      </button>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Ranking</h2>

        <button className="close" onClick={closeModal}>
          &times;
        </button>
        <div className="rankTable">
          <table>
            <thead>
              <tr className="rankHeaderRow">
                <th>position</th>
                <th>user</th>
                <th>highest score</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 10).map((user, index) => {
                return (
                  <tr key={index + "tr"} className="rankRow">
                    <td key={-user.id}>{index + 1}</td>
                    <td key={user.name}>{user.name}</td>
                    <td key={user.id}>{user.record}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default Ranking;
