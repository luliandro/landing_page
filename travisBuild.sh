#!/bin/bash

# This script simply echoes the domain that should be used to deploy each branch

META_DOMAIN="http://meta.hevnly.com"
case $TRAVIS_BRANCH in
  "develop")
    META_DOMAIN="http://meta.staging.hevnly.com"
    ;;
  "master")
    META_DOMAIN="http://meta.staging.hevnly.com"
    ;;
  *)
    META_DOMAIN="http://meta.hevnly.com"
    ;;
esac

if [ $TRAVIS_TAG ]
then
  META_DOMAIN="http://meta.hevnly.com"
fi

echo $META_DOMAIN
