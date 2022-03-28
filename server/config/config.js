require('dotenv').config();
const env = process.env;
 
const development = {
  username: env.DATABASE_USERNAME,
  //env.MYSQL_USERNAME은 불러오고자 하는 데이터의 키값이므로 자유롭게 이름설정이 가능하다.
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: "127.0.0.1",
  dialect: "mysql",
  timezone: "+09:00"
  //port: env.MYSQL_PORT
};
 
const production = {
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: "127.0.0.1",
  dialect: "mysql",
  timezone: "+09:00"
  //port: env.MYSQL_PORT
};
 
const test = {
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  host: "127.0.0.1",
  dialect: "mysql",
  timezone: "+09:00"
  //port: env.MYSQL_PORT
};
 
module.exports = { development, production, test };