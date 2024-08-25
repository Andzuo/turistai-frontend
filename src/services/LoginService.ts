import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080",
});

export const login = async (username: string, password: string) => {
	try {
		const response = await api.post("/login", { username, password });
		api.interceptors.request.use((config) => {
			const auth = JSON.parse(localStorage.getItem("acessToken") as string);
			if (auth?.token) {
				config.headers.Authorization = `Bearer ${auth.token}`;
			}
			return config;
		});
		return response.data;
	} catch (error) {
		throw error as string;
	}
};
