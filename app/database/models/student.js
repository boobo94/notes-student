const model = (sequelize, DataTypes) => {
  let Student = sequelize.define("Student", {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
          Student.belongsTo(models.Specialization, {
            foreignKey: 'specialization_id'
          })
        }
      }
    });
  return Student
};

export default model;