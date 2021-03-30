module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label);
  await require('./submitFormHelper')(page, scenario);
  await require('./removeAboutCompanies')(page, scenario);
  await require('./removeChooseACertifiedCompany')(page, scenario);
  await require('./sortSignIn')(page, scenario);
};
