const model = (sequelize, DataTypes) => {
  let Group = sequelize.define("Group", {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER
    },

  }, {
      classMethods: {
        associate: (models) => {
          Group.belongsTo(models.Student, {
            foreignKey: 'student_id',
            allowNull: false
          })
        }
      }
    });
  return Group
};

export default model;