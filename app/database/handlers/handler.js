import msg from "./messages.json";

export class Handler {

    constructor() {

    }

    /**
     * @params {string} message -> an existent message from messages.json file 
     */
    static success(message){
        return {
            status: msg.success,
            message: msg[message] ? msg[message] : message
        }
    }

    /**
     * @params {object} data -> data in json format 
     */
    static successJson(data){
        return {
            status: msg.success,
            data: data
        }
    }

    /**
     * @params {string} message -> an existent message from messages.json file 
     */
    static error(message){
        return {
            status: msg.error,
            message: msg[message] ? msg[message] : message
        }
    }
}