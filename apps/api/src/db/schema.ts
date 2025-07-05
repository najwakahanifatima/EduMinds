import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  doublePrecision,
  timestamp,
  boolean,
  char,
} from 'drizzle-orm/pg-core';

// Users
export const users = pgTable('user', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  picture: varchar('picture', { length: 255 }),
  birthDate: timestamp('birth_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

// User Progress
export const userProgress = pgTable('user_progress', {
  id: integer('id').references(() => users.id),
  learningPathId: integer('learning_path_id'),
  moduleId: integer('module_id'),
  lessonId: integer('lesson_id'),
  progress: doublePrecision('progress'),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  pk: [table.id, table.learningPathId, table.moduleId, table.lessonId],
}));

// Learning Paths
export const learningPaths = pgTable('learning_paths', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
});

// Modules
export const modules = pgTable('modules', {
  id: serial('id'),
  pathId: integer('path_id').references(() => learningPaths.id),
  position: integer('position'),
  title: varchar('title', { length: 255 }),
  description: text('description'),
}, (table) => ({
  pk: [table.id, table.pathId],
}));

// Lessons
export const lessons = pgTable('lessons', {
  id: serial('id'),
  moduleId: integer('module_id').references(() => modules.id),
  title: varchar('title', { length: 255 }),
  content: text('content'),
  contentUrl: varchar('content_url', { length: 255 }),
  position: integer('position'),
});

// Quizzes
export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id').references(() => lessons.id),
  title: varchar('title', { length: 255 }),
  description: text('description'),
});

// Quiz Questions
export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  quizId: integer('quiz_id').references(() => quizzes.id),
  questionText: text('question_text'),
  optionA: varchar('option_a', { length: 255 }),
  optionB: varchar('option_b', { length: 255 }),
  optionC: varchar('option_c', { length: 255 }),
  optionD: varchar('option_d', { length: 255 }),
  correctOption: char('correct_option', { length: 1 }),
});

// User Quiz Scores
export const userQuizScores = pgTable('user_quiz_scores', {
  userId: integer('user_id').references(() => users.id),
  quizId: integer('quiz_id').references(() => quizzes.id),
  score: doublePrecision('score'),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  pk: [table.userId, table.quizId],
}));

// Preassessment Questions
export const preassessmentQuestions = pgTable('preassessment_questions', {
  id: serial('id').primaryKey(),
  questionText: text('question_text'),
  optionA: varchar('option_a', { length: 255 }),
  optionB: varchar('option_b', { length: 255 }),
  optionC: varchar('option_c', { length: 255 }),
  optionD: varchar('option_d', { length: 255 }),
  correctOption: char('correct_option', { length: 1 }),
});

// User Preassessment Scores
export const userPreassessmentScores = pgTable('user_preassessment_scores', {
  userId: integer('user_id').references(() => users.id),
  score: doublePrecision('score'),
  pathRecommendation: integer('path_recommendation').references(() => learningPaths.id),
  completedAt: timestamp('completed_at'),
});

// User Preassessment Answers
export const userPreassessmentAnswers = pgTable('user_preassessment_answers', {
  userId: integer('user_id').references(() => users.id),
  questionId: integer('question_id').references(() => preassessmentQuestions.id),
  selectedOption: char('selected_option', { length: 1 }),
  isCorrect: boolean('is_correct'),
}, (table) => ({
  pk: [table.userId, table.questionId],
}));

// Supervisor
export const supervisors = pgTable('supervisor', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  password: varchar('password', { length: 255 }),
  gender: char('gender', { length: 1 }),
  age: integer('age'),
  description: text('description'),
  picture: varchar('picture', { length: 255 }),
});

// Supervising
export const supervising = pgTable('supervising', {
  supervisorId: integer('supervisor_id').references(() => supervisors.id),
  userId: integer('user_id').references(() => users.id),
}, (table) => ({
  pk: [table.supervisorId, table.userId],
}));

// Feedback
export const feedback = pgTable('feedback', {
  supervisorId: integer('supervisor_id').references(() => supervisors.id),
  userId: integer('user_id').references(() => users.id),
  feedback: text('feedback'),
});

// Jobs
export const jobs = pgTable('job', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }),
  field: varchar('field', { length: 255 }),
  company: varchar('company', { length: 255 }),
  description: text('description'),
  location: varchar('location', { length: 255 }),
  imageUrl: varchar('image_url', { length: 255 }),
});

// Applicants
export const applicants = pgTable('applicants', {
  userId: integer('user_id').references(() => users.id),
  jobId: integer('job_id').references(() => jobs.id),
});
