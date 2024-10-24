require("dotenv").config();
const axios = require("axios");

// important: define candidate id
const candidateId = process.env.CANDIDATE_ID;

if (!candidateId) {
  throw new Error("CANDIDATE_ID is not set in the environment variables");
}

// fetch goal map
const fetchGoalMap = async () => {
  try {
    const { data } = await axios.get(
      `https://challenge.crossmint.io/api/map/${candidateId}/goal`
    );
    return data.goal;
  } catch (err) {
    console.log({ err }, "Error on getting goal map");
    throw new Error("Failed to fetch goal map");
  }
};

// sleep to avoid hitting rate limits
const sleep = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

// iterate through the goal map
const createMegaverse = async (goalMap) => {
  for (let row = 0; row < goalMap.length; row++) {
    for (let column = 0; column < goalMap[row].length; column++) {
      const cellValue = goalMap[row][column];

      if (cellValue === "POLYANET") {
        await postPolyanet(row, column);
      } else if (cellValue.endsWith("SOLOON")) {
        const color = cellValue.split("_")[0].toLowerCase();
        await postSoloon(row, column, color);
      } else if (cellValue.endsWith("COMETH")) {
        const direction = cellValue.split("_")[0].toLowerCase();
        await postCometh(row, column, direction);
      }

      await sleep();
    }
  }
};

// generic POST API function
const postObject = async (url, body) => {
  let retries = 3;
  while (retries > 0) {
    try {
      await axios.post(url, body);
      // if successful - stop
      return;
    } catch (err) {
      retries--;
      console.log({ err }, `Error on API post, retries left: ${retries}`);
      if (retries > 0) await sleep(500 * (4 - retries));
      else throw new Error("Failed after 3 retries");
    }
  }
};

// POST API for Polyanet
const postPolyanet = async (row, column) => {
  await postObject("https://challenge.crossmint.io/api/polyanets", {
    row,
    column,
    candidateId,
  });
};

// POST API for Soloon
const postSoloon = async (row, column, color) => {
  await postObject("https://challenge.crossmint.io/api/soloons", {
    row,
    column,
    color,
    candidateId,
  });
};

// POST API for Cometh
const postCometh = async (row, column, direction) => {
  await postObject("https://challenge.crossmint.io/api/comeths", {
    row,
    column,
    direction,
    candidateId,
  });
};

const initializeMegaverse = async () => {
  const goalMap = await fetchGoalMap();
  await createMegaverse(goalMap);
};

initializeMegaverse();
