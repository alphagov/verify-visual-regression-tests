module.exports = async (page, scenario) => {
    if (scenario.removeChooseACertifiedCompany) {
        const companyDivs = await page.$$('.idp-choice.govuk-grid-row');
        companyDivs.forEach(async companyDiv => {
            await companyDiv.evaluate(div => {
                if (!div.contains(document.querySelector("button[value='Stub Idp Demo One']"))) {
                    div.style.cssText = 'display: none !important;';
                    div.classList.add('__86d');
                }
            })
        });
    }
}