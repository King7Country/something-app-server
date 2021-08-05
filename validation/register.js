const Validator = require("validator");
const isEmpty = require("is-empty");
// var blacklist = require("the-big-username-blacklist")

module.exports = function validateRegisterInput(data) {
  let errors = {};

 
  // Blacklist filter requires unconverted input data
//   const userName = data.name;

  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
// Trying to blacklist inapropriate usernames
//   if (!blacklist.validate(userName)) {
//     errors.name = "Please, no proffanity...";
//    }
//   if (Validator.blacklist(data.name, 'fuck')) {
//     errors.name = "Please, no proffanity...";
//   }
  
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "That's not quite an email...";
  }
  
//   // Password checks
//   if (Validator.isEmpty(data.password)) {
//     errors.password = "You're going to need a password";
//   }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Always a good idea to double check";
  }
  
//   if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
//     errors.password = "Password must be at least 6 characters";
//   }

  if (!Validator.isStrongPassword(data.password, {
    minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false, pointsPerUnique: 1, pointsPerRepeat: 0.5, pointsForContainingLower: 10, pointsForContainingUpper: 10, pointsForContainingNumber: 10, pointsForContainingSymbol: 10
  })) {
    errors.password = "You're going to need a password that's atleast 6 characters and contain atleast: 1 lowercase charachter, 1 uppercase charachter, 1 number, and 1 symbol";
  }
  
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "It's best if the passwords match...";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};