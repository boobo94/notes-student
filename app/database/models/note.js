const model = (sequelize, DataTypes) => {
    let Note = sequelize.define("Note", {
        note_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        discipline_id: {
            type: DataTypes.INTEGER
        },
        note: {
            type: DataTypes.INTEGER
        },
        exam_date: {
            type: DataTypes.DATE
        },
        student_id: {
            type: DataTypes.INTEGER
        },

    }, {
            classMethods: {
                associate: (models) => {
                    Note.belongsToMany(models.Discipline, {
                        through: 'note_discipline',
                        foreignKey: 'discipline_id'
                    })
                    Note.belongsToMany(models.Student, {
                        through: 'note_student',
                        foreignKey: 'student_id'
                    })
                }
            }
        });
    return Note
};

export default model;