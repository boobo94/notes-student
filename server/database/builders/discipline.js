import models from '../models';
let model = models.Discipline

export class Discipline {
    constructor() {

    }

    static findAll() {
        return model.findAll({
            include: [
                {
                    model: models.Specialization,
                    attributes: ["specialization_id"],
                    as: 'specializations',
                    through: {
                        attributes: []
                    }
                },
            ],
            order: [
                ['discipline_id', 'ASC']
            ]
        })
            .then((results) => {
                return results
            })
    }

    static findAllBySpecializationID(id) {
        return model.findAll({
            include: [
                {
                    model: models.Specialization,
                    attributes: ["specialization_id"],
                    as: 'specializations',
                    where: {
                        specialization_id: id
                    }
                },
            ],

        })
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
        })
            .then((inserted) => {
                return inserted.setSpecializations(d.specialization_id) // after insert a new record in discipline table, also in relationship table discipline_specialization should be added
                    .then((discipline_specializations) => {
                        return discipline_specializations
                    })
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
            })
            .then((updated) => {
                return this.findById(d.discipline_id)
                    .then((result) => {
                        if (result && result.dataValues) {
                            return result.setSpecializations(d.specialization_id) // after update a new record in discipline table was added, also in relationship table discipline_specialization should be added
                                .then((discipline_specializations) => {
                                    return discipline_specializations
                                })
                        }
                        else
                            return updated;
                    })
                    .catch((error) => {
                        console.log(error)
                    })

            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { discipline_id: id }
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }
}