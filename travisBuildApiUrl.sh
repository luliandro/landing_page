#!/bin/bash
# This script simply echoes the domain that should be used to deploy each branch

META_DOMAIN="https://hevnly.com"
case $TRAVIS_BRANCH in
  "develop")
    META_DOMAIN="http://nightly.hevnly.com"
    ;;
  "master")
    META_DOMAIN="http://beta.hevnly.com"
    ;;
  *)
    META_DOMAIN="https://hevnly.com"
    ;;
esac

if [ $TRAVIS_TAG ]
then
  META_DOMAIN="https://hevnly.com"
fi

echo $META_DOMAIN