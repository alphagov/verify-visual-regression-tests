module.exports = async (page, scenario) => {
    if (scenario.removeSignIn) {
        const companyForms = await page.$$("form[action='/sign-in']");
        companyForms.forEach(async companyForm => {
            await companyForm.evaluate(form => {
                if (!form.contains(form.querySelector("button[value='Stub Idp Demo One']"))) {
                    form.style.cssText = 'display: none !important;';
                    form.classList.add('__86d');
                }
            })
        });

        // remove all disconnected
        const companyWrappers = await page.$$('.govuk-grid-column-one-third.company-wrapper');
        companyWrappers.forEach(async companyWrapper => {
            await companyWrapper.evaluate(div => {
                if (!div.contains(div.querySelector(".govuk-button")) && !div.contains(div.querySelector("img[alt='Stub Idp Disconnected']"))) {
                    div.style.cssText = 'display: none !important;';
                    div.classList.add('__86d');
                }
            })
        });
    }
}