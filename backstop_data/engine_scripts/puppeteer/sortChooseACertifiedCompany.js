// The companies displayed on the choose a certified company page are rendered in a random order. This makes testing
// them difficult. This code will sort them into a predictable order without changing the HTML used to display them.

module.exports = async (page, scenario) => {
    if (scenario.sortChooseACertifiedCompany) {
        // find all the forms
        const companyForms = await page.$$('form');

        // We need to sort the companies by some criteria - doesn't really matter what as long as it's consistent between
        // test runs. Using the button name (which is the name of the IDP) works. We need to resolve the name
        // before sorting as the sort doesn't like async stuff.
        const companyFormsWithResolvedButtonName = await Promise.all(companyForms.map(async form => {
            let button = await form.$('button');
            let buttonName = await button.evaluate(button => { return button.name });
            return [form, buttonName];
        }));

        // Sort by the name we just retrieved
        companyFormsWithResolvedButtonName.sort((a, b) => { return a[1].localeCompare(b[1]) });

        // Now we need to resolve the innerHTML values for each sorted form. This needs doing before we
        // actually update the html in the page because of async weirdness.
        const innerHtml = [];
        for (let i = 0; i < companyFormsWithResolvedButtonName.length; i++) {
            const htmlHandle = await companyFormsWithResolvedButtonName[i][0].evaluateHandle(form => form.innerHTML);
            innerHtml.push(await htmlHandle.jsonValue());
        }

        // Now we finally update the original forms HTML with the sorted versions.
        for (let i = 0; i < companyForms.length; i++) {
            await companyForms[i].evaluate((form, htmlValue) => {
                form.innerHTML = htmlValue;
            }, innerHtml[i]);
        }
    }
}