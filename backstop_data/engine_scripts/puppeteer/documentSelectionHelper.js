module.exports = async (page, scenario) => {
    if (scenario.selectDocuments) {
        let frontendDomain = process.env.VERIFY_FRONTEND_DOMAIN
        await page.goto(frontendDomain + "/about-documents")

        await Promise.all([
            page.waitForNavigation(),
            page.click('#next-button')
        ]);
    }
}