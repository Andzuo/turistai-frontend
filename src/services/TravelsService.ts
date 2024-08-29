import axios from "axios";
import type { TravelData } from "../interface/Travelprops";

const api = axios.create({
	baseURL: "http://localhost:8080/api/travels",
});

export const getAllTravels = async (): Promise<TravelData[]> => {
	try {
		const tokenObj = localStorage.getItem("acessToken");
		if (!tokenObj) {
			throw new Error("No access token found");
		}

		const token = JSON.parse(tokenObj).token;

		const response = await api.get("/listar", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw error as string;
	}
};

export const createTravel = async (
	data: Omit<TravelData, "id" | "userId"> & { file?: File }, // Inclui o campo file opcionalmente
) => {
	try {
		const tokenObj = localStorage.getItem("acessToken");
		if (!tokenObj) {
			throw new Error("No access token found");
		}

		const token = JSON.parse(tokenObj).token;

		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		formData.append("date", data.date);
		formData.append("location", data.location);
		formData.append("state", data.state);

		if (data.file) {
			formData.append("file", data.file);
		}

		const response = await api.post("/criar", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw error as string;
	}
};
export const fetchImage = async (imageName: string): Promise<Blob> => {
	try {
		const tokenObj = localStorage.getItem("acessToken");
		if (!tokenObj) {
			throw new Error("No access token found");
		}
		const token = JSON.parse(tokenObj).token;

		const response = await api.get(`/imagem/${imageName}`, {
			responseType: "blob",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw new Error(`Erro ao buscar imagem: ${error}`);
	}
};

export const removeTravel = async (id: number) => {
	try {
		const tokenObj = localStorage.getItem("acessToken");
		if (!tokenObj) {
			throw new Error("No access token found");
		}

		const token = JSON.parse(tokenObj).token;

		const response = await api.delete(`/delete/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw error as string;
	}
};
