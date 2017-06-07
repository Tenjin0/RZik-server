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
    //queryInterface.dropAllTables();
    return queryInterface.bulkInsert('role',[{id: 1, role: 'anonymous'},{id: 2, role: 'user'}, {id: 3, role: 'moderator'},
      {id: 4, role: 'owner'}, {id: 5, role: 'administrator'}]);
    
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.dropAllTables();
  }
};
