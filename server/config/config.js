var config = {
  "development": {
    "username": "root",
    "database": process.env.MYSQL_DATABASE || "rzik-dev",
    "password": process.env.MYSQL_PASS || "pass",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
    "port": 3306,
    "dialect": "mysql",
    "logging": false
  },
  "test": {
    "username": "root",
    "database": "rzik-test",
    "password": process.env.MYSQL_PASS || "pass",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
	  "port": 3306,
    "dialect": "mysql",
    "logging": false
  },
  "production": {
    "username": "root",
    "database": "rzik-prod",
    "password": process.env.MYSQL_PASS || "pass",
    "host": process.env.MYSQL_HOST || "127.0.0.1",
	"port": 3306,
    "dialect": "mysql"
  },
  "secretKey":"azertyiop" // TODO préférence mettre dans une variable d'environnement plutot qu'ici.
}

module.exports = config;
