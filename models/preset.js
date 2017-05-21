module.exports = function (sequelize, DataTypes) {
    var Preset = sequelize.define("Preset", {
        settings: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        creator:{
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    });
    return Preset;
};
