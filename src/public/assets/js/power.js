/* eslint-disable no-unused-vars */
const start = () => {
  console.log('connet')
  fetch('http://localhost:6767/connect')
    .then(function (response) {
      return response.json()
    })
    .then(function (json) {
      console.log(json)
    })
}
