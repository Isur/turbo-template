#!/bin/bash

echo Deploying app
docker compose -f ./docker-compose-nossl.yml up -d
docker image prune -f
echo Deployed app
