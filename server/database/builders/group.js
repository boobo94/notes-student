let model = require('../models').Group

export class Group {
    constructor() {

    }

    static findAll() {
        return model.findAll()
            .then((results) => {
                return results
            })
    }

    static findById(student_id) {
        return model.findAll({
            where: {
                student_id: student_id
            }
        })
            .then((result) => {
                return result
            })
    }

    static add(g, t) {
        return model.create({
            student_id: g.student_id,
            specialization_id: g.specialization_id,
            name: g.name,
            year: g.year,
        }, {
                transaction: t
            })
            .then((inserted) => {
                return inserted.dataValues
            })
    }

    static update(g, t) {
        return model.update({
            student_id: g.student_id,
            specialization_id: g.specialization_id,
            name: g.name,
            year: g.year,
        }, {
                where: { group_id: g.group_id }
            }, {
                transaction: t
            })
            .then((updated) => {
                return updated
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { group_id: id }, transaction: t
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }
}