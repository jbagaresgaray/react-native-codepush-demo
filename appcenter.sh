#!/usr/bin/env bash
version_name=`grep version package.json | sed 's/.*"version": "\(.*\)".*/\1/'`
version_code=`grep buildNumber package.json | sed 's/.*"buildNumber": "\(.*\)".*/\1/'`

echo "VersionName "$version_name
echo "VersionCode "$version_code

echo "FullVersion "$version_name"."$version_code

appcenter codepush release-react -a jbagaresgaray/ReactNativeCodePush -d Staging -t $version_name