module.exports = async (page, scenario) => {
    if (scenario.removeAboutCompanies) {
        const companyListItems = await page.$$('ul.list-companies > li');
        companyListItems.forEach(async companyListItem => {
            await companyListItem.evaluate(li => {
                if (li.firstElementChild.alt !== "Stub Idp Demo One logo") {
                    li.style.cssText = 'display: none !important;';
                    li.classList.add('__86d');
                }
            })
        });
    }
}