export const getLocationName = async (latitude: number, longitude: number) => {
	try {
		const response = await fetch(
			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
		);
		const data = await response.json();
		return data.locality || "Localização desconhecida";
	} catch (error) {
		console.error("Error fetching location name:", error);
		return "Localização desconhecida";
	}
};
