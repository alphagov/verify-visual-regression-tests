module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./submitFormHelper')(page, scenario);
  await require('./sortAboutCompanies')(page, scenario);
  await require('./sortChooseACertifiedCompany')(page, scenario);
  await require('./sortSignIn')(page, scenario);
};
