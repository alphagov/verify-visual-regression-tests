module.exports = async (page, scenario) => {
    if (scenario.hasOwnProperty('getSession')) {
        await page.goto(scenario.getSession)
        await Promise.all([
            page.waitForNavigation(),
            page.click('.button.get-started')
        ])
    }
}