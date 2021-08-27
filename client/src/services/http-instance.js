import axios from "axios";

export default axios.create({
    baseURL: "http://listmysolution.com:8000",
    headers: {
        "Content-type": "application/json"
    }
});
