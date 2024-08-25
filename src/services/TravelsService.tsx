import axios from "axios";
import type { TravelData } from "../interface/Travelprops";

// Defina a URL base da sua API
const API_URL = "http://localhost:8080/api/travel"; // Altere conforme a URL da sua API

// Função para buscar todas as viagens do usuário
export const getAllTravels = async (userId: number): Promise<TravelData[]> => {
	try {
		const response = await axios.get(`${API_URL}?userId=${userId}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching travels:", error);
		throw error;
	}
};

// Função para criar uma nova viagem
export const createTravel = async (travel: TravelData): Promise<void> => {
	try {
		await axios.post(API_URL, travel);
	} catch (error) {
		console.error("Error creating travel:", error);
		throw error;
	}
};

// Função para excluir uma viagem
export const deleteTravel = async (travelId: number): Promise<void> => {
	try {
		await axios.delete(`${API_URL}/${travelId}`);
	} catch (error) {
		console.error("Error deleting travel:", error);
		throw error;
	}
};
