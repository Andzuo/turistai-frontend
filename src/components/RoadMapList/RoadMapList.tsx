import { useEffect, useState } from "react";
import {
	getAllRoadMaps,
	type RoadMapData,
} from "../../services/RoadMapService";
import { Skeleton } from "@mui/material";
import RoadMapComponent from "../RoadMapComponent/RoadMapComponent";
import s from "./RoadMapList.module.css";

interface RoadMapListProps {
	travelId: number;
}

export const RoadMapList: React.FC<RoadMapListProps> = ({ travelId }) => {
	const [loading, setLoading] = useState(true);
	const [roadMaps, setRoadMaps] = useState<RoadMapData[]>([]);

	useEffect(() => {
		const fetchRoadMaps = async () => {
			try {
				const fetchedRoadMaps: RoadMapData[] = await getAllRoadMaps(travelId);
				setRoadMaps(fetchedRoadMaps);
			} catch (error) {
				console.error("Error fetching roadmaps:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchRoadMaps();
	}, [travelId]);

	return (
		<div>
			{loading ? (
				<div className={s.roadmaps__skeleton}>
					<Skeleton variant="rounded" width={310} height={210} />
				</div>
			) : (
				roadMaps.map((roadMap) => (
					<RoadMapComponent key={roadMap.id} roadMap={roadMap} />
				))
			)}
		</div>
	);
};
