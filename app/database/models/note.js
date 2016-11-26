const model = (sequelize, DataTypes) => {
    let Note = sequelize.define("Note", {
        note_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        note: {
            type: DataTypes.INTEGER
        },
        exam_date: {
            type: DataTypes.DATE
        },

    }, {
            classMethods: {
                associate: (models) => {
                    Note.belongsTo(models.Discipline, {
                        foreignKey: 'discipline_id'
                    })
                    Note.belongsTo(models.Student, {
                        foreignKey: 'student_id'
                    })
                }
            }
        });
    return Note
};

export default model;