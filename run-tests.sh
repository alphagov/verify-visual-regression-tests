#!/usr/bin/env bash

set -e

environment=local
reset_state=false
refresh_reference_images=false

while getopts "ce:r" arg; do
  case $arg in
    e)
      environment=$OPTARG
      ;;
    c)
      reset_state=true
      ;;
    r)
      refresh_reference_images=true
      ;;
    *)
      echo "Use '-e' to set environment to local|staging|integration, '-c' to reset state, '-r' to refresh reference images"
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

if [[ $refresh_reference_images == "true" || ! -d backstop_data/bitmaps_reference ]]; then
echo "Refreshing reference images..."
VERIFY_TEST_RP_URL=$test_rp_url VERIFY_FRONTEND_DOMAIN=$frontend_domain npm run reference
fi

echo "Running tests against ${environment}"
npm install --silent
VERIFY_TEST_RP_URL=$test_rp_url VERIFY_FRONTEND_DOMAIN=$frontend_domain npm run test
