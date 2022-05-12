import axios from "axios";

const api = axios.create({
    baseUrl: "https://anstion.herokuapp.com/"
})
export default api