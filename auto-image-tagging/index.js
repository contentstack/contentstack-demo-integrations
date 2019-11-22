const request = require('request-promise')
const tagger = require('./lib/tagger.js')
const { CONTENTSTACK_STACK_MANAGEMENT_TOKEN, CONTENTSTACK_STACK_API_KEY } = process.env
const commonHeaders = {
  'content-Type': 'application/json',
  authorization: CONTENTSTACK_STACK_MANAGEMENT_TOKEN,
  api_key: CONTENTSTACK_STACK_API_KEY
}

function getAsset (uid, version) {
  var options = {
    method: 'GET',
    uri: `https://api.contentstack.io/v3/assets/${uid}?version=${version}`,
    json: true,
    headers: commonHeaders
  }
  return request(options)
}

function updateAsset (uid, asset, version) {
  var options = {
    method: 'PUT',
    uri: `https://api.contentstack.io/v3/assets/${uid}`,
    body: { asset: asset, version },
    json: true,
    headers: commonHeaders
  }
  return request(options)
}

function getTags (url) {
  return new Promise((resolve, reject) => {
    tagger(url)
      .then(function (tags) {
        resolve(tags)
      }).catch(function (err) {
        reject(err)
      })
  })
}

const isAssetTaggable = ({ file_size: fileSize, content_type: contentType }) => (parseInt(fileSize) < 5242881 && /^image\/(png|jpg|jpeg)/i.test(contentType))

async function requiresTagging (asset) {
  const previousVersion = await getAsset(asset.uid, asset._version - 1)
  return previousVersion.asset.url !== asset.url
}

async function tagAsset (event, { asset }) {
  try {
    if (isAssetTaggable(asset)) {
      if (event === 'update') {
        const updateTag = await requiresTagging(asset)
        if (!updateTag) {
          console.log('asset file was not upadated skipping tagging process')
          return Promise.resolve()
        }
      }

      const tags = await getTags(asset.url)
      await updateAsset(asset.uid, { tags }, asset.version)
    } else {
      console.log('asset file is not a valid image type or exceeds fileSize skipping tagging process')
    }
    return Promise.resolve()
  } catch (e) {
    return Promise.reject(e)
  }
}

exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body)
    const { event: webhookEvent, data } = body
    await tagAsset(webhookEvent, data)
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'tagging process done',
        awsRequestId: context.awsRequestId,
        functionName: context.functionName,
        functionVersion: context.functionVersion
      })
    }
  } catch (e) {
    console.log(e)
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
