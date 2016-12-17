const model = (sequelize, DataTypes) => {
  let Discipline = sequelize.define("Discipline", {
    discipline_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    short_name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    examination: {
      type: DataTypes.STRING
    },
    credit_points: {
      type: DataTypes.INTEGER
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
      classMethods: {
        associate: (models) => {
          Discipline.belongsTo(models.Specialization, {
            foreignKey: {
              name: 'specialization_id',
              allowNull: false
            },
            onDelete: 'CASCADE'
          })
        }
      }
    });
  return Discipline
};

export default model;