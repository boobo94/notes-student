const model = (sequelize, DataTypes) => {
  let Group = sequelize.define("Group", {
    group_id: {
      type: DataTypes.INTEGER
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
            through: 'group_student'
          })
        }
      }
    });
  return Group
};

export default model;