#!/bin/bash

# This script simply echoes the domain that should be used to deploy each branch

META_DOMAIN="https://d2flxtrxean4fd.cloudfront.net/"
case $TRAVIS_BRANCH in
  "develop")
    META_DOMAIN="http://nightly.hevnly.com/uploads/image/"
    ;;
  "master")
    META_DOMAIN="https://image.staging.hevnly.com/"
    ;;
  *)
    META_DOMAIN="https://d2flxtrxean4fd.cloudfront.net/"
    ;;
esac

if [ $TRAVIS_TAG ]
then
  META_DOMAIN="https://d2flxtrxean4fd.cloudfront.net/"
fi

echo $META_DOMAIN