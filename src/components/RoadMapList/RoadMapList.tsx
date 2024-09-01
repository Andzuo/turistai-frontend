import { useEffect, useState } from "react";
import {
	getAllRoadMaps,
	removeRoad,
	type RoadMapData,
} from "../../services/RoadMapService";
import { Skeleton } from "@mui/material";
import { RoadMapComponent } from "../RoadMapComponent/RoadMapComponent";
import s from "./RoadMapList.module.css";
import { toast } from "react-toastify";

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

	const handleRemoveRoadMap = async (id: number) => {
		try {
			await removeRoad(id);
			setRoadMaps((prevRoadMaps) =>
				prevRoadMaps.filter((roadMap) => roadMap.id !== id),
			);
			toast.success("Roteiro removido com sucesso!");
		} catch (error) {
			toast.error("Erro ao remover o roteiro!");
		}
	};

	return (
		<div>
			{loading ? (
				<div className={s.roadmaps__skeleton}>
					<Skeleton variant="rounded" width={350} height={100} />
				</div>
			) : (
				roadMaps.map((roadMap) => (
					<RoadMapComponent
						key={roadMap.id}
						roadMap={roadMap}
						onRemove={handleRemoveRoadMap}
					/>
				))
			)}
		</div>
	);
};
