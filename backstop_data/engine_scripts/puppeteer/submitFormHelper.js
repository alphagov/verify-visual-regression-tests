module.exports = async (page, scenario) => {
    if (scenario.submitForm) {
        await Promise.all([
            page.waitForNavigation(),
            page.$eval(
                'main form',
                form => form.submit(),
            ),
        ]);
    }
};
