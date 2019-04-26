const moment = require('moment-timezone')

function findUpcomingEvents(events, range) {
    return events.filter(item => {
        const date = new Date(item.date);
        const now = new Date();
        return (date.getTime() >= (now.getTime() + 60 * 1000)) && (date.getTime() <= (now.getTime() + range * 60 * 1000));
    });
}

module.exports = function(argv) {
    const eventsByDate = require('../events').events();
    const tweet = require('../tweet');
    const events = Object.values(eventsByDate).flat()
    const upcommingEvents = findUpcomingEvents(events, parseInt(argv.minutes) + 1 );


    for (let eventKey in upcommingEvents) {
        const event = upcommingEvents[eventKey]
        const group = event.group

        let eventDate = new Date(event.date);
        let eventTimeString = moment(eventDate).tz('Europe/Madrid').format('HH:mm')
        let groupname = group.twitter ? `@${group.twitter}` : group.name;

        let status = `O evento de ${groupname} (${event.title}) comeza as ${eventTimeString}. +info ${event.url} ou en https://vigotech.org`;

        tweet.post(status);
    }
};