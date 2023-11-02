import { relations } from "drizzle-orm"
import {
  index,
  pgTable,
  uuid,
  varchar,
  doublePrecision,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core"

export const playersTable = pgTable(
  "players",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: varchar("user_id").notNull(),
  },
  (table) => ({
    userIdx: index("user_idx").on(table.userId),
  })
)

export const playersRelations = relations(playersTable, ({ many }) => ({
  eloHistory: many(eloTable),
  games: many(gamePlayersTable),
}))

export const eloTable = pgTable(
  "elo",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    playerId: uuid("player_id")
      .references(() => playersTable.id)
      .notNull(),
    elo: doublePrecision("elo").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => ({
    playerIdx: index("player_idx").on(table.playerId),
  })
)

export const gamesTable = pgTable("games", {
  id: uuid("id").defaultRandom().primaryKey(),
})

export const gamesRelations = relations(gamesTable, ({ many }) => ({
  players: many(gamePlayersTable),
}))

export const gamePlayersTable = pgTable(
  "game_players",
  {
    gameId: uuid("game_id")
      .references(() => gamesTable.id)
      .notNull(),
    playerId: uuid("player_id")
      .references(() => playersTable.id)
      .notNull(),
    team: varchar("team").notNull(),
    role: varchar("role").notNull(),
  },
  (table) => ({
    pk: primaryKey(table.gameId, table.playerId),
    playerIdx: index("player_idx").on(table.gameId, table.playerId),
  })
)

export const gamePlayersRelations = relations(gamePlayersTable, ({ one }) => ({
  game: one(gamesTable, {
    fields: [gamePlayersTable.gameId],
    references: [gamesTable.id],
  }),
  player: one(playersTable, {
    fields: [gamePlayersTable.playerId],
    references: [playersTable.id],
  }),
}))
