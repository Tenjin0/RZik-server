'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    /*
     INSERT INTO `user` (`id`,`firstname`,`lastname`,`nickname`,`password`,`email`,`birth_date`,`last_login`,`activated`,`deleted`) VALUES
     (DEFAULT,'Bilal','Khalak','Hazerfox','$2a$08$Pt4EMHFheu3JFQIWe7H80uRdmUori6u61eFUY/cYXdCVJeSm0.rAG',
     'hazer@fox.net','1990-06-16','2017-06-07 08:25:03',false,NULL);

     */
    return queryInterface.bulkInsert('user',[
      {
        id: 1, firstname: 'Bilal', lastname: 'Khalak', nickname: 'Hazerfox',
        password: '$2a$08$Pt4EMHFheu3JFQIWe7H80uRdmUori6u61eFUY/cYXdCVJeSm0.rAG', email: 'hazer@fox.net',
        birth_date: '1990-06-16',last_login: '2017-06-07 08:25:03', activated: false,deleted: null
      },{
        id: 2, firstname: 'Patrice', lastname: 'Petit', nickname: 'Tenji',
        password: '$2a$08$YGVTzmyW9rMbisqGHARMPOcxabT2jRnZkfgDvps7LF03n1h8s/vaW', email: 'petitpatrice@gmail.com',
        birth_date: '1990-06-16',last_login: '2017-06-07 08:25:03', activated: false,deleted: null
      }]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('user', null, {});
  }
};
