module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/main/**>'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  collectCoverageFrom: [
    '**/src/**/*.ts',
    '!**/src/main/server.ts',
    '!**/src/main/config/env.ts',
    '!**/src/infra/db/redis/helpers/redis-helper.ts',
    '!**/src/infra/db/mongodb/helpers/mongo-helper.ts',
    '!**/src/infra/topic/kafka/helpers/kafka-helper.ts',
    '!**/src/presentation/errors/*.ts',
    '!**/src/presentation/protocols/*.ts',
    '!**/src/presentation/controller/item/item-protocols.ts',
    '!**/src/data/usecases/update-item-topic/db-update-item-topic-protocols.ts',
    '!**/src/data/usecases/update-item/db-update-item-protocols.ts',
    '!**/src/data/usecases/add-item/db-add-item-protocols.ts',
    '!**/src/data/usecases/delete-item/db-delete-item-protocols.ts',
    '!**/src/data/usecases/get-all-items/db-get-all-items-protocols.ts',
],
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
