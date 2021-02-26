const numBattles = `
SELECT
  COUNT(*) as count
FROM
  battle_logs
`;

const distinctRegions = ["world_asia", "world_eu", "world_global", "world_kor"];
const distinctLeagues = [
  "legend",
  "champion",
  "challenger",
  "master",
  "gold",
  "silver",
  "bronze",
];

const playersByRegion = `
SELECT
  P1_SERVER as server,
  COUNT(*) as count
FROM (
  SELECT 
    P1_SERVER
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_SERVER
  FROM
    battle_logs
)
GROUP BY
  server
ORDER BY
  server
`;

const playersByLeague = `
SELECT DISTINCT
  P1_LEAGUE as league,
  COUNT(*) as count
FROM (
  SELECT
    P1_LEAGUE
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_LEAGUE
  FROM
    battle_logs
)
GROUP BY
  league
ORDER BY
  case
    when league = "legend" then 1
    when league = "champion" then 2
    when league = "challenger" then 3
    when league = "master" then 4
    when league = "gold" then 5
    when league = "silver" then 6
    when league = "bronze" then 7
  end
`;

const allPrebans = `
SELECT
  P1_PREBAN as preban,
  COUNT(*) as count
FROM (
  SELECT
    P1_PREBAN
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_PREBAN
  FROM
    battle_logs
)
GROUP BY
  preban
ORDER BY
  count DESC
`;

const prebansByRegion = distinctRegions.map((region) => {
  return {
    region,
    statement: `
        SELECT
          P1_PREBAN as preban,
          P1_SERVER as region,
          COUNT(*) as count
        FROM (
          SELECT
            P1_PREBAN, P1_SERVER
          FROM
            battle_logs
          UNION ALL
          SELECT
            P2_PREBAN, P2_SERVER
          FROM
            battle_logs
        )
        WHERE
          region = "${region}"
        GROUP BY
          preban
        ORDER BY
          count DESC
        `,
  };
});

const prebansByLeague = distinctLeagues.map((league) => {
  return {
    league,
    statement: `
      SELECT
        P1_PREBAN as preban,
        P1_LEAGUE as league,
        COUNT(*) as count
      FROM (
        SELECT
          P1_PREBAN, P1_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PREBAN, P2_LEAGUE
        FROM
          battle_logs
      )
      WHERE
        league = "${league}"
      GROUP BY
        preban
      ORDER BY
        count DESC
      `,
  };
});

const allPostbans = `
SELECT
  P1_POSTBAN as postban,
  COUNT(*) as count
FROM (
  SELECT
    P1_POSTBAN
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_POSTBAN
  FROM
    battle_logs
)
GROUP BY
  postban
ORDER BY
  count DESC
`;

const postbansByRegion = distinctRegions.map((region) => {
  return {
    region,
    statement: `
      SELECT
        P1_POSTBAN as postban,
        P1_SERVER as region,
        COUNT(*) as count
      FROM (
        SELECT
          P1_POSTBAN, P1_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_POSTBAN, P2_SERVER
        FROM
          battle_logs
      )
      WHERE
        region = "${region}"
      GROUP BY
        postban
      ORDER BY
        count DESC
      `,
  };
});

const postbansByLeague = distinctLeagues.map((league) => {
  return {
    league,
    statement: `
      SELECT
        P1_POSTBAN as postban,
        P1_LEAGUE as league,
        COUNT(*) as count
      FROM (
        SELECT
          P1_POSTBAN, P1_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_POSTBAN, P2_LEAGUE
        FROM
          battle_logs
      )
      WHERE
        league = "${league}"
      GROUP BY
        postban
      ORDER BY
        count DESC
      `,
  };
});

const allTopPicks = `
SELECT
  P1_PICK1 as pick,
  COUNT(*) as count
FROM (
  SELECT
    P1_PICK1
  FROM
    battle_logs
  UNION ALL
  SELECT
    P1_PICK2
  FROM
    battle_logs
  UNION ALL
  SELECT
    P1_PICK3
  FROM
    battle_logs
  UNION ALL
  SELECT
    P1_PICK4
  FROM
    battle_logs
  UNION ALL
  SELECT
    P1_PICK5
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_PICK1
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_PICK2
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_PICK3
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_PICK4
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_PICK5
  FROM
    battle_logs
)
GROUP BY
  pick
ORDER BY
  count DESC
`;

const topPicksByRegion = distinctRegions.map((region) => {
  return {
    region,
    statement: `
      SELECT
        P1_PICK1 as pick,
        P1_SERVER as region,
        COUNT(*) as count
      FROM (
        SELECT
          P1_PICK1, P1_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK2, P1_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK3, P1_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK4, P1_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK5, P1_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK1, P2_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK2, P2_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK3, P2_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK4, P2_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK5, P2_SERVER
        FROM
          battle_logs
      )
      WHERE
        region = "${region}"
      GROUP BY
        pick
      ORDER BY
        count DESC
      `,
  };
});

const topPicksByLeague = distinctLeagues.map((league) => {
  return {
    league,
    statement: `
      SELECT
        P1_PICK1 as pick,
        P1_LEAGUE as league,
        COUNT(*) as count
      FROM (
        SELECT
          P1_PICK1, P1_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK2, P1_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK3, P1_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK4, P1_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P1_PICK5, P1_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK1, P2_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK2, P2_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK3, P2_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK4, P2_LEAGUE
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK5, P2_LEAGUE
        FROM
          battle_logs
      )
      WHERE
        league = "${league}"
      GROUP BY
        pick
      ORDER BY
        count DESC
      `,
  };
});

const allFirstPicks = `
SELECT
  P1_PICK1 as firstPick,
  COUNT(*) as count
FROM (
  SELECT
    P1_PICK1
  FROM
    battle_logs
  UNION ALL
  SELECT
    P2_PICK1
  FROM
    battle_logs
)
GROUP BY
  firstPick
ORDER BY
  count DESC
`;

const firstPicksByRegion = distinctRegions.map((region) => {
  return {
    region,
    statement: `
      SELECT
        P1_PICK1 as firstPick,
        P1_SERVER as region,
        COUNT(*) as count
      FROM (
        SELECT
          P1_PICK1, P1_SERVER
        FROM
          battle_logs
        UNION ALL
        SELECT
          P2_PICK1, P2_SERVER
        FROM
          battle_logs
      )
      WHERE
        region = "${region}"
      GROUP BY
        firstPick
      ORDER BY
        count DESC
      `,
  };
});

const firstPicksByLeague = distinctLeagues.map((league) => {
  return {
    league,
    statement: `
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
        league = "${league}"
      GROUP BY
        firstPick
      ORDER BY
        count DESC
      `,
  };
});

module.exports = {
  players: {
    numBattles, // singleValue
    playersByRegion, // listValues
    playersByLeague, // listValues
  },
  prebans: {
    allPrebans, // listValues
    prebansByRegion, // prefiltered
    prebansByLeague, // prefiltered
  },
  postbans: {
    allPostbans, // listValues
    postbansByRegion, // prefiltered
    postbansByLeague, // prefiltered
  },
  topPicks: {
    allTopPicks, // listValues
    topPicksByRegion, // prefiltered
    topPicksByLeague, // prefiltered
  },
  firstPicks: {
    allFirstPicks, // listValues
    firstPicksByRegion, // prefiltered
    firstPicksByLeague, // prefiltered
  },
};

// Other

// const distinctRegions = `
// SELECT DISTINCT
//   P1_SERVER
// FROM
//   battle_logs
// ORDER BY
//   P1_SERVER
// `;
// const distinctLeagues = `
// SELECT DISTINCT
//   P1_LEAGUE as league
// FROM
//   battle_logs
// ORDER BY
//   case
//     when league = "legend" then 1
//     when league = "champion" then 2
//     when league = "challenger" then 3
//     when league = "master" then 4
//     when league = "gold" then 5
//     when league = "silver" then 6
//     when league = "bronze" then 7
//   end
// `;
