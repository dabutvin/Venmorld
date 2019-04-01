var express = require('express')
var request = require('request')
var router = express.Router()
var data = []

fetchData()
setInterval(fetchData, 1000 * 60 * 10)

router.get('/', function(req, res, next) {
  if (data.length) return res.send(data.pop())
  fetchData(() => {
    res.send(data.pop())
  })
})

function fetchData(cb) {
  request({ url: 'https://venmo.com/api/v5/public' }, function(
    error,
    response,
    body
  ) {
    if (error) {
      console.log('Error: ' + error)
    } else {
      try {
        let result = JSON.parse(body)
        for (let i = 0; i < result.data.length; i++) {
          let payment = result.data[i]
          data.push({
            id: payment.payment_id,
            message: payment.message,
            picture: payment.actor.picture,
            handle: payment.actor.username
          })
        }
        if (cb) cb()
      } catch (ex) {
        console.log('Error: ' + ex)
      }
    }
  })
}

module.exports = router
