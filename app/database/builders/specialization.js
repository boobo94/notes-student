let model = require('../models').Specialization

export class Specialization {
    constructor() {

    }

    static findAll() {
        return model.findAll({
            attributes: ['specialization_id', 'name', 'short_name']
        })
            .then(function (spec) {//return all specializations as promise
                return spec
            })

    }

    static findById(id) {
        return model.findOne({
            attributes: ['specialization_id', 'name', 'short_name'],
            where: {
                specialization_id: id
            }
        })
            .then(function (spec) {
                return spec
            })
    }

    static add(s, t) {
        return model.create({
            //discipline_id: s.discipline_id,
            name: s.name,
            short_name: s.short_name,
        }, {
                transaction: t
            })
            .then(function (inserted) {
                return inserted
            })
    }

    static update(s, t) {
        return model.update({
            name: s.name,
            short_name: s.short_name
        }, {
                where: { specialization_id: s.specialization_id }
            }, {
                transaction: t
            })
            .then(function (updated) {
                return updated
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { specialization_id: id }, transaction: t
        })
            .then(function (affectedRows) {
                return affectedRows
            })
    }
}