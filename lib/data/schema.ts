import {
  index,
  pgTable,
  uuid,
  varchar,
  doublePrecision,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core"

export const players = pgTable(
  "players",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("user_id").notNull(),
  },
  (table) => ({
    userIdx: index("user_idx").on(table.userId),
  })
)

export const elo = pgTable(
  "elo",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    playerId: uuid("player_id")
      .references(() => players.id)
      .notNull(),
    elo: doublePrecision("elo").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    playerIdx: index("player_idx").on(table.playerId),
  })
)

export const games = pgTable("games", {
  id: uuid("id").defaultRandom().primaryKey(),
})

export const game_players = pgTable(
  "game_players",
  {
    gameId: uuid("game_id")
      .references(() => games.id)
      .notNull(),
    playerId: uuid("player_id")
      .references(() => players.id)
      .notNull(),
    team: varchar("team").notNull(),
    role: varchar("role").notNull(),
  },
  (table) => ({
    pk: primaryKey(table.gameId, table.playerId),
    playerIdx: index("player_idx").on(table.gameId, table.playerId),
  })
)

export type Player = typeof players.$inferSelect
export type Elo = typeof elo.$inferSelect
