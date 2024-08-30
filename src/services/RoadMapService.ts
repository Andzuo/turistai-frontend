import axios from "axios";
import type { RoadMapData } from "../interface/Travelprops";

const API_URL = "http://localhost:8080/api/roadmaps";

export const createRoadMap = async (
	travelid: string,
	data: Omit<RoadMapData, "id | travelId">,
	file?: File,
) => {
	const tokenObj = localStorage.getItem("acessToken");
	if (!tokenObj) {
		throw new Error("No access token found");
	}

	const token = JSON.parse(tokenObj).token;

	const formData = new FormData();
	formData.append("title", data.title);
	formData.append("comment", data.comment);
	formData.append("addres", data.addres);
	formData.append("visited", data.visited.toString());
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
