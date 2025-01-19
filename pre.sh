#!/bin/bash

# Specify the file path
ENV_API="./apps/api/.env"
ENV_API_TEMPLATE="./apps/api/env.template"
ENV_DOCKER="./.env.docker"
ENV_DOCKER_TEMPLATE="./env.docker.template"

# Check if the file exists
if [ -e "$ENV_API" ]; then
  echo "Api env file exists"
else
  echo "Coping api env file!"
  cp $ENV_API_TEMPLATE $ENV_API
fi
if [ -e "$ENV_DOCKER" ]; then
  echo "Docker env file exists"
else
  echo "Coping docker env file!"
  cp $ENV_DOCKER_TEMPLATE $ENV_DOCKER
fi
