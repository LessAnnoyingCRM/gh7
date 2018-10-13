#!/usr/bin/env bash

gitBranch=master
gitDir=/home/gh7/git/gh7/
gitPath=/home/gh7/git/gh7/site/api/
livePath=/home/gh7/site/api/
excludeFile=/home/gh7/exclude

cd $gitDir
git fetch origin $gitBranch
git reset --hard FETCH_HEAD
git clean -xdf

rsync -aHxv --delete --cvs-exclude --exclude-from $excludeFile $gitPath $livePath
