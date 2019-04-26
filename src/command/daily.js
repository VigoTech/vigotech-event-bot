const moment = require('moment-timezone')

module.exports = function() {
    const events = require('../events').events();
    const tweet = require('../tweet');

    const date = new Date()
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    const todayEvents = events[dateString]

    if (todayEvents.length > 0) {
        if (todayEvents.length === 1) {
            let status = `Hoxe temos programado un evento. Máis info en https://vigotech.org`;
            tweet.post(status);
        }
        else {
            let status = `Hoxe temos programados ${todayEvents.length} eventos. Máis info en https://vigotech.org`;
            tweet.post(status);
        }

        for (let eventKey in todayEvents) {
            let event = todayEvents[eventKey]
            let group = event.group

            let eventDate = new Date(event.date);
            let eventTimeString = moment(eventDate).tz('Europe/Madrid').format('HH:mm')
            let groupname = group.twitter ? `@${group.twitter}` : group.name;

            let status = `Hoxe as ${eventTimeString}h, ${groupname} organiza: "${event.title}". +info ${event.url} ou en https://vigotech.org`;

            tweet.post(status);
        }
    }
};

function findTodayEvents(events) {
    return events.filter(item => {
        const date = new Date(item.nextEvent.date);
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

        const now = new Date();
        const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        return dateString === nowString;
    });
}