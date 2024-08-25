import axios from "axios";
import type { TravelData } from "../interface/Travelprops";

const API_URL = "http://localhost:8080/api/travel"; // Altere conforme a URL da sua API

export const getAllTravels = async (userId: number): Promise<TravelData[]> => {
	try {
		const response = await axios.get(`${API_URL}?userId=${userId}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching travels:", error);
		throw error;
	}
};

export const createTravel = async (travel: TravelData): Promise<void> => {
	try {
		await axios.post(`${API_URL}`, "/criar");
	} catch (error) {
		console.error("Error creating travel:", error);
		throw error;
	}
};

export const deleteTravel = async (travelId: number): Promise<void> => {
	try {
		await axios.delete(`${API_URL}/${travelId}`);
	} catch (error) {
		console.error("Error deleting travel:", error);
		throw error;
	}
};
