import models from '../models';
let model = models.Student

export class Students {
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
            where: {
                student_id: id
            }
        })
            .then((result) => {
                return result
            })
    }

    static findByRN(rn) {
        return model.findOne({
            where: {
                registration_number: rn
            }
        })
            .then((result) => {
                return result
            })
    }

    static add(s, t) {
        return model.create({
            name: s.name,
            tax: s.tax,
            registration_number: s.registration_number,
        }, {
                transaction: t
            })
            .then((inserted) => {
                return inserted.setSpecializations(s.specialization_id)
                    .then((student_specializations) => {
                        return student_specializations
                    })
            })
    }

    static update(s, t) {
        return this.findById(s.student_id)// search after student id
            .then((result) => {
                if (result) {// if there exist a result
                    let json = {//create a new object without unique or not null object
                        name: s.name,
                        tax: s.tax
                    }
                    if (s.registration_number != result.dataValues.registration_number) // we check if new registration number is different than existen one
                        json['registration_number'] = s.registration_number// if it is we will add to the json object created previous

                    return json
                }
            })
            .then((data) => {// if we've created an object in previous step, now we'll update the record
                return model.update(data, {
                    where: { student_id: s.student_id }
                }, {
                        transaction: t
                    })
            })
            .catch(() => {// if no record was found return 0
                return 0;
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { student_id: id },
            transaction: t
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }
}