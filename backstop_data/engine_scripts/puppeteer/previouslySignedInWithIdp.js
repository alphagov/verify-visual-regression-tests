module.exports = async (page, scenario) => {
    if (scenario.hasOwnProperty('previouslySignedInWithIDP')) {
        await page.goto(scenario.previouslySignedInWithIDP);

        await Promise.all([
            page.waitForNavigation(),
            page.click("button[value='Stub Idp Demo One']")
        ])

        await page.waitFor('#username');
        await page.type('#username', 'stub-idp-demo-one');

        await page.waitFor('#password');
        await page.type('#password', 'bar');

        await Promise.all([
            page.waitForNavigation(),
            page.click('#login')
        ])

        await Promise.all([
            page.waitForSelector("#logout"),
            page.click('#agree')
        ])

         await Promise.all([
             page.waitForNavigation(),
             page.click('#logout')
         ])

         await Promise.all([
             page.waitForNavigation(),
             page.click('.button.get-started')
         ])
    }
}