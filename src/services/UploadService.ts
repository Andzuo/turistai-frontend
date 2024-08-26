import axios from "axios";

export const uploadImage = async (formData: FormData) => {
	// Recupera o token do localStorage
	const tokenObj = localStorage.getItem("acessToken");

	// Verifica se o token está presente
	if (!tokenObj) {
		throw new Error("Token de autenticação não encontrado");
	}

	const token = JSON.parse(tokenObj).token;

	try {
		// Faz a solicitação de upload da imagem com o token no cabeçalho
		const response = await axios.post(
			"http://localhost:8080/api/files/uploads",
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("Erro ao fazer upload da imagem:", error);
		throw error;
	}
};
