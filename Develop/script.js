// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword() {
  var genPassword = "";
  var passLenText = "";
  var passLength = 0;
  do {
    passLenText = prompt("Please chose a length of at least 8 characters and no more than 128 characters.");
    passLength = parseInt(passLenText);
  }
  while (!validatePassLength(passLength));

  var charLowercase = false;
  var charUppercase = false;
  var numPass = false;
  var charSpecial = false;
  do {
    charLowercase = confirm("Whould you like to use lowercase characters?");
    charUppercase = confirm("Would you like to use uppercase characters?");
    numPass = confirm("Would you like to use numbers in your password?");
    charSpecial = confirm("Would you like to use special characters?");
  }
  while(!validateCharTypes(charLowercase, charUppercase, numPass, charSpecial));
  
  var passwordArray = [];

  if(charLowercase) {
    passwordArray.push("charLower");
  }
  if(charUppercase) {
    passwordArray.push("charUpper");
  }
  if(numPass) {
    passwordArray.push("passwordNum");
  }
  if(charSpecial) {
    passwordArray.push("specialChar");
  }

  var typeCheck = passwordArray.slice();

  for (var i = passLength; i >= 1; i--){
    var charType = passwordArray[Math.floor(Math.random() * passwordArray.length)];
    console.log("Random type: " + charType);
    console.log("Types left: " + typeCheck);
    if(typeCheck.indexOf(charType) > -1){
      typeCheck.splice(typeCheck.indexOf(charType), 1);
      genPassword += genRandomChar(charType);
    }else if(typeCheck.length === i){
      genPassword += genRandomChar(typeCheck[i-1]);
      typeCheck.pop();
    }else{
      genPassword += genRandomChar(charType);
    }
    
    debugPassword(charType, genPassword, i);
  }

  return genPassword;
}

function validatePassLength(passwordLen) {
  console.log("Validate len: " + passwordLen);
  if(isNaN(passwordLen)){
    alert("Your response must be numeric.");
    return false;
  }else if(passwordLen < 8 || passwordLen > 128){
    alert("Your response must be at least 8 characters and no more than 128 characters.");
    return false;
  }
  return true;
}

function validateCharTypes(lower, upper, num, special) {
  if(!lower && !upper && !num && !special) {
    alert("You must make at least one selection.");
    return false;
  }
  return true;
}

function genRandomChar(rtnChar) {
  var charTypeArray = {
    charLower: "abcdefghijklmnopqrstuvwxyz",
    charUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    passwordNum: "0123456789",
    specialChar: "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
  }
  console.log("Return char: " + rtnChar);
  return charTypeArray[rtnChar].charAt(Math.floor(Math.random() * charTypeArray[rtnChar].length));
}

function debugPassword(type, currentPass, len) {
  console.log(type + " Current Password: " + currentPass + " " + "current len: " + len);
}