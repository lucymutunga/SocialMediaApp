const joi = require("joi");

const new_User_Schema = joi
  .object({
    user_name: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    profile_pic_url: joi.required(),
    bio: joi.required(),
    country: joi.required(),
    password: joi
      .string()
      .min(8)
      .max(30)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    c_password: joi.ref("password"),
  })
  .with("password", "c_password");

module.exports = { new_User_Schema };
