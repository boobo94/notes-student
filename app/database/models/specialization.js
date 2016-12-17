const model = (sequelize, DataTypes) => {
  let Specialization = sequelize.define("Specialization", {
    specialization_id: {
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

  }, {
      classMethods: {
        associate: (models) => {
          //associate
        }
      }
    });
  return Specialization
};

export default model;