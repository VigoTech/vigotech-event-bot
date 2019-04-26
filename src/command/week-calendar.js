const moment = require('moment-timezone')

module.exports = function() {
    const events = require('../events').events()
    const tweet = require('../tweet')
    const date = new Date()
    const calendarHeader = []
    const calendarDays = []
    let weekEvents = 0;

    moment.locale('gl')

    const monday = getMonday(date);
    for(let day = 0; day < 7; day++) {
        const date = new Date(monday)
        const weekDay = date.setDate(date.getDate() + day)
        calendarHeader.push(moment(weekDay).format('dddd').slice(0, 2))

        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        const todayEvents = events[dateString]

        if (todayEvents !== undefined && todayEvents.length > 0) {
            calendarDays.push('🔴')
            weekEvents += todayEvents.length
        } else {
            calendarDays.push(moment(date).format('DD'))
        }
    }

    const statusLines = []
    statusLines.push(calendarHeader.join(' '))
    statusLines.push(calendarDays.join(' '))
    statusLines.push('')
    statusLines.push(`Esta semán temos programados ${weekEvents} ${weekEvents === 1 ? 'evento' :'eventos'}.`)
    statusLines.push(`Máis info en https://vigotech.org`)

    if (weekEvents > 0) {
        tweet.post(statusLines.join('\n'))
    }
};

function getMonday(d) {
    d = new Date(d);
    let day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}
