const model = (sequelize, DataTypes) => {
  let Discipline = sequelize.define("Discipline", {
    discipline_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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

  }, {
      classMethods: {
        associate: (models) => {
          Discipline.belongsTo(models.Specialization, {
            foreignKey: 'specialization_id'
          })
        }
      }
    });
  return Discipline
};

export default model;