const isSender = (participant, matchSet) =>
    Object.keys(matchSet).includes(participant);

const isRecipient = (participant, matchSet) =>
    Object.values(matchSet).includes(participant);

function findMatches(participants, matchSet = {}) {
    const matchSets = [];

    const sender = participants.find(
        (participant) => !isSender(participant, matchSet)
    );

    participants.forEach((recipient) => {
        if (
            sender !== recipient &&
            matchSet[recipient] !== sender &&
            !isRecipient(recipient, matchSet)
        ) {
            const newMatchSet = {
                [sender]: recipient,
                ...matchSet
            };

            if (Object.keys(newMatchSet).length === participants.length) {
                matchSets.push(...[newMatchSet]);
            } else {
                matchSets.push(...findMatches(participants, newMatchSet));
            }
        }
    });

    return matchSets;
}

module.exports = { findMatches };
