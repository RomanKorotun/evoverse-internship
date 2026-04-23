import path from 'path';

export const DB_DIR = path.join('db');

export const USERS_DIR = path.join(DB_DIR, 'users');
export const FILES_DIR = path.join(DB_DIR, 'files');
export const SESSIONS_DIR = path.join(DB_DIR, 'sessions');

export const USERS_FILENAME = 'users.json';
export const FILES_FILENAME = 'files.json';
export const SESSIONS_FILENAME = 'sessions.json';

export const USERS_PATH = path.join(USERS_DIR, USERS_FILENAME);
export const FILES_PATH = path.join(FILES_DIR, FILES_FILENAME);
export const SESSIONS_PATH = path.join(SESSIONS_DIR, SESSIONS_FILENAME);
