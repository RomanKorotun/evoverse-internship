import path from 'path';

export const DB_DIR = path.join('db');

export const USERS_DIR = path.join(DB_DIR, 'users');
export const FILES_DIR = path.join(DB_DIR, 'files');

export const USERS_FILENAME = 'users.json';
export const FILES_FILENAME = 'files.json';

export const USERS_PATH = path.join(USERS_DIR, USERS_FILENAME);
export const FILES_PATH = path.join(FILES_DIR, FILES_FILENAME);
