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

export const createTravel = async (data: Omit<TravelData, "id" | "userId">) => {
	try {
		const tokenObj = localStorage.getItem("acessToken");
		if (!tokenObj) {
			throw new Error("No access token found");
		}

		const token = JSON.parse(tokenObj).token;
		const userId = JSON.parse(atob(token.split(".")[1])).userId; // Extrai o userId do payload do JWT

		const response = await api.post(
			"/criar",
			{ ...data, userId }, // Inclui o userId na requisição
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		throw error as string;
	}
};
