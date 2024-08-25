import axios from "axios";
import type { TravelData } from "../interface/Travelprops";

export const getAllTravels = async (): Promise<TravelData[]> => {
	try {
		const tokenObj = localStorage.getItem("acessToken");
		if (!tokenObj) {
			throw new Error("No access token found");
		}

		const token = JSON.parse(tokenObj).token;

		const response = await axios.get(
			"http://localhost:8080/api/travels/listar",
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
