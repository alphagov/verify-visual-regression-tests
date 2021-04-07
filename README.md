# Verify - Visual Regression Testing
This repo contains configuration for BackstopJS to detect unintended visual regressions introduced by new code.

HEAVILY inspired by the [Digital Marketplace visual regression tests][dm_repo]. Thanks Digital Marketplace.

## Local setup
You'll need the frontend and hub running locally.

You'll also need node installed locally.

Clone this repo and run:
`npm install`

## Running tests locally
Simply run:
`npm run test`

With the basic setup as supplied, this will run an initial test on your localhost.  Everything will fail because you don't have any reference screenshots.  To get some references, simply approve your test run:

`npm run approve`

Now you can happily change your local frontend and run tests (with `npm run test`) to make sure you've not broken things!  Everytime you do a good change, simply `npm run approve` to update your reference screenshots.

## Running tests with Concourse

Concourse automatically runs the tests against staging and publishes the [HTML report to the PaaS][html_report].

If the tests fail you can use the HTML report to decide if you need to fix something or if you want to approve the diff.

### Approving the tests with Concourse
To approve the last tests run the `approve-visual-regression-tests` job. This will promote the last test images to the reference images and re-run the tests in the pipeline.

### Skipping the tests with Concourse

There may be situations where the tests fail but you don't want to approve the failures, or fix whatever made them fail. This is probably quite rare - maybe you just need to get a release out or something. To do this run the `skip-without-approval` job. The tests will still fail on the next run.

## Updating tests

To add new test scenarios, update `config.js` under the `scenarios` key and follow the format of other entries in the list. After your updates are merged to master Concourse will run the new tests automatically.

## Licence

Unless stated otherwise, the codebase is released under [the MIT License][mit].
This covers both the codebase and any sample code in the documentation.

The documentation is [&copy; Crown copyright][copyright] and available under the terms
of the [Open Government 3.0][ogl] licence.

[mit]: LICENCE
[copyright]: http://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/
[ogl]: http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
[html_report]: https://verify-visual-regression-test-report.cloudapps.digital/html_report/
[dm_repo]: https://github.com/alphagov/digitalmarketplace-visual-regression
