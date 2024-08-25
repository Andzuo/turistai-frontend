// services/api.js
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080",
});

api.interceptors.request.use((config) => {
	const auth = JSON.parse(localStorage.getItem("acessToken") as string);
	if (auth?.token) {
		config.headers.Authorization = `Bearer ${auth.token}`;
	}
	return config;
});

export default api;
