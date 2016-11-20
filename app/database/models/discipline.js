const model = (sequelize, DataTypes) => {
  let Discipline = sequelize.define("Discipline", {
    discipline_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    short_name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER
    },
    examination: {
      type: DataTypes.STRING
    },
    credit_points: {
      type: DataTypes.INTEGER
    },
    semester: {
      type: DataTypes.INTEGER
    },
    specialization_id: {
      type: DataTypes.INTEGER
    },

  }, {
      classMethods: {
        associate: (models) => {
          Discipline.belongsToMany(models.Specialization, {
            through: 'discipline_specialization'
          })
        }
      }
    });
  return Discipline
};

export default model;