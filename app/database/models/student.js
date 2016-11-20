const model = (sequelize, DataTypes) => {
  let Student = sequelize.define("Student", {
    student_id: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    tax: {
      type: DataTypes.STRING
    },
    registration_number: {
      type: DataTypes.STRING
    },

  }, {
      classMethods: {
        associate: (models) => {
          Student.belongsToMany(models.Group, {
            through: 'student_group'
          })
        }
      }
    });
  return Student
};

export default model;