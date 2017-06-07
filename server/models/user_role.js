'use strict';

module.exports = function(sequelize, DataTypes) {
    var User_Role = sequelize.define('User_Role', {
        //
    }, {
        tableName: 'user_role',
        underscored: true,
        timestamps: false,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.Role.belongsToMany(models.User, {
                    //timestamps: false,
                    through: 'User_Role',
                    foreignKey: 'id_role',
                    onDelete: 'cascade',
                    defaultValue: 2
                });
                models.User.belongsToMany(models.Role, {
                    //timestamps: false,
                    through: 'User_Role',
                    foreignKey: 'id_user',
                    onDelete: 'cascade'
                });

            }
        }
    });
    return User_Role;
};
