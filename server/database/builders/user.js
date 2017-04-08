import bcrypt from 'bcrypt';
import models from '../models';
let model = models.User;

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

    static findByUN(un) {
        return model.findOne({
            include: [
                {
                    model: models.Student,
                    //attributes: ["specialization_id"],
                    as: 'student',
                    include: [
                        {
                            model: models.Specialization,
                            attributes: ['specialization_id','name'],
                            as: 'specializations',

                        }
                    ]
                },

            ],
            where: {
                username: un
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

        return model.create(data)
            .then((inserted) => {
                return inserted
            })
    }

    static update(u, t) {
        var data = {
            username: u.username,
            level: u.level,
        }

        return this.findById(u.user_id)
            .then((result) => {
                if (result.password != u.password) // compare password stored in db with that from client, if are different then add new password
                    data['password'] = bcrypt.hashSync(u.password, saltRounds);
                if (u.level == 3) // if the new user is an student add also registration number
                    data['registration_number'] = u.registration_number;

                return model.update(data, {
                    where: { user_id: u.user_id }
                })

            })
            .catch((error) => {
                console.log(error)
            })
    }

    static delete(id, t) {
        return model.destroy({
            where: { user_id: id }
        })
            .then((affectedRows) => {
                return affectedRows
            })
    }
}