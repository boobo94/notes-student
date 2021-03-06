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

    static findById(student_id, queryParams) {
        let whereObj = {
            student_id: student_id
        }
        if (queryParams.specialization_id)
            whereObj.specialization_id = queryParams.specialization_id;

        return model.findAll({
            where: whereObj,
            order: [
                ['year', 'ASC']
            ]
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
            })
            .then((updated) => {
                return updated
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { group_id: id }
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }

    static deleteBySpecializationId(ids) {
        return model.destroy({
            where: {
                specialization_id: ids.specialization_id,
                student_id: ids.student_id
            }
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }
}