function findTodayEvents(events) {
    return events.filter(item => {
        const date = new Date(item.nextEvent.date);
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

        const now = new Date();
        const nowString = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        return dateString === nowString;
    });
}

module.exports = function() {
    const events = require('../events').events();
    const tweet = require('../tweet');

    const todayEvents = findTodayEvents(events);


    if (todayEvents.length > 0) {
        if (todayEvents.length == 1) {
            tweet.post(`Hoxe temos programado un evento de ${todayEvents[0].name}. Máis info en ${todayEvents[0].nextEvent.url} ou en http://vigotech.org`);
        } else {
            tweet.post(`Hoxe temos programados ${todayEvents.length} eventos. Máis info en https://vigotech.org`);
        }
    }
};