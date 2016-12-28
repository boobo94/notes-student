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

    static findById(id) {
        return model.findOne({
            where: {
                group_id: id
            }
        })
            .then((result) => {
                return result
            })
    }

    static add(g, t) {
        return model.create({
            student_id: g.name,
            name: g.short_name,
            year: g.year,
        }, {
                transaction: t
            })
            .then((inserted) => {
                return inserted
            })
    }

    static update(g, t) {
        return model.update({
            student_id: g.name,
            name: g.short_name,
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