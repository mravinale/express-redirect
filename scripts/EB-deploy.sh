#!/usr/bin/env bash

SHA1=$1
EB_BUCKET=elasticbeanstalk-us-east-1-627851191278

# Create dev Elastic Beanstalk version
DOCKERRUN_FILE=$SHA1-Dockerrun.aws.json
sed "s/<TAG>/$SHA1/" < Dockerrun.aws.json > $DOCKERRUN_FILE
sudo apt-get install awscli -y
aws s3 cp $DOCKERRUN_FILE s3://$EB_BUCKET/$DOCKERRUN_FILE --region us-east-1
aws elasticbeanstalk create-application-version --application-name progentec \
  --version-label $SHA1 --source-bundle S3Bucket=$EB_BUCKET,S3Key=$DOCKERRUN_FILE --region us-east-1

# Update Elastic Beanstalk environment to dev version
aws elasticbeanstalk update-environment --environment-name progentec-redirector \
    --version-label $SHA1 --region us-east-1 --description 'from progentec'
