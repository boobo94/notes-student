const model = (sequelize, DataTypes) => {
  let User = sequelize.define("User", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER// 1 = SuperAdmin, 2 = Secretariat, 3 = Student
    }

  }, {
      classMethods: {
        associate: (models) => {
          User.belongsTo(models.Student, {
            foreignKey: 'registration_number',
            targetKey: 'registration_number', // the target column from student table
            onDelete: 'CASCADE',
            as: 'student'
          })
        }
      }
    });
  return User
};

export default model;