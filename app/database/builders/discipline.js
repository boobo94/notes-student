let model = require('../models').Discipline

export class Discipline {
    constructor() {

    }

    static findAll() {
        return model.findAll()
            .then((results) => {
                return results
            })
    }

    static findById(id) {
        return model.findOne({
            where: {
                discipline_id: id
            }
        })
            .then((result) => {
                return result
            })
    }

    static add(d, t) {
        return model.create({
            name: d.name,
            short_name: d.short_name,
            type: d.type,
            year: d.year,
            examination: d.examination,
            credit_points: d.credit_points,
            semester: d.semester,
            specialization_id: d.specialization_id
        }, {
                transaction: t
            })
            .then((inserted) => {
                return inserted
            })
    }

    static update(d, t) {
        return model.update({
            name: d.name,
            short_name: d.short_name,
            type: d.type,
            year: d.year,
            examination: d.examination,
            credit_points: d.credit_points,
            semester: d.semester,
            specialization_id: d.specialization_id
        }, {
                where: { discipline_id: d.discipline_id }
            }, {
                transaction: t
            })
            .then((updated) => {
                return updated
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { discipline_id: id }, transaction: t
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }
}