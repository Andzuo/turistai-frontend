import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080",
});

export const createUser = async (
	username: string,
	email: string,
	password: string,
) => {
	try {
		await api.post("/users", { username, email, password });
	} catch (error) {
		throw error as string;
	}
};
