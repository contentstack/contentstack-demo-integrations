const taggingService = require('./service.js')
const request = require('request-promise')

const tagImage = (url) => {
  return new Promise((resolve, reject) => {
    request.get({ url, resolveWithFullResponse: true, encoding: null }).then((response) => {
      const imageData = Buffer.from(response.body, 'base64')

      const params = {
        Image: {
          Bytes: imageData
        },
        MaxLabels: process.env.MAX_TAGS || 10,
        MinConfidence: process.env.MIN_CONFIDENCE || 70
      }

      taggingService.detectLabels(params, (err, { Labels }) => {
        if (err) {
          return reject(err)
        }
        resolve(Labels.map(label => label.Name))
      })
    }).catch((e) => {
      reject(e)
    })
  })
}

module.exports = tagImage
