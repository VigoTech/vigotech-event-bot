function findUpcomingEvents(events, range) {
  return events.filter(item => {
    const date = new Date(item.nextEvent.date)
    const now = new Date('2018-12-12 18:30')

    return (date.getTime() >= now.getTime()) && (date.getTime() <= (now.getTime() + range * 60 * 1000))
  })
}

module.exports = function(argv) {
  const events = require('../events').events();
  const tweet = require('../tweet');

  const upcommingEvents = findUpcomingEvents(events, parseInt(argv.minutes) + 1 )


  for (let groupKey in upcommingEvents) {
    let group = events[groupKey]
    let eventDate = new Date(group.nextEvent.date)
    let eventTimeString = (eventDate.getHours() < 10 ? '0': '') + eventDate.getHours() + ':' + (eventDate.getMinutes() < 10 ? '0': '') + eventDate.getMinutes();
    let status = `O evento de ${group.name} (${group.nextEvent.title}) comeza as ${eventTimeString}. Máis info ${group.nextEvent.url} ou en http://vigotech.org`

    tweet.post(status);
  }
}