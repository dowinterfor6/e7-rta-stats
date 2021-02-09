const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

const sqlite3 = require("sqlite3").verbose();
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

const dbData = [];

db.serialize(() => {
  db.each(
    `
    SELECT
      P1_PICK1 as firstPick,
      P1_LEAGUE as league,
      COUNT(*) as count
    FROM (
      SELECT
        P1_PICK1, P1_LEAGUE
      FROM
        battle_logs
      UNION ALL
      SELECT
        P2_PICK1, P2_LEAGUE
      FROM
        battle_logs
    )
    WHERE
      league = "legend"
    GROUP BY
      firstPick
    ORDER BY
      count DESC
    `,
    (err, row) => {
      if (err) {
        console.error(err.message);
      }

      dbData.push(row);
    }
  );
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }

  console.log(dbData);
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
  res.json({ test: true });
});

module.exports = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
