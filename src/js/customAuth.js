import axios from 'axios';
let token = localStorage.getItem('user-token');
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
    key: "value"
};

export default axios.post(
    'http://localhost:8081/api/auth/checkLogin',
    bodyParameters,
    config
).then(function(response) {
    return response.data.isAuthenticated;
}).catch(function() {
    return false;
});