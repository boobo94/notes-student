const model = (sequelize, DataTypes) => {
  let Specialization = sequelize.define("Specialization", {
    specialization_id: {
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    short_name: {
      type: DataTypes.STRING
    },

  }, {
      classMethods: {
        associate: (models) => {
          Specialization.belongsToMany(models.Discipline, {
            through: 'specialization_discipline'
          })
        }
      }
    });
  return Specialization
};

export default model;