'use strict';

module.exports = function(sequelize, DataTypes) {
    var User_Role = sequelize.define('User_Role', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'user_role',
        underscored: true,
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.User.belongsToMany(models.Role, {
                    timestamps: false,
                    through: 'user_role',
                    foreignKey: 'id_user',
                    onDelete: 'cascade'
                });
                models.Role.belongsToMany(models.User, {
                    through: 'user_role',
                    foreignKey: 'id_role',
                    onDelete: 'cascade'
                });

            }
        }
    });
    return User_Role;
};
