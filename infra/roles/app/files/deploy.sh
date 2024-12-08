#!/bin/bash

echo Deploying app
docker compose -f ./docker-compose-ssl.yml up -d
docker image prune -f
echo Deployed app
