import axios from 'axios';
import configs from "../../config";
let token = localStorage.getItem('user-token');
const config = {
    headers: { Authorization: `Bearer ${token}` }
};

const bodyParameters = {
    key: "value"
};
let host = configs.host || "Http://localhost:8081";
host = `${host}/api/auth/checkLogin`;
export default axios.post(
    host,
    bodyParameters,
    config
).then(function(response) {
    return response.data.isAuthenticated;
}).catch(function() {
    return false;
});