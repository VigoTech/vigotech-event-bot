const Events =  require('metagroup-schema-tools').Events

var members = null

function getMembers() {
    if (members == null) {
        members = getFromSource()
    }
    return members
}

function getEvents() {
    const data = getMembers()
    const events = {};

    for (let groupKey in data.members) {
        let group = data.members[groupKey];
        try {
            if (!group.nextEvents.length) {
                continue
            }

            for(let eventKey in group.nextEvents) {
                const event = group.nextEvents[eventKey]
                if (!event.date || event.date === undefined) {
                    continue
                }
                const date = new Date(event.date)
                const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                if (date.getTime() >= new Date().getTime()) {


                    if (events[dateString] === undefined) {
                        events[dateString] = []
                    }

                    event.groupKey = groupKey
                    event.group = group

                    events[dateString].push(event)
                }
            }
        }
        catch (e) {
            /*eslint no-console: "error"*/
            console.error(e);
        }
    }

    return events;
}


module.exports.members = getMembers
module.exports.events = getEvents


function getFromSource() {
    const request = require('sync-request');
    console.log(`Getting data from ${process.env.VIGOTECH_JSON}`)
    const res = request('GET', process.env.VIGOTECH_JSON);
    console.log(`Parsing data...`)
    const data = JSON.parse(res.getBody('utf8'));

    // Get root group next events
    const rootNextEvents = Events.getGroupNextEvents(data.events, {
        eventbriteToken: process.env.EVENTBRITE_OAUTH_TOKEN,
        member: data
    })
    data.nextEvent = rootNextEvents[0]
    data.nextEvents = rootNextEvents


    // Get members next events
    for(let memberKey in data.members) {
        const member = data.members[memberKey]
        const membersNextEvents = Events.getGroupNextEvents(member.events, {
            eventbriteToken: process.env.EVENTBRITE_OAUTH_TOKEN,
            member: member
        })
        data.members[memberKey].nextEvent = membersNextEvents[0]
        data.members[memberKey].nextEvents = membersNextEvents
        data.members[memberKey].twitter = getTwitter(member);
    }

    return data
}

function getTwitter(group) {
    if (group.links && group.links.twitter) {
        const components = group.links.twitter.split('/')
        const base = components.pop().split('?')
        return base[0];

    } else {
        return false;
    }
}