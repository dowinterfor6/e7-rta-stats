const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

const sqlite3 = require("sqlite3").verbose();

const {
  players,
  prebans,
  postbans,
  topPicks,
  firstPicks,
} = require("./util/sqlStatements");

const { nameErrorMap } = require("./util/nameErrorMap");

const db = new sqlite3.Database(
  "./db/rta_snapshot_2021_2_7.db",
  sqlite3.OPEN_READONLY,
  (err) => {
    if (err) {
      console.error(err.message);
    }

    console.log("Connected to database");
  }
);

const dbData = {};

const fetchFromDatabase = (sqlStatementObj) => {
  const dbResponse = {};

  for (const [key, value] of Object.entries(sqlStatementObj)) {
    if (typeof value === "string") {
      const sqlStatementResponse = [];

      db.each(value, (err, row) => {
        if (err) {
          console.error(err.message);
        }
        row = fixNameErrors(row);
        sqlStatementResponse.push(row);
      });

      dbResponse[key] = sqlStatementResponse;
    } else {
      let test = value.reduce((acc, val) => {
        const sqlStatementResponses = [];
        db.each(val.statement, (err, row) => {
          if (err) {
            console.error(err.message);
          }
          row = fixNameErrors(row);
          sqlStatementResponses.push(row);
        });
        if (val.region) {
          acc[val.region] = sqlStatementResponses;
        } else {
          acc[val.league] = sqlStatementResponses;
        }
        return acc;
      }, {});

      dbResponse[key] = test;
    }
  }

  return dbResponse;
};

const nameErrorFields = ["preban", "postban", "pick", "firstPick"];
const nameMapKeys = Object.keys(nameErrorMap);

const fixNameErrors = (row) => {
  nameErrorFields.forEach((field) => {
    const val = row[field];
    if (val) {
      if (nameMapKeys.includes(val)) {
        row[field] = nameErrorMap[val];
      }
    }
  });
  return row;
};

db.serialize(() => {
  dbData.players = fetchFromDatabase(players);
  dbData.prebans = fetchFromDatabase(prebans);
  dbData.postbans = fetchFromDatabase(postbans);
  dbData.topPicks = fetchFromDatabase(topPicks);
  dbData.firstPicks = fetchFromDatabase(firstPicks);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }

  // console.log(dbData);
  console.log("Close db connection");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO: Data from db
app.get("/api/test", (req, res) => {
  res.json(dbData);
});

module.exports = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
