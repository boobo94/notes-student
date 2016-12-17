const model = (sequelize, DataTypes) => {
  let Student = sequelize.define("Student", {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tax: {
      type: DataTypes.STRING
    },
    registration_number: {
      type: DataTypes.STRING,
      allowNull: false
    },

  }, {
      classMethods: {
        associate: (models) => {
          Student.belongsTo(models.Specialization, {
            foreignKey: 'specialization_id',
            allowNull: false
          })
        }
      }
    });
  return Student
};

export default model;