#!/bin/bash

META_DOMAIN="http://magazine.hevnly.com"
case $TRAVIS_BRANCH in
  "develop")
    META_DOMAIN="http://magazine.nightly.hevnly.com"
    ;;
  "master")
    META_DOMAIN="http://magazine.beta.hevnly.com"
    ;;
  *)
    META_DOMAIN="http://magazine.hevnly.com"
    ;;
esac

if [ $TRAVIS_TAG ]
then
  META_DOMAIN="http://magazine.hevnly.com"
fi

echo $META_DOMAIN
