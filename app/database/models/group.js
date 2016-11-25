const model = (sequelize, DataTypes) => {
  let Group = sequelize.define("Group", {
    group_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    student_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    },

  }, {
      classMethods: {
        associate: (models) => {
          Group.belongsToMany(models.Student, {
            through: 'student_group',
            foreignKey: 'student_id'
          })
        }
      }
    });
  return Group
};

export default model;