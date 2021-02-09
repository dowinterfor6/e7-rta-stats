# Total entries
```SQL
  SELECT
    COUNT(*)
  FROM
    battle_logs
```

# Regions
```SQL
SELECT DISTINCT
  P1_SERVER
FROM
  battle_logs
ORDER BY
  P1_SERVER
```
```SQL
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
```

# Leagues
```SQL
SELECT DISTINCT
  P1_LEAGUE as league
FROM
  battle_logs
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
```
```SQL
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
```

Overall,
Per region (world_asia, world_eu, world_global, world_kor),
Per league (legend, champion, challenger, master, gold, silver, bronze)

Top 10 prebans
```SQL
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
```
```SQL
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
  region = "world_asia"
GROUP BY
  preban
ORDER BY
  count DESC
```
```SQL
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
  league = "legend"
GROUP BY
  preban
ORDER BY
  count DESC
```

Top 10 prebans (how many people won after x preban)

Top 10 postbans
```SQL
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
```
```SQL
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
  region = "world_asia"
GROUP BY
  postban
ORDER BY
  count DESC
```
```SQL
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
  league = "legend"
GROUP BY
  postban
ORDER BY
  count DESC
```
Top 10 postbans (how many people won after x postban)

Top 10 pick
```SQL
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
```
```SQL
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
  region = "world_asia"
GROUP BY
  pick
ORDER BY
  count DESC
```
```SQL
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
  league = "legend"
GROUP BY
  pick
ORDER BY
  count DESC
```

Top 10 first pick
```SQL
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
```
```SQL
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
  region = "world_asia"
GROUP BY
  firstPick
ORDER BY
  count DESC
```
```SQL
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
```

Top 10 pick (how many people won after x pick)

(Hard)
Top 10 counterpicks winrate
