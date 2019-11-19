const moment = module.require('moment-timezone');

module.exports = {
    startTime: function() {
        let startDate = moment().tz('Asia/Manila').format('HH:mm:ss');
        let f_noti = moment('17:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
        let s_noti = moment('18:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
        return {ct: startDate,fet: f_noti, set: s_noti};
    },
    calc1: function() { //Calculates the miliseconds for the first post
        let ct = this.startTime().ct;
        let fet = this.startTime().fet;
        let mf = moment(fet, "HH:mm:ss").diff(moment(ct, "HH:mm:ss"));
        let hf = moment.duration(mf);
        let calc_f = Math.floor(hf.asHours()) + moment.utc(mf)
        return calc_f;
    },
    calc2: function() { //Calculates the miliseconds for the second post
        let ct = this.startTime().ct;
        let set = this.startTime().set;
        let ms = moment(set, "HH:mm:ss").diff(moment(ct, "HH:mm:ss"));
        let hs = moment.duration(ms);
        let calc_s = Math.floor(hs.asHours()) + moment.utc(ms);
        return calc_s;
        
    },
    display1: function() { //Displays the calulated from the first post
        let ct = this.startTime().ct;
        let fet = this.startTime().fet;
        let mf = moment(fet, "HH:mm:ss").diff(moment(ct, "HH:mm:ss"));
        let hf = moment.duration(mf);
        let display_f = Math.floor(hf.asHours()) + moment.utc(mf).format(":mm:ss");
        return display_f;
        
    },
    display2: function() { //Displays the calulated from the second post
        let ct = this.startTime().ct;
        let set = this.startTime().set;
        let ms = moment(set, "HH:mm:ss").diff(moment(ct, "HH:mm:ss"));
        let hs = moment.duration(ms);
        let display_s = Math.floor(hs.asHours()) + moment.utc(ms).format(":mm:ss");
        console.log(set);
        return display_s;
    }
}