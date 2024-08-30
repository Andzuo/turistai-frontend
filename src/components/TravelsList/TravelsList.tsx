import { useEffect, useState } from "react";
import { getAllTravels, removeTravel } from "../../services/TravelsService";
import type { TravelData } from "../../interface/Travelprops";
import { Skeleton } from "@mui/material";
import TravelComponent from "../TravelComponent/TravelComponent";

import s from "./TravelsList.module.css";
import SelectTravelModal from "../SelectTravelModal/SelectTravelModal";
import { toast } from "react-toastify";

export const TravelsList = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [travels, setTravels] = useState<TravelData[]>([]);
	const [selectedTravel, setSelectedTravel] = useState<TravelData | null>(null);

	useEffect(() => {
		const fetchTravels = async () => {
			try {
				const fetchedTravels: TravelData[] = await getAllTravels();
				const nextTravel = fetchedTravels.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
				);
				setTravels(nextTravel);
			} catch (error) {
				console.error("Error fetching travels:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTravels();
	}, []);

	const handleTravelClick = (travel: TravelData) => {
		setSelectedTravel(travel);
	};

	const handleCloseModal = () => {
		setSelectedTravel(null);
	};

	const handleRemoveTravel = async (id: number) => {
		try {
			await removeTravel(id);
			setTravels((prevTravels) => prevTravels.filter((travel) => travel.id));
			toast.success("Viagem removida com sucesso!");
			handleCloseModal();
		} catch (error) {
			toast.error("Erro ao remover a viagem!");
		}
	};

	return (
		<div>
			{loading ? (
				<div className={s.travels__skeleton}>
					<Skeleton variant="rounded" width={310} height={210} />
					<Skeleton variant="rounded" width={310} height={210} />
					<Skeleton variant="rounded" width={310} height={210} />
				</div>
			) : (
				<div className={s.travels__list}>
					{travels.map((travel) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div key={travel.id} onClick={() => handleTravelClick(travel)}>
							<TravelComponent travel={travel} />
						</div>
					))}
					{selectedTravel && (
						<SelectTravelModal
							travel={selectedTravel}
							onClose={handleCloseModal}
							onRemove={handleRemoveTravel}
						/>
					)}
				</div>
			)}
		</div>
	);
};
