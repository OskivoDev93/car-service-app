const axios = require('axios');

(async ()=> {
    const {data} = await axios.post('http//localhost/nest/auth/register', {
        username: 'username',
        password: 'password',
    })

    console.log(data)
})();