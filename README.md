# Instruction

## Alias

    export bucket=xraynodejstestbucket
    export table=xraynodejstesttable
    export rolearn=arn:aws:iam::185174815983:role/xraytest

## Prepare zip files

    npm install aws-sdk
    npm install aws-xray-sdk
    zip -r9 dbput.zip dbput.js node_modules
    zip -r9 dbtrigger.zip dbtrigger.js node_modules
    zip -r9 s3put.zip s3put.js node_modules
    zip -r9 s3trigger.zip s3trigger.js node_modules

## Create bucket and table

    aws s3 mb s3://${bucket}
    aws dynamodb create-table --table-name ${table} --attribute-definitions "[{\"AttributeName\":\"key\",\"AttributeType\":\"S\"}]" --key-schema "[{\"AttributeName\":\"key\",\"KeyType\":\"HASH\"}]" --provisioned-throughput "{\"ReadCapacityUnits\":5,\"WriteCapacityUnits\":5}"

## Create functions

    aws lambda create-function --function-name dbput --runtime nodejs6.10 --role ${rolearn} --handler dbput.handler --zip-file fileb://dbput.zip --tracing-config "{\"Mode\":\"Active\"}"
    aws lambda create-function --function-name s3put --runtime nodejs6.10 --role ${rolearn} --handler s3put.handler --zip-file fileb://s3put.zip --tracing-config "{\"Mode\":\"Active\"}"
    aws lambda create-function --function-name dbtrigger --runtime nodejs6.10 --role ${rolearn} --handler dbtrigger.handler --zip-file fileb://dbtrigger.zip --tracing-config "{\"Mode\":\"Active\"}"
    aws lambda create-function --function-name s3trigger --runtime nodejs6.10 --role ${rolearn} --handler s3trigger.handler --zip-file fileb://s3trigger.zip --tracing-config "{\"Mode\":\"Active\"}"

## Configure trigger

Go to Lambda console and set ${bucket} as s3trigger's trigger, and ${table} as dbtrigger's trigger.

## Test

    aws lambda invoke --function-name dbput --payload "{\"table\":\"${table}\",\"key\":\"key\"}" outfile
    aws lambda invoke --function-name s3put --payload "{\"bucket\":\"${bucket}\",\"key\":\"key\"}" outfile
    