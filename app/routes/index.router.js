// import routers
import { Router as Admin} from "./admin.js"
import { Router as Client} from "./client.js"

//Api
import { Api as Specialization } from "./specialization.api.js"
import { Api as Discipline } from "./discipline.api.js"
import { Api as Group } from "./group.api.js"
import { Api as Note } from "./note.api.js"
import { Api as Students } from "./students.api.js"


export class Router {
    /**
     * @constructor
    */
    constructor(dependencies, middlewares) {
        this.dependencies = dependencies
        this.middlewares = middlewares
    }

    /**
     * @configure
     * @param {object} app -> express
     * Configure express routers
     */
    
    configure (app) {

        let client = new Client(this.middlewares, this.dependencies)
        app.use('/', client.router)
        
        let admin = new Admin(this.middlewares, this.dependencies)
        app.use('/admin', admin.router)

        //routes for api
        let specialization = new Specialization(this.middlewares, this.dependencies)
        app.use('/api/specialization', specialization.router)

        let discipline = new Discipline(this.middlewares, this.dependencies)
        app.use('/api/discipline', discipline.router)

        let group = new Group(this.middlewares, this.dependencies)
        app.use('/api/group', group.router)

        let students = new Students(this.middlewares, this.dependencies)
        app.use('/api/students', students.router)

        let note = new Note(this.middlewares, this.dependencies)
        app.use('/api/note', note.router)

    }

}