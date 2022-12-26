'use strict';

const mockData = require('./mockData.js').data;

console.log("Welcome user!\n");

const userProfile = {};

/*** Start of questionnaire and sanity checks ***/

// check if first_name is not empty
let first_name = prompt("What is your first name?").trim();
while (first_name === "") {
  console.log("First name cannot be empty. Please try again.\n");
  first_name = prompt("What is your first name?").trim();
}
userProfile.first_name = first_name;

// check if last_name is not empty
let last_name = prompt("What is your last name?").trim();
while (last_name === "") {
  console.log("Last name cannot be empty. Please try again.\n");
  last_name = prompt("What is your last name?").trim();
}
userProfile.last_name = last_name;

// check if age is a number >= 18
let age = Number(prompt('What is your age?'));
while (isNaN(age) || age < 18) {
  console.log("Please enter a number (18 or higher). Please try again.\n")
  age = Number(prompt('What is your age?'));
}
userProfile.age = age;

// check if gender is either M, F or X. Case insensitive.
let gender = prompt('What is your gender? (M, F, X)').trim().toUpperCase();
while (gender !== "M" && gender !== "F" && gender !== "X") {
  console.log("Enter either M, F, or X. Please try again.\n");
  gender = prompt('What is your gender? (M, F, X)').trim().toUpperCase();
}
userProfile.gender = gender;

// check if genderInterest is either M, F, X or B. Case insensitive.
let genderInterest = prompt('What genders are you interested in? (M, F, X, B)').trim().toUpperCase();
while (genderInterest !== "M" && genderInterest !== "F" && genderInterest !== "X" && genderInterest !== 'B') {
  console.log("Enter either M, F, X, B. Please try again.\n");
  genderInterest = prompt('What genders are you interested in? (M, F, X, B)').trim().toUpperCase();
}
userProfile.gender_interest = genderInterest;

// check if location is either rural or city. Case insensitive.
let location = prompt('Where do you want to search? (rural, city)').trim().toLowerCase();
while (location !== "rural" && location !== "city") {
  console.log("Enter either rural or city. Please try again.\n");
  location = prompt('What are do you want to search? (rural, city)').trim().toLowerCase();
}
userProfile.location = location;

// check if min_age_interest >= 18
let min_age_interest = Number(prompt("What is your minimum age interest?"));
while (isNaN(min_age_interest) || min_age_interest < 18) {
  console.log("Minimum age required is 18. Please try again.\n");
  min_age_interest = Number(prompt("What is your minimum age interest?"));
}
userProfile.min_age_interest = min_age_interest;

// check if max_age_interest > min_age_interest
let max_age_interest = Number(prompt("What is your maximum age interest?"));
while (isNaN(max_age_interest) || max_age_interest <= min_age_interest) {
  console.log(`Maximum age interest must be greater than ${min_age_interest}. Please try again.\n`);
  max_age_interest = Number(prompt("What is your maximum age interest?"));
}
userProfile.max_age_interest = max_age_interest;

/*** End of questionnaire and sanity checks ***/

// At this point we have valid user input so let's start looking for matches!

const matches = [];

for (const possibleMatch of mockData) {
  if (possibleMatch.age >= userProfile.min_age_interest &&
    possibleMatch.age <= userProfile.max_age_interest) {

    if (userProfile.age >= possibleMatch.min_age_interest &&
      userProfile.age <= possibleMatch.max_age_interest) {

      if (userProfile.location === possibleMatch.location) {

        if (userProfile.gender === possibleMatch.gender_interest ||
          (possibleMatch.gender_interest === "B" && (userProfile.gender === "M" || userProfile.gender === "F"))) {

          if (possibleMatch.gender === userProfile.gender_interest ||
            (userProfile.gender_interest === "B" && (possibleMatch.gender === "M" || possibleMatch.gender === "F"))) {

            matches.push(possibleMatch);
          }
        }
      }
    }
  }
}

// console.table(matches);
if (matches.length > 0) {
  console.log("\nYour matches:");
  console.table(matches, ['first_name', 'last_name', 'age', 'gender']);
  console.log(`Matched with ${matches.length} users.`);
} else console.log("\nNo matches found. Try again tomorrow!");
