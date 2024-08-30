import axios from "axios";

interface RoadMapData {
	id?: number;
	travelId: number;
	title: string;
	addres: string;
	image?: string;
}

const API_URL = "http://localhost:8080/api/roadmap";

export const createRoadMap = async (
	travelid: string,
	data: Omit<RoadMapData, "id" | "travelId">,
	file?: File,
) => {
	if (!travelid) {
		throw new Error("Travel ID is required");
	}

	const tokenObj = localStorage.getItem("acessToken");
	if (!tokenObj) {
		throw new Error("No access token found");
	}

	const token = JSON.parse(tokenObj).token;

	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("addres", data.addres);
	if (file) {
		formData.append("file", file);
	}

	// Log FormData content
	for (const pair of formData.entries()) {
		console.log(`${pair[0]}: ${pair[1]}`);
	}

	console.log("API URL:", `${API_URL}/${travelid}`);

	const response = await axios.post(`${API_URL}/${travelid}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
};
