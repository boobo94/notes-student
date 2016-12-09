let model = require('../models').Specialization

export class Specialization {
    constructor() {

    }

    static findAll() {
        return model.findAll();
    }

    static findById(id) {
        return model.findOne({
            where: {
                specialization_id: id
            }
        })
    }

    static add(s, t) {
        return model.create({
            //discipline_id: s.discipline_id,
            name: s.name,
            short_name: s.short_name,
            type: s.type,
            year: s.year,
            examination: s.examination,
            credit_points: s.credit_points,
            semester: s.semester,
            specialization_id: s.specialization_id
        }, { transaction: t })
    }

    static update(s, t) {
        return model.update({
            name: s.name,
            short_name: s.short_name,
            type: s.type,
            year: s.year,
            examination: s.examination,
            credit_points: s.credit_points,
            semester: s.semester,
            specialization_id: s.specialization_id
        }, {
                where: { specialization_id: s.specialization_id }
            }, {
                transaction: t
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { specialization_id: id }, transaction: t
        })
    }
}