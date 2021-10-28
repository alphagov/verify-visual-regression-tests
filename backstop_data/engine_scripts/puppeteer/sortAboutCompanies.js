// The company logos displayed on the about page are rendered in a random order. This makes testing them difficult. This
// code will sort them into a predictable order without changing the HTML used to display them.

module.exports = async (page, scenario) => {
    if (scenario.sortAboutCompanies) {
        // find all the list items containing company logos
        const companyListItems = await page.$$('ul.list-companies > li');

        // We need to sort the logos by some criteria - doesn't really matter what as long as it's consistent between
        // test runs. Using the image alt text (which is the name of the IDP) works. We need to resolve the alt text
        // before sorting as the sort doesn't like async stuff.
        const companyListItemsWithResolvedImgAlt = await Promise.all(companyListItems.map(async listItem => {
            let image = await listItem.$('img');
            let imageAlt = await image.evaluate(image => { return image.alt });
            return [listItem, imageAlt];
        }));

        // Sort by the alt text we just retrieved
        companyListItemsWithResolvedImgAlt.sort((a, b) => { return a[1].localeCompare(b[1]) });

        // Now we need to resolve the innerHTML values for each sorted list item. This needs doing before we
        // actually update the html in the page because of async weirdness.
        const innerHtml = [];
        for (let i = 0; i < companyListItemsWithResolvedImgAlt.length; i++) {
            const htmlHandle = await companyListItemsWithResolvedImgAlt[i][0].evaluateHandle(img => img.innerHTML);
            innerHtml.push(await htmlHandle.jsonValue());
        }

        // Now we finally update the original list items HTML with the sorted versions.
        for (let i = 0; i < companyListItems.length; i++) {
            await companyListItems[i].evaluate((listItem, htmlValue) => {
                listItem.innerHTML = htmlValue;
            }, innerHtml[i]);
        }
    }
}