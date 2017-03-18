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
      allowNull: false,
      unique: true
    },

  }, {
      classMethods: {
        associate: (models) => {
          Student.belongsToMany(models.Specialization, {
            through: 'studentSpecializations',
            foreignKey: 'student_id',
            otherKey: 'specialization_id',
            as: 'specializations',
            timestamps: false
          })
        }
      }
    });
  return Student
};

export default model;