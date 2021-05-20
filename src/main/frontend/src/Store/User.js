import axios from "axios";

const port = 8081;

export var currentUser = [];
export var users = [];

export function fetchAllUsers() {
  axios
    .get("http://localhost:" + port + "/api/user")
    .then((res) => {
      console.log(res);
      users = res.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export const addUser = (newUser) => {
  const headers = {
    "Content-Type": "application/json",
  };
  axios
    .post("http://localhost:" + port + "/api/user", newUser, {
      headers,
    })
    .then((res) => {
      console.log(res);
      currentUser = res.data;
    })
    .catch((error) => {
      console.log(error.response);
      alert("can't connect to the database. You will play as guest");
    });
};

export function updateRecord(score) {
  if (currentUser !== [] && score > currentUser.record) {
    axios
      .put(
        "http://localhost:" +
          port +
          "/api/user/" +
          currentUser.id +
          "?newrecord=" +
          score
      )
      .then((res) => {
        console.log(res);
        currentUser = res.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

export function setUserToGuest() {
  currentUser = [];
}
