// The companies displayed on the sign in page are rendered in a random order. This makes testing them difficult. This
// code will sort them into a predictable order without changing the HTML used to display them.

module.exports = async (page, scenario) => {
    if (scenario.sortSignIn) {
        // find all the containers with IDP logos in - this includes disconnected IDPs.
        const companyInners = await page.$$(".company-inner");

        // Filter out the disconnecting IDPs. It uses async methods so we have to map the values to true/false before
        // filtering or it doesn't work.
        const acceptingSignInsCompanyInnersBool = await Promise.all(companyInners.map(inner => {
            return inner.evaluate(div => {
                return div.contains(div.querySelector(".govuk-button"));
            });
        }));
        const acceptingSignInsCompanyInners = companyInners.filter((_v, index) => {
            return acceptingSignInsCompanyInnersBool[index];
        })

        // We need to sort the IDPs by some criteria - doesn't really matter what as long as it's consistent between
        // test runs. Using the button name (which is actually the IDPs entityID) works. We need to resolve the names
        // before sorting as the sort doesn't like async stuff.
        const companyInnersWithResolvedButtonNames = await Promise.all(acceptingSignInsCompanyInners.map(async companyInner => {
            let button = await companyInner.$(".govuk-button");
            let buttonName = await button.evaluate(button => { return button.name });
            return [companyInner, buttonName];
        }))

        // Sort by the name we just retrieved
        companyInnersWithResolvedButtonNames.sort(sortCompanyInners)

        // Now we need to resolve the innerHTML values for each sorted company inner. Again this needs doing before we
        // actually update the html in the page because of async weirdness.
        const innerHtmlValues = await resolveCompanyInnerHtml(companyInnersWithResolvedButtonNames);

        // Now we finally update the original company inners HTML with the sorted versions.
        await updatePageHtml(acceptingSignInsCompanyInners, innerHtmlValues)

        // Now do it all again for the disconnected IDPs

        // Only keep disconnecting IDPs. It uses async methods so we have to map the values to true/false before
        // filtering or it doesn't work.
        const disconnectedCompanyInnersBool = await Promise.all(companyInners.map(inner => {
            return inner.evaluate(div => {
                return !div.contains(div.querySelector(".govuk-button"));
            });
        }));
        const disconnectedCompanyInners = companyInners.filter((_v, index) => {
            return disconnectedCompanyInnersBool[index];
        })

        // We need to sort the IDPs by some criteria - doesn't really matter what as long as it's consistent between
        // test runs. Using the image alt text which is the IDP name. We need to resolve the names
        // before sorting as the sort doesn't like async stuff.
        const disconnectedCompanyInnersWithResolvedImgAlt = await Promise.all(disconnectedCompanyInners.map(async companyInner => {
            let image = await companyInner.$("img");
            let imageAlt = await image.evaluate(image => { return image.alt });
            return [companyInner, imageAlt];
        }))

        // Sort by the image alt we just retrieved
        disconnectedCompanyInnersWithResolvedImgAlt.sort(sortCompanyInners)

        // Now we need to resolve the innerHTML values for each sorted company inner. Again this needs doing before we
        // actually update the html in the page because of async weirdness.
        const disconnectingInnerHtmlValues = await resolveCompanyInnerHtml(disconnectedCompanyInnersWithResolvedImgAlt);

        // Now we finally update the original company inners HTML with the sorted versions.
        await updatePageHtml(disconnectedCompanyInners, disconnectingInnerHtmlValues)
    }

    function sortCompanyInners(a, b) {
        return a[1].localeCompare(b[1]);
    }

    async function resolveCompanyInnerHtml(arrayOfInnersWithSortAttribute) {
        let innerHtmlValues = [];
        for (let i = 0; i < arrayOfInnersWithSortAttribute.length; i++) {
            const htmlHandle = await arrayOfInnersWithSortAttribute[i][0].evaluateHandle(div => div.innerHTML);
            innerHtmlValues.push(await htmlHandle.jsonValue());
        }
        return innerHtmlValues;
    }

    async function updatePageHtml(companyInners, htmlValues) {
        for (let i = 0; i < companyInners.length; i++) {
            await companyInners[i].evaluate((companyInner, htmlValue) => {
                companyInner.innerHTML = htmlValue;
            }, htmlValues[i])
        }
    }
}