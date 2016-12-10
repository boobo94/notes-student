// import routers
import { Router as Admin} from "./admin.js"
import { Router as Client} from "./client.js"

//Api
import { Api as Specialization } from "./api/specialization.api.js"


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

    }

}