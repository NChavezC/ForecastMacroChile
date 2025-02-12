import axios from "axios";

const base_url = "https://forecastmacrochileapi.onrender.com/";

const api = axios.create({ baseURL: base_url });

export default api;
