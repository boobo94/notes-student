let model = require('../models').Note

export class Note {
    constructor() {

    }

    static findAll() {
        return model.findAll()
            .then(function(results) {
                return results
            })
    }

    static findById(id) {
        return model.findOne({
            where: {
                note_id: id
            }
        })
            .then(function(result) {
                return result
            })
    }

    static add(n, t) {
        return model.create({
            note: n.note,
            exam_date: n.exam_date,
            discipline_id: n.discipline_id,
            student_id: n.student_id
        })
            .then(function(inserted) {
                return inserted
            })
    }

    static update(n, t) {
        return model.update({
            note: n.note,
            exam_date: n.exam_date,
            discipline_id: n.discipline_id,
            student_id: n.student_id
        }, {
                where: { note_id: n.note_id }
            })
            .then(function(updated) {
                return updated
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { note_id: id }
        })
            .then(function(affectedRows) {
                return affectedRows
            })
    }
}