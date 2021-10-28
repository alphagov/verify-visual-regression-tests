module.exports = async (page, scenario) => {
    await require('./clearCookies')(page, scenario);
    await require('./getSession')(page, scenario);
    await require('./previouslySignedInWithIdp')(page, scenario);
};
