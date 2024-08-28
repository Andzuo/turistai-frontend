export interface TravelData {
	id?: number;
	userId?: number;
	title: string;
	description: string;
	date: string;
	location: string;
	state: string;
	image?: string;
}

export interface TravelProps {
	travel: TravelData;
}
