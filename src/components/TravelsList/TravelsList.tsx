import { useEffect, useState } from "react";
import { getAllTravels } from "../../services/TravelsService";
import type { TravelData } from "../../interface/Travelprops";
import { Skeleton } from "@mui/material";
import TravelComponent from "../TravelComponent/TravelComponent";

import s from "./TravelsList.module.css";

export const TravelsList = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [travels, setTravels] = useState<TravelData[]>([]);

	useEffect(() => {
		const fetchTravels = async () => {
			try {
				const fetchedTravels = await getAllTravels();
				setTravels(fetchedTravels);
			} catch (error) {
				console.error("Error fetching travels:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTravels();
	}, []);

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
						<div key={travel.id}>
							<TravelComponent travel={travel} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};
