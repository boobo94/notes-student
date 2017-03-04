import bcrypt from 'bcrypt'
let model = require('../models').User

const saltRounds = 9;
export class User {
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
                user_id: id
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

    static findByUsername(username) {
        return model.findOne({
            where: {
                username: username
            }
        })
            .then((result) => {
                return result
            })
    }

    static add(u, t) {
        var data = {
            username: u.username,
            password: bcrypt.hashSync(u.password, saltRounds),
            level: u.level,
        }

        if (u.level == 3) // if the new user is an student add also registration number
            data['registration_number'] = u.registration_number;

        return model.create(data, {
            transaction: t
        })
            .then((inserted) => {
                return inserted
            })
    }

    static update(u, t) {
        var data = {
            username: u.username,
            level: u.level,
        }
        if (u.password)
            data['password'] = bcrypt.hashSync(u.password, saltRounds);
        if (u.level == 3) // if the new user is an student add also registration number
            data['registration_number'] = u.registration_number;

        return model.update(data, {
            where: { user_id: u.user_id }
        }, {
                transaction: t
            })

    }

    static delete(id, t) {
        return model.destroy({
            where: { user_id: id },
            transaction: t
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }
}