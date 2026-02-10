import { pgTable, pgEnum, serial, integer, text, timestamp, boolean, real } from 'drizzle-orm/pg-core';

export const workTypeEnum = pgEnum('work_type', ['book', 'manhwa', 'manhua']);
export const workStatusEnum = pgEnum('work_status', ['ongoing', 'completed', 'hiatus', 'dropped']);
export const readingStatusEnum = pgEnum('reading_status', ['reading', 'completed', 'on_hold', 'plan_to_read', 'dropped']);

export const genres = pgTable('genres', {
	id: serial('id').primaryKey(),
	name: text('name').notNull().unique(),
});

export const authors = pgTable('authors', {
	id: serial('id').primaryKey(),
	name: text('name').notNull(),
});

export const works = pgTable('works', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	type: workTypeEnum('type').notNull(),
	status: workStatusEnum('status').notNull().default('ongoing'),
	coverUrl: text('cover_url'),
	synopsis: text('synopsis'),
	totalChapters: integer('total_chapters'),
	authorId: integer('author_id').references(() => authors.id),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const worksToGenres = pgTable('works_to_genres', {
	workId: integer('work_id').notNull().references(() => works.id, { onDelete: 'cascade' }),
	genreId: integer('genre_id').notNull().references(() => genres.id, { onDelete: 'cascade' }),
});


export const readingList = pgTable('reading_list', {
	id: serial('id').primaryKey(),
	workId: integer('work_id').notNull().references(() => works.id, { onDelete: 'cascade' }),
	readingStatus: readingStatusEnum('reading_status').notNull().default('plan_to_read'),
	currentChapter: integer('current_chapter').default(0),
	rating: real('rating'),
	isFavorite: boolean('is_favorite').default(false).notNull(),
	notes: text('notes'),
	startedAt: timestamp('started_at'),
	finishedAt: timestamp('finished_at'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
});



