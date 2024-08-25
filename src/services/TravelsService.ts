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

export const createTravel = async (data: TravelData) => {
	try {
		const tokenObj = localStorage.getItem("acessToken");
		if (!tokenObj) {
			throw new Error("No access token found");
		}

		const token = JSON.parse(tokenObj).token;

		const response = await api.post("/criar", data, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data;
	} catch (error) {
		throw error as string;
	}
};
