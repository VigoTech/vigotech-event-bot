const moment = require('moment-timezone')
const calendar = require('calendar-month-array')

module.exports = function() {
    const members = require('../events').members();
    const events = require('../events').events();
    const tweet = require('../tweet');

    moment.locale('gl');
    const weeks = calendar(new Date(), {
        weekStartDay: 1,
        formatHeader: date => moment(date).format('dddd').slice(0, 2),
        formatDate: date => {
            const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

            if (events[dateString] !== undefined) {
                return ' 📅'
            } else {
                return moment(date).format('DD')
            }
        },
        formatSiblingMonthDate: () => '  '
    })

    console.log(weeks)

    const status = 1

    tweet.post(status);

};

function findEventsInDate(events, date) {
    return events.filter(item => {
        const eventDate = new Date(item.nextEvent.date);
        const eventDateString = `${eventDate.getFullYear()}-${eventDate.getMonth()}-${eventDate.getDate()}`;

        const date = new Date();
        const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        return eventDateString === dateString;
    });
}