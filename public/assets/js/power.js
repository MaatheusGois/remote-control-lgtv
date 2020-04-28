/* eslint-disable no-unused-vars */
const start = () => {
  console.log('connet')
  fetch('/connect')
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      console.log(json)
    })
}
