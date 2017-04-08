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
            type: DataTypes.DATEONLY
        },

    }, {
            classMethods: {
                associate: (models) => {
                    Note.belongsTo(models.Discipline, {
                        foreignKey: 'discipline_id',
                        as: 'disciplines',
                        allowNull: false,
                        onDelete: 'CASCADE'
                    })
                    Note.belongsTo(models.Specialization, {
                        foreignKey: 'specialization_id',
                        allowNull: false,
                        onDelete: 'CASCADE'
                    })
                    Note.belongsTo(models.Student, {
                        foreignKey: 'student_id',
                        allowNull: false,
                        onDelete: 'CASCADE',
                        as: 'notes'
                    })
                }
            }
        });
    return Note
};

export default model;