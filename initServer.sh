#!/usr/bin/env bash

user=runner
ip=192.168.1.84
app=turbo-template
image=isur/turbo-template

(cd ./infra && ansible-playbook playbook.yml -i inventory.yml -K --vault-password-file=$HOME/.vault_pass)

docker build . -t $image
docker save $image | bzip2 | pv | ssh -C $user@$ip docker load

pnpm build -F=front
rsync -avzr --delete ./apps/front/dist/ $user@$ip:~/apps/$app/data/html

ssh $user@$ip "cd ~/apps/$app; ./deploy.sh"
sleep 2
ssh $user@$ip "cd ~/apps/$app; ./deploy.sh"
