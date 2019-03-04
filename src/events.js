module.exports.events = function() {
    let events = [];

    const request = require('sync-request');
    const res = request('GET', process.env.VIGOTECH_JSON);
    const data = JSON.parse(res.getBody('utf8'));

    for (let groupKey in data.members) {
        let group = data.members[groupKey];
        try {
            if (!group.nextEvent || group.nextEvent.date === undefined) {
                continue;
            }
            const date = new Date(group.nextEvent.date);

            if (date.getTime() >= new Date().getTime()) {
                group.twitter = getTwitter(group);
                events.push(group);
            }
        }
        catch (e) {
          /*eslint no-console: "error"*/
            console.error(e);
        }
    }

    return events;
};

function getTwitter(group) {
    if (group.links && group.links.twitter) {
        const components = group.links.twitter.split('/')
        return components.pop()
    } else {
        return false;
    }
}