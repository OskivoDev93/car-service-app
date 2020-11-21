/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios');

(async () => {
  const { data } = await axios.post('http://localhost:3000/auth/login', {
    username: 'babyDriver',
    password: 'notSlow',
    driver: true,
  });

  console.log(data);

  const { token } = data;
  const { data: res2 } = await axios.get('http://localhost:3000/auth', {
    headers: { authorization: `Bearer ${token}` },
  });

  console.log(res2);
})();
