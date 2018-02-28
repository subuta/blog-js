const path = require('path')

export const ROOT_DIR = path.join(__dirname, './')
export const DB_DIR = path.join(ROOT_DIR, './db')
export const TEST_DIR = path.join(ROOT_DIR, './test')
export const API_TEST_DIR = path.join(TEST_DIR, './api')
export const SOURCE_DIR = path.join(ROOT_DIR, './src/api')
export const VIEWS_DIR = path.join(ROOT_DIR, './src/views')

export const PUBLIC_DIR = path.join(VIEWS_DIR, './public')

export const MIGRATION_DIR = path.join(SOURCE_DIR, './migrations')

export const FIXTURES_DIR = path.join(API_TEST_DIR, './fixtures')

export const absolutePath = module => path.resolve(ROOT_DIR, module);
