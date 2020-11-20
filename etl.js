const axios = require('axios');

(async ()=> {
    const {data} = await axios.post('http//localhost:3000/nest/auth/login', {
        username: 'username',
        password: 'password',
    })

    console.log(data)
})();