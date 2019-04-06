var express = require('express')
var request = require('request')
var router = express.Router()
var data = new Set()

fetchData()
setInterval(fetchData, 1000 * 60 * 30)

router.get('/', function(req, res, next) {
  if (data.size) return res.send(pop())
  fetchData(() => {
    res.send(pop())
  })
})

function pop() {
  for (let item of data.values()) {
    data.delete(item)
    return item
  }
}

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
          data.add({
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
