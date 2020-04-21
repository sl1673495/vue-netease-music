#!/bin/bash

echoCommon()
{
  echo -e "\033[33m $1 \033[0m"
}

echoFail()
{
  echo -e "\033[31m $1 \033[0m"
}

echoSuccess()
{
  echo -e "\033[32m $1 \033[0m"
}

git pull
echoSuccess 'git pull success'
git add .
echoSuccess 'git add success'
echo
git cz
echoSuccess 'commit success'
echo
echoCommon "选择要发布的方式?"
select var in release-major release-minor release-patch;
do
    break
done
 
npm run $var

if [ $? -eq 0 ]; then
    echoSuccess "release success"
    echoCommon "start building"
    git push --follow-tags origin master
    npm run build
else
    echoFail "release failed"
fi
