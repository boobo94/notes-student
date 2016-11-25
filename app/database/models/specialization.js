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
            through: 'discipline_specialization'
          })
        }
      }
    });
  return Specialization
};

export default model;