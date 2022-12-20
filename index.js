'use strict';

const mockData = require('./mockData.js').data;

// userProfile mock data
const userProfile = {
  first_name: "Mario",
  last_name: "Rol",
  age: 49,
  gender: "M",
  gender_interest: "F",
  location: "city",
  min_age_interest: 35,
  max_age_interest: 52
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

// Show user profile
console.log("\nYour profile");
console.table(userProfile);

// Show all matches found, if any.
if (matches.length > 0) {
  console.log("\nYour matches:");
  console.table(matches, ['first_name', 'last_name', 'age', 'gender']);

  // Not sure if console.table() counts as printing in a nice format (requirements)
  // so adding some formatted string output just to make sure!
  for (const match of matches) {
    console.log(`${match.first_name} ${match.last_name} (${match.gender}) age ${match.age} is a match!`);
  }

  console.log(`\nMatched with ${matches.length} users.`);
} else console.log("\nNo matches found. Try again tomorrow!");
