import * as migration_20260219_223017 from './20260219_223017'
import * as migration_20260222_ContactFields from './20260222_ContactFields'

export const migrations = [
  {
    up: migration_20260219_223017.up,
    down: migration_20260219_223017.down,
    name: '20260219_223017',
  },
  {
    up: migration_20260222_ContactFields.up,
    down: migration_20260222_ContactFields.down,
    name: '20260222_ContactFields',
  },
]
