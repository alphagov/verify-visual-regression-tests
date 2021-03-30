var testRpUrl = process.env.VERIFY_TEST_RP_URL || 'http://localhost:50130/test-rp'
var frontendDomain = process.env.VERIFY_FRONTEND_DOMAIN || 'http://localhost:50300'

module.exports = {
  "id": "backstop_verify",
  "viewports": [
//    {
//      "label": "phone",
//      "width": 320,
//      "height": 480
//    },
//    {
//      "label": "tablet",
//      "height": 768,
//      "width": 1024
//    },
    {
      "label": "desktop",
      "width": 1366,
      "height": 768
    }
  ],
  "misMatchThreshold": 0,
  "requireSameDimensions": false,
  "onBeforeScript": "onBefore.js",
  "onReadyScript": "onReady.js",
  "scenarios": [
    {
      "label": "Start",
      "url": frontendDomain + "/start",
      "getSession": testRpUrl,
    },
    {
      "label": "Start with previous IDP",
      "url": frontendDomain + "/start",
      "getSession": testRpUrl,
      "previouslySignedInWithIDP": frontendDomain + "/sign-in",
    },
    {
      "label": "About",
      "url": frontendDomain + "/about",
      "getSession": testRpUrl,
      "removeAboutCompanies": true
    },
    {
      "label": "Will it work for me",
      "url": frontendDomain + "/will-it-work-for-me",
      "getSession": testRpUrl,
    },
    {
      "label": "Will it work for me - validation",
      "url": frontendDomain + "/will-it-work-for-me",
      "getSession": testRpUrl,
      "submitForm": true
    },
    {
      "label": "Select documents",
      "url": frontendDomain + "/select-documents",
      "getSession": testRpUrl,
    },
    {
      "label": "Select documents - validation",
      "url": frontendDomain + "/select-documents",
      "getSession": testRpUrl,
      "submitForm": true
    },
    {
      "label": "Choose a certified company",
      "url": frontendDomain + "/choose-a-certified-company",
      "getSession": testRpUrl,
      "selectDocuments": frontendDomain + "/select-documents",
      "removeChooseACertifiedCompany": true
    },
    {
      "label": "About company",
      "url": frontendDomain + "/choose-a-certified-company/stub-idp-demo-one",
      "getSession": testRpUrl,
    },
    {
      "label": "Sign in",
      "url": frontendDomain + "/sign-in",
      "getSession": testRpUrl,
      "sortSignIn": true
    },
  ],
  "paths": {
    "bitmaps_reference": "backstop_data/bitmaps_reference",
    "bitmaps_test": "backstop_data/bitmaps_test",
    "engine_scripts": "backstop_data/engine_scripts/puppeteer",
    "html_report": "backstop_data/html_report"
  },
  "report": ["browser"],
  "engine": "puppeteer",
  "engineOptions": {
    "args": ["--no-sandbox"],
  },
  "debug": false,
  "debugWindow": false
}
