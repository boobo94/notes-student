let model = require('../models').Student

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
            specialization_id: s.specialization_id
        }, {
                transaction: t
            })
            .then((inserted) => {
                return inserted
            })
    }

    static update(s, t) {
        return this.findById(s.student_id)// search after student id
            .then((result) => {
                if (result) {// if there exist a result
                    let json = {//create a new object without unique or not null object
                        name: s.name,
                        tax: s.tax,
                        specialization_id: s.specialization_id
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