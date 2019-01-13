const { findMatches } = require('../src/index.js');

const expectAllParticipantsAreSenders = (participants, matchSet) => {
    const senders = Object.keys(matchSet);
    expect(participants.length).toEqual(senders.length);
    expect(new Set(participants)).toEqual(new Set(senders));
};

const expectAllParticipantsAreRecipients = (participants, matchSet) => {
    const recipients = Object.keys(matchSet);
    expect(participants.length).toEqual(recipients.length);
    expect(new Set(participants)).toEqual(new Set(recipients));
};

const expectNoParticipantsAreMatchedToThemselves = (matchSet) => {
    Object.entries(matchSet).forEach(([sender, recipient]) => {
        expect(sender).not.toEqual(recipient);
    });
};

const expectMatchSetsToBeValid = (participants, matchSets) => {
    const participantSet = new Set(participants);

    matchSets.forEach((matchSet) => {
        expectAllParticipantsAreSenders(participants, matchSet);
        expectAllParticipantsAreRecipients(participants, matchSet);
        expectNoParticipantsAreMatchedToThemselves(matchSet);
    });
};

describe('findMatches()', () => {
    it('finds no pairings with 0 participants', () => {
        expect(findMatches([])).toEqual([]);
    });

    it('finds no pairings with 1 participant', () => {
        expect(findMatches(['Han'])).toEqual([]);
    });

    it('finds no pairings with 2 participants', () => {
        expect(findMatches(['Han', 'Leia'])).toEqual([]);
    });

    it('finds 2 valid pairings with 3 participants', () => {
        const participants = ['Han', 'Leia', 'Luke'];
        const matchSets = findMatches(participants);

        expect(matchSets).toHaveLength(2);
        expectMatchSetsToBeValid(participants, matchSets);
    });

    it('finds 6 valid pairings with 4 participants', () => {
        const participants = ['Han', 'Leia', 'Luke', 'Chewie'];
        const matchSets = findMatches(participants);

        expect(matchSets).toHaveLength(6);
        expectMatchSetsToBeValid(participants, matchSets);
    });

    it.skip('finds 1 pairing with 3 participants and 1 exclusion', () => {});

    it.skip('finds no pairings with 3 participants and 1 symmetric exclusion', () => {});
});
