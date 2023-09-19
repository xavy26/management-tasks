export default {
  jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
  DB: {
    URI: process.env.PSQL_URI || 'localhost',
    USER: process.env.PSQL_USER || 'test',
    PASSWORD: process.env.PSQL_PASSWORD || 'test123'
  }
}