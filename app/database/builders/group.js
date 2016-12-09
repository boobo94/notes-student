let model = require('../models').Group

export class Group {
    constructor() {

    }

    static findAll() {
        return model.findAll();
    }

    static findById(id) {
        return model.findOne({
            where: {
                group_id: id
            }
        })
    }

    static add(g, t) {
        return model.create({
            student_id: g.name,
            name: g.short_name,
            year: g.year,
        }, { transaction: t })
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
    }

    static delete(id, t) {
        return model.destroy({
            where: { group_id: id }, transaction: t
        })
    }
}