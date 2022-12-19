'use strict';

const mockData = require('./mockData.js').data;

// userProfile mock data
const userProfile = {
  first_name: "Mario",
  last_name: "Rol",
  age: 19,
  gender: "M",
  gender_interest: "B",
  location: "city",
  min_age_interest: 18,
  max_age_interest: 18
};

// console.table(mockData);
// console.table(userProfile);

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
