var config = {
  "development": {
    "username": "root",
    "password": process.env.MYSQL_PASS || "pass",
    "database": "rzik_development",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.MYSQL_PASS || "pass",
    "database": "rzik_test",
    "host": "127.0.0.1",
    "port": 3306,

    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.MYSQL_PASS || "pass",
    "database": "rzik_production",
    "host": "127.0.0.1",
    "port": 3306,

    "dialect": "mysql"
  }
}

module.exports = config
