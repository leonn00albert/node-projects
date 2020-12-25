const axios = require('axios');

setInterval(()=>{
    axios.get('https://api.chucknorris.io/jokes/random')
    .then(function (response) {
      // handle success
      console.log(response.data.value);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
},10000)
