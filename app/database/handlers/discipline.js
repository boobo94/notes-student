
import { Discipline } from '../../database/builders/discipline.js'
import { Handler } from '../../database/handlers/handler.js'

export class Handler {
    /**
     * @constructor
     * @params {object} middlewares -> shared middlewares for routes
     * @params {object} dependencies -> shared dependencies services (models, builders, etc.)
     */
    constructor() {

    }

    static post(data) {

        return Discipline.add(data)
            .then(function (inserted) {
                return Handler.success()
            })
            .catch(function (error) {
                return Handler.error(error.message)
            })
    }

    static getAll() {
        return Discipline.findAll()
            .then(function (results) {
                if (results)
                    return Handler.successJson(results)
                else
                    return Handler.error('notfound')
            })
            .catch(function (error) {
                return Handler.error(error.message)
            })
    }

    static getOne(id) {
        return Discipline.findById(id)
            .then(function (result) {
                if (result && result.dataValues)
                    return Handler.successJson(result)
                else
                    return Handler.error('notfound')
            })
            .catch(function (error) {
                return Handler.error(error.message)
            })
    }

    static put(reqBody, id) {
        if (!reqBody)
            return res.status(400).send();

        var disc = {
            discipline_id: id,
            name: reqBody.name,
            short_name: reqBody.short_name,
            type: reqBody.type,
            year: reqBody.year,
            examination: reqBody.examination,
            credit_points: reqBody.credit_points,
            semester: reqBody.semester,
            specialization_id: reqBody.specialization_id
        }

        return Discipline.update(disc)
            .then(function (updated) {
                if (updated == 0)
                    return Handler.error('notupdated')
                else
                    return Handler.success()
            })
            .catch(function (error) {
                return Handler.error(error.message)
            })
    }

    static delete(id) {
        return Discipline.delete(id)
            .then(function (affectedRows) {
                if (!affectedRows) {
                    return Handler.error('notdeleted')
                }
                else {
                    return Handler.success()
                }
            })
            .catch(function (error) {
                return Handler.error(error.message)
            })

    }


}