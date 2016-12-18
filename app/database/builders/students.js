let model = require('../models').Student

export class Students {
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
                student_id: id
            }
        })
            .then(function(result) {
                return result
            })
    }

    static add(s, t) {
        return model.create({
            name: s.name,
            tax: s.tax,
            registration_number: s.registration_number,
            specialization_id: s.specialization_id
        }, {
                transaction: t
            })
            .then(function(inserted) {
                return inserted
            })
    }

    static update(s, t) {
        return model.update(s, {
                where: { student_id: s.student_id }
            }, {
                transaction: t
            })
            .then(function(updated) {
                return updated
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { students_id: id }, transaction: t
        })
            .then(function(affectedRows) {
                return affectedRows
            })
    }
}