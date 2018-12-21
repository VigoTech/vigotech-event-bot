const moment= require('moment-timezone')

function findUpcomingEvents(events, range) {
    return events.filter(item => {
        const date = new Date(item.nextEvent.date);
        const now = new Date();

        range = 60 * 24;
        
        return (date.getTime() >= (now.getTime() + 60 * 1000)) && (date.getTime() <= (now.getTime() + range * 60 * 1000));
    });
}

module.exports = function(argv) {
    const events = require('../events').events();
    const tweet = require('../tweet');
    const upcommingEvents = findUpcomingEvents(events, parseInt(argv.minutes) + 1 );
        
    for (let groupKey in upcommingEvents) {
        let group = upcommingEvents[groupKey];
        let eventDate = new Date(group.nextEvent.date);
        let eventTimeString = moment().timezone(eventDate,'Europe/Madrid').format('HH:mm')
        let status = `O evento de ${group.name} (${group.nextEvent.title}) comeza as ${eventTimeString}. +info ${group.nextEvent.url} ou en https://vigotech.org`;

        console.log(status)
        //tweet.post(status);
    }
};