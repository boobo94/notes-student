let model = require('../models').Discipline

export class Discipline {
    constructor() {

    }

    static findAll() {
        return model.findAll();
    }

    static findById(id) {
        return model.findOne({
            where: {
                discipline_id: id
            }
        })
    }

    static add(d, t) {
        return model.create({
            //discipline_id: d.discipline_id,
            name: d.name,
            short_name: d.short_name,
            type: d.type,
            year: d.year,
            examination: d.examination,
            credit_points: d.credit_points,
            semester: d.semester,
            specialization_id: d.specialization_id
        }, { transaction: t })
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
    }

    static delete(id, t) {
        return model.destroy({
            where: { discipline_id: id }, transaction: t
        })
    }
}