const { new_User_Schema } = require("../model/userSchema");

function newUserValidator(body) {
  let user = new_User_Schema.validate(body, { abortEarly: false });
  if (user.error?.details.length) {
    let message = user.error.details.map((err) => err.message);
    throw new Error(message.join("\n"));
  } else {
    return user;
  }
}

module.exports = { newUserValidator };
