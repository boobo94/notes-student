// import routers
import { Router as Admin } from "./admin.js"
import { Router as Client } from "./client.api.js"

//Api
import { Api as Specialization } from "./specialization.api.js"
import { Api as Discipline } from "./discipline.api.js"
import { Api as Group } from "./group.api.js"
import { Api as Note } from "./note.api.js"
import { Api as Students } from "./students.api.js"
import { Api as User } from "./user.api.js"
import { Api as Authentification} from "./auth.api.js"

import { Auth } from '../middlewares/auth.js';


export class Router {
    /**
     * @constructor
    */
    constructor(config) {
        this.dependencies = null
        this.middlewares = {
            auth: new Auth(config)
        }
    }

    /**
     * @configure
     * @param {object} app -> express
     * Configure express routers
     */

    configure(app) {

        let client = new Client(this.middlewares, this.dependencies)
        app.use('/', client.router)

        let admin = new Admin(this.middlewares, this.dependencies)
        app.use('/admin', admin.router)

        let user = new User(this.middlewares, this.dependencies)
        app.use('/api/user', user.router)

        let auth = new Authentification(this.middlewares, this.dependencies)
        app.use('/api/auth', auth.router)

        //routes for api
        let specialization = new Specialization(this.middlewares, this.dependencies)
        app.use('/api/specialization', specialization.router)

        let discipline = new Discipline(this.middlewares, this.dependencies)
        app.use('/api/discipline', discipline.router)

        let group = new Group(this.middlewares, this.dependencies)
        app.use('/api/group', group.router)

        let students = new Students(this.middlewares, this.dependencies)
        app.use('/api/student', students.router)

        let note = new Note(this.middlewares, this.dependencies)
        app.use('/api/note', note.router)

    }

}