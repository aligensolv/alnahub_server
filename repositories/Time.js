import moment from "moment"

class TimeRepository{
    static async getCurrentTime(){
        return moment().format('DD-MM-YYYY HH:mm:ss')
    }
}

export default TimeRepository