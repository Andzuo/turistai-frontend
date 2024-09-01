import type React from "react";
import { useEffect, useState } from "react";
import {
	fetchRoadMapImage,
	isVisited,
	type RoadMapData,
} from "../../services/RoadMapService";
import s from "./RoadMapComponent.module.css";
import ImagePlaceholderIcon from "@mui/icons-material/Image";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

interface RoadMapComponentProps {
	roadMap: RoadMapData;
	onRemove: (id: number) => void;
}

export const RoadMapComponent: React.FC<RoadMapComponentProps> = ({
	roadMap,
	onRemove,
}) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isVisitedChecked, setIsVisitedChecked] = useState<boolean>(
		roadMap.visited || false,
	);

	useEffect(() => {
		let imageObjectURL: string | null = null;

		const loadImage = async () => {
			if (roadMap.image) {
				try {
					const imageBlob = await fetchRoadMapImage(roadMap.image);
					imageObjectURL = URL.createObjectURL(imageBlob);
					setImageUrl(imageObjectURL);
				} catch (error) {
					console.error("Erro ao buscar a imagem:", error);
				}
			}
		};

		loadImage();

		return () => {
			if (imageObjectURL) {
				URL.revokeObjectURL(imageObjectURL);
			}
		};
	}, [roadMap.image]);

	const handleVisited = async () => {
		setIsVisitedChecked((prev) => !prev);

		try {
			const response = await isVisited(roadMap.id?.toString() || "");
			if (response) {
				toast.success("Marcado como visitado");
			} else {
				toast.error("Erro ao marcar como visitado");
			}
		} catch (error) {
			toast.error("Erro ao marcar como visitado");
			setIsVisitedChecked((prev) => !prev);
		}
	};
	useEffect(() => {
		setIsVisitedChecked(roadMap.visited || false);
	}, [roadMap.visited]);

	return (
		<div className={s.roadMap}>
			<div className={s.roadMap__container}>
				<button
					type="submit"
					className={s.modal__content_removeTravel}
					onClick={() => roadMap.id !== undefined && onRemove(roadMap.id)}
				>
					<DeleteIcon />
				</button>
				{imageUrl ? (
					<img className={s.roadMap_image} src={imageUrl} alt={roadMap.title} />
				) : (
					<div className={s.roadMap_image}>
						<ImagePlaceholderIcon sx={{ width: "6rem", height: "auto" }} />
					</div>
				)}
				<div className={s.roadMap__container__content}>
					<h3 className={s.roadMap__container__title}>{roadMap.title}</h3>
					<p className={s.roadMap__container__address}>
						{`Endereço: ${roadMap.addres}`}
					</p>
					<div className={s.roadMap__container__checkbox}>
						<label
							className={s.roadMap__container__checkbox__visited}
							htmlFor="visited"
						>
							Visitou?
						</label>
						<input
							className={s.roadMap__container__checkbox__visited__input}
							id="visited"
							type="checkbox"
							checked={isVisitedChecked}
							onChange={handleVisited}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
