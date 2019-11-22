const request = require('request-promise')
const { CONTENTSTACK_STACK_MANAGEMENT_TOKEN, CONTENTSTACK_STACK_API_KEY } = process.env
const commonHeaders = {
  'content-Type': 'application/json',
  authorization: CONTENTSTACK_STACK_MANAGEMENT_TOKEN,
  api_key: CONTENTSTACK_STACK_API_KEY
}

function publishEntry (event, { content_type: contentType, entry }, environments) {
  const options = {
    method: 'POST',
    uri: `https://api.contentstack.io/v3/content_types/${contentType.uid}/entries/${entry.uid}/publish`,
    body: {
      entry: {
        environments,
        locales: [entry.locale]
      },
      locale: entry.locale
    },
    json: true,
    headers: commonHeaders
  }
  return request(options)
}

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const { target_environments: targetEnvironments } = event.headers
    const { event: webhookEvent, data } = body
    await publishEntry(webhookEvent, data, targetEnvironments.split(','))
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Entry sent for publishing.',
        awsRequestId: context.awsRequestId,
        functionName: context.functionName,
        functionVersion: context.functionVersion
      })
    }
  } catch (e) {
    console.error(e)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.message,
        awsRequestId: context.awsRequestId,
        functionName: context.functionName,
        functionVersion: context.functionVersion
      })
    }
  }
}
