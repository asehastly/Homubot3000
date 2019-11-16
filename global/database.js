const moment = module.require('moment-timezone');

//var local = moment();
var startDate = moment().tz('Asia/Manila').format('HH:mm:ss');
var f_noti = moment('9:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
var s_noti = moment('10:00:00', 'HH:mm:ss').tz('Asia/Manila').format('HH:mm:ss');
//Computation from the time boss was set to 5:00 PM
var mf = moment(f_noti, "HH:mm:ss").diff(moment(startDate, "HH:mm:ss"));
var hf = moment.duration(mf);
//Computation from the time boss was set to 6:00 PM
var ms = moment(s_noti, "HH:mm:ss").diff(moment(startDate, "HH:mm:ss"));
var hs = moment.duration(ms);
//Computed number of milliseconds for the first post
var calc_f = Math.floor(hf.asHours()) + moment.utc(mf)
var display_f = Math.floor(hf.asHours()) + moment.utc(mf).format(":mm:ss");
//Computed number of milliseconds for the second post
var calc_s = Math.floor(hs.asHours()) + moment.utc(ms)
var display_s = Math.floor(hs.asHours()) + moment.utc(ms).format(":mm:ss");

function startTime() {
    return startDate;
}
function calc1() {
    return calc_f;
}
function calc2() {
    return calc_s;
}
function display1() {
    return display_f;
}
function display2() {
    return display_s;
}
module.exports = {
    startTime,
    calc1,
    calc2,
    display1,
    display2
}