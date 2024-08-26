export interface TravelData {
	id?: number;
	userId?: number;
	title: string;
	description: string;
	date: string;
	image?: string;
}

export interface TravelProps {
	travel: TravelData;
}
