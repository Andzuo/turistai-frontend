import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8080",
});

// Função para criar usuário
export const createUser = async (username: string, password: string) => {
	try {
		const response = await api.post("/users", { username, password });
		console.log("Resposta da criação de usuário:", response.data);
	} catch (error) {
		throw error as string;
	}
};
