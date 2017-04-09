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
            as: 'groups',
            allowNull: false,
            onDelete: 'CASCADE'
          })
          Group.belongsTo(models.Specialization, {
            foreignKey: 'specialization_id',
            allowNull: false,
            onDelete: 'CASCADE',
            as: 'groupsSpecialization'
          })
        }
      }
    });
  return Group
};

export default model;