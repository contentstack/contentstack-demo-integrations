
# Contentstack | Auto-image Tagging (AWS Rekognition)  
[Contentstack]([https://www.contentstack.com/](https://www.contentstack.com/)) auto image tagging set up assigns a tag to an asset of type image whenever it is created or updated in a [Stack]([https://www.contentstack.com/docs/guide/stack](https://www.contentstack.com/docs/guide/stack)) We'll use AWS Rekognition, Contentstack Webhooks, and AWS lambda (only png and jpg formats are supported by AWS Rekognition).  

## Steps  
1. Create an AWS user  
2. Create a Contentstack [stack management token]([https://www.contentstack.com/docs/guide/tokens#management-tokens](https://www.contentstack.com/docs/guide/tokens#management-tokens))  
3. Set up a lambda function and an API gateway  
4. Set up a Contenstack [webhook]([https://www.contentstack.com/docs/guide/webhooks](https://www.contentstack.com/docs/guide/webhooks))  

## Configuration  

### AWS  

#### ReKognition  

1. Create an AWS User with programmatic access  
2. Add ***AmazonRekognitionReadOnlyAccess*** (**AWS managed policy**)  
permission policy to the user  
3. Create an access key and a secrete key for the user. These credentials we will use to access the AWS rekognition service from the lambda function.  


#### Lambda  
- Create a new lambda function which can be triggered by an API gateway  
- Use the index.zip file present in root folder of the current repo as your AWS lambda code. Then, add the following environment variables  

***Aws Lambda Environment Variables*** 
- ***REKOGNITION_AWS_ID*** = access id of aws user | ****required****  
- ***REKOGNITION_AWS_REGION***= aws region | ****required****  
- ***REKOGNITION_AWS_SECRET***=access key of aws user | ****required****  
- ***MIN_CONFIDENCE***= minimum confidence of tag | ****default 70****  
- ***MAX_TAGS***= maximum tags per image | ****default 10****  
- ***CONTENTSTACK_STACK_MANAGEMENT_TOKEN***= contentstack stack management token  
- ***CONTENTSTACK_STACK_API_KEY***= contentstack stack api key  

### Contentstack  

#### Stack Management Token  

- Create a [stack management token]([https://www.contentstack.com/docs/guide/tokens#management-tokens](https://www.contentstack.com/docs/guide/tokens#management-tokens)) with read and write permissions.  


#### Webhook  
- Create a [webhook]([https://www.contentstack.com/docs/guide/webhooks](https://www.contentstack.com/docs/guide/webhooks)) which will trigger an AWS lambda function with appropriate AWS API gateway URL and x-api-key header for access control (if access key is required)  
- Webhook will be triggerred when an asset is created or updated  
![enter image description here](https://www.contentstack.com/docs/assets/blt370b8d7aae8c3a99/image1.png)
  


## Other Document & Links  

- [Auto image tagging detailed guide]([https://www.contentstack.com/docs/knowledgebase/auto-image-tagging-with-contentstack-webhooks-aws-lambda-and-aws-rekognition](https://www.contentstack.com/docs/knowledgebase/auto-image-tagging-with-contentstack-webhooks-aws-lambda-and-aws-rekognition))  
- [Contentstack Guides]([https://www.contentstack.com/docs/guide](https://www.contentstack.com/docs/guide))  
- [Contenstack Docs]([https://www.contentstack.com/docs/](https://www.contentstack.com/docs/))