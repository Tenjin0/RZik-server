var config = {
  "development": {
    "username": "root",
    "database": "rzik-dev",
    "password": process.env.MYSQL_PASS || "pass",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
	  "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "database": "rzik-test",
    "password": process.env.MYSQL_PASS || "pass",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
	"port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "database": "rzik-prod",
    "password": process.env.MYSQL_PASS || "pass",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
	"port": 3306,
    "dialect": "mysql"
  },
  "secretKey":"azertyiop"
}

module.exports = config;
