import axios from "axios";

export interface RoadMapData {
	id?: number;
	travelId: number;
	title: string;
	addres: string;
	image?: string;
	comments?: string[];
	visited?: boolean;
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

	const response = await axios.post(`${API_URL}/${travelid}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data",
		},
	});

	return response.data;
};

export const getAllRoadMaps = async (
	travelId: number,
): Promise<RoadMapData[]> => {
	if (!travelId) {
		throw new Error("Travel ID is required");
	}

	console.log("Fetching roadmaps for travelId:", travelId);

	const tokenObj = localStorage.getItem("acessToken");
	if (!tokenObj) {
		throw new Error("No access token found");
	}

	const token = JSON.parse(tokenObj).token;

	console.log("Using token:", token);

	try {
		const response = await axios.get(`${API_URL}/${travelId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.log("API response:", response.data);

		return response.data;
	} catch (error) {
		console.error("Error fetching roadmaps:", error);
		throw error;
	}
};

export const addComment = async (roadMapId: string, comment: string) => {
	if (!roadMapId) {
		throw new Error("RoadMap ID is required");
	}

	const tokenObj = localStorage.getItem("acessToken");
	if (!tokenObj) {
		throw new Error("No access token found");
	}

	const token = JSON.parse(tokenObj).token;

	const response = await axios.post(
		`${API_URL}/${roadMapId}/comment`,
		{ comment },
		{
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		},
	);

	return response.data;
};

export const isVisited = async (roadMapId: string) => {
	if (!roadMapId) {
		throw new Error("RoadMap ID is required");
	}

	const tokenObj = localStorage.getItem("acessToken");
	if (!tokenObj) {
		throw new Error("No access token found");
	}

	const token = JSON.parse(tokenObj).token;

	const response = await axios.post(
		`${API_URL}/${roadMapId}/visited`,
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	);

	return response.data;
};
