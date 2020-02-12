const { addUser } = require("./build/src/addUser");

addUser
  .then(res => {
    console.log("User added");
  })
  .catch(err => console.log(err));
