import path from 'path'

export const ROOT_DIR = path.join(__dirname, './')
export const DB_DIR = path.join(ROOT_DIR, './db')
export const TEST_DIR = path.join(ROOT_DIR, './test')
export const SOURCE_DIR = path.join(ROOT_DIR, './src')
export const FRONT_DIR = path.join(ROOT_DIR, './front')

export const PUBLIC_DIR = path.join(FRONT_DIR, './public')

export const MIGRATION_DIR = path.join(SOURCE_DIR, './migrations')

export const FIXTURES_DIR = path.join(TEST_DIR, './fixtures')

export const absolutePath = module => path.resolve(ROOT_DIR, module);
