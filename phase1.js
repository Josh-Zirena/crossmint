require("dotenv").config();
const axios = require("axios");

// important: define candidate id
const candidateId = process.env.CANDIDATE_ID;

const goalMap = [
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "POLYANET",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
  [
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
    "SPACE",
  ],
];

// sleep to avoid hitting rate limits
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// iterate through the goal map
const createPolyanets = async () => {
  for (let row = 0; row < goalMap.length; row++) {
    for (let column = 0; column < goalMap[row].length; column++) {
      if (goalMap[row][column] === "POLYANET") {
        // call function that controls API
        await postPolyanet(row, column);
        await sleep(200);
      }
    }
  }
};

// POST API for Polyanet
const postPolyanet = async (row, column) => {
  try {
    await axios.post("https://challenge.crossmint.io/api/polyanets", {
      row: row,
      column: column,
      candidateId: candidateId,
    });
  } catch (err) {
    console.log({ err }, "Error on API post");
  }
};

createPolyanets();
