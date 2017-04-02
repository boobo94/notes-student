import models from '../models';
let model = models.Note;

export class Note {
    constructor() {

    }

    static findAll() {
        return model.findAll()
            .then(function (results) {
                return results
            })
    }

    static findAllByStudentIDandSpecializationID(noteIDS) {
        return model.findAll({
            include: [
                {
                    model: models.Discipline,
                    attributes: ["name"],
                    as: 'disciplines',

                },
            ],
            where: {
                student_id: noteIDS.student_id,
                specialization_id: noteIDS.specialization_id
            }
        })
            .then(function (result) {
                return result
            })
    }

    static findById(id) {
        return model.findOne({
            where: {
                note_id: id
            }
        })
            .then(function (result) {
                return result
            })
    }

    static add(n, t) {
        return model.create({
            note: n.note,
            exam_date: n.exam_date,
            discipline_id: n.discipline_id,
            student_id: n.student_id,
            specialization_id: n.specialization_id
        })
            .then(function (inserted) {
                return inserted
            })
    }

    static update(n, t) {
        return model.update({
            note: n.note,
            exam_date: n.exam_date,
            discipline_id: n.discipline_id,
            student_id: n.student_id,
            specialization_id: n.specialization_id
        }, {
                where: { note_id: n.note_id }
            })
            .then(function (updated) {
                return updated
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { note_id: id }
        })
            .then(function (affectedRows) {
                return affectedRows
            })
    }
}