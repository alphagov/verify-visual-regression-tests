module.exports = async (page, scenario) => {
    if (scenario.hasOwnProperty('selectDocuments')) {
        await page.goto(scenario.selectDocuments)

        await page.waitFor('#select_documents_form_has_valid_passport')
        await page.waitFor('#select_documents_form_has_driving_license')
        await page.waitFor('#select_documents_form_has_phone_can_app')
        await page.waitFor('#select_documents_form_has_credit_card')

        await page.click('#select_documents_form_has_valid_passport')
        await page.click('#select_documents_form_has_driving_license')
        await page.click('#select_documents_form_has_phone_can_app')
        await page.click('#select_documents_form_has_credit_card')

        await Promise.all([
          page.waitForNavigation(),
          page.click('#next-button')
        ]);
    }
}