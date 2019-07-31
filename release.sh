#!/bin/bash
#menu.sh
 
git add .
echo 'git add success'
echo
echo "输入commit message"
read message
git commit -m "$message"
echo 'commit success'
echo
echo "选择要发布的方式?"
select var in release-major  release-minor release-patch;
do
    break
done
 
npm run $var

echo "release success"
git push --follow-tags origin master