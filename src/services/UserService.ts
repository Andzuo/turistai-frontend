import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080",
});

export const createUser = async (username: string, password: string) => {
	try {
		await api.post("/users", { username, password });
	} catch (error) {
		throw error as string;
	}
};
