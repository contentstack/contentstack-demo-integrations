
# Contentstack | Auto Publish Entry Using AWS Lambda
[Contentstack](https://www.contentstack.com/) auto-publish an entry when it is updated or created on a desired environment(s) by using AWS Lambda.
## Steps

 1. Create a Contentstack [stack management token](https://www.contentstack.com/docs/guide/tokens#management-tokens)
 2. Set up an AWS Lambda function and API Gateway
 3. Set up Contenstack [webhook](https://www.contentstack.com/docs/guide/webhooks)
 
## Configuration

### AWS

#### Lambda
 - Create a new lambda function which gets triggered by the API gateway
 - Use the ***index.zip*** file present in the root folder of the current repo as your AWS lambda code. Then, add the following environment variable
 
 ##### Aws Lambda Environment Variables
 - **CONTENTSTACK_STACK_MANAGEMENT_TOKEN**= contentstack stack management token
 - **CONTENTSTACK_STACK_API_KEY** = contentstack stack api key
 
### Contentstack

#### Stack Management Token
 - Create a [stack management token](https://www.contentstack.com/docs/guide/tokens#management-tokens) with read and write permissions.

#### Webhook
 - Create a [webhook](https://www.contentstack.com/docs/guide/webhooks) which will trigger an AWS lambda function with appropriate AWS  API gateway URL  and x-api-key header for access control (if access key is  required)
 - Set conditions to trigger an action when all entries of any content type are created or updated
 - Add a custom header with parameter as target_environments  and value as a comma-separated list of environments where the entry will be published. Eg. stage,pre-prod

## Other Document & Links
 - [Contentstack Guides](https://www.contentstack.com/docs/guide)
 - [Contentstack Docs](https://www.contentstack.com/docs/)
 