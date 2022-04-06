#!/bin/bash
cd /home/ubuntu/nbread/server

# export DATABASE_USERNAME=$(aws ssm get-parameters --region us-east-1 --names DATABASE_USERNAME --query Parameters[0].Value | sed 's/"//g')
# export DATABASE_PASSWORD=$(aws ssm get-parameters --region us-east-1 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
# export DATABASE_NAME=$(aws ssm get-parameters --region us-east-1 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
# export ACCESS_SECRET=$(aws ssm get-parameters --region us-east-1 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USERNAME=root
export DATABASE_PASSWORD=heejeyang
export DATABASE_NAME=nbread_development
export ACCESS_SECRET=dotnbread

authbind --deep pm2 start app.js