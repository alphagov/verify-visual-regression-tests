#!/usr/bin/env bash

environment=local
reset_state=false

while getopts "ce:" arg; do
  case $arg in
    e)
      environment=$OPTARG
      ;;
    c)
      reset_state=true
      ;;
    *)
      echo "Use '-e' to set environment to local|staging|integration and '-c' to reset state"
      exit 1
      ;;
  esac
done

case $environment in
  local)
    test_rp_url=http://localhost:50130/test-rp
    frontend_domain=http://localhost:50300
    ;;
  staging)
    test_rp_url=https://test-rp-staging.cloudapps.digital/test-rp
    frontend_domain=https://www.staging.signin.service.gov.uk
    ;;
  integration)
    test_rp_url=https://test-rp-integration.cloudapps.digital/test-rp
    frontend_domain=https://www.integration.signin.service.gov.uk
    ;;
  *)
    echo "Invalid environment: ${environment}"
    exit 1
    ;;
esac

if [[ $reset_state == "true" ]]; then
  echo "Resetting state..."
  rm -Rf backstop_data/bitmaps_reference
  rm -Rf backstop_data/bitmaps_test
  rm -Rf backstop_data/html_report
fi

echo "Running tests against ${environment}"
npm install --silent
VERIFY_TEST_RP_URL=$test_rp_url VERIFY_FRONTEND_DOMAIN=$frontend_domain npm run test
