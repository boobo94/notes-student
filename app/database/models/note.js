const model = (sequelize, DataTypes) => {
    let Note = sequelize.define("Note", {
        note_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        note: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exam_date: {
            type: DataTypes.DATE
        },

    }, {
            classMethods: {
                associate: (models) => {
                    Note.belongsTo(models.Discipline, {
                        foreignKey: 'discipline_id',
                        allowNull: false
                    })
                    Note.belongsTo(models.Student, {
                        foreignKey: 'student_id',
                        allowNull: false
                    })
                }
            }
        });
    return Note
};

export default model;