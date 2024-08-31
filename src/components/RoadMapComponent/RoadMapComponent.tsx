import type React from "react";
import { useEffect, useState } from "react";
import {
	fetchRoadMapImage,
	type RoadMapData,
} from "../../services/RoadMapService";
import s from "./RoadMapComponent.module.css";
import ImagePlaceholderIcon from "@mui/icons-material/Image";

interface RoadMapComponentProps {
	roadMap: RoadMapData;
}

export const RoadMapComponent: React.FC<RoadMapComponentProps> = ({
	roadMap,
}) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		const loadImage = async () => {
			if (roadMap.image) {
				try {
					const imageBlob = await fetchRoadMapImage(roadMap.image);
					const imageObjectURL = URL.createObjectURL(imageBlob);
					setImageUrl(imageObjectURL);
					console.log("Imagem carregada com sucesso", imageObjectURL);
				} catch (error) {
					console.error("Erro ao carregar imagem:", error);
				}
			}
		};

		loadImage();

		return () => {
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl);
				console.log("URL da imagem revogada", imageUrl);
			}
		};
	}, [roadMap.image, imageUrl]);

	return (
		<div className={s.roadMap}>
			<div className={s.roadMap__container}>
				<div className={s.roadMap__content__image}>
					{imageUrl ? (
						<img
							className={s.roadMap_image}
							src={imageUrl}
							alt={roadMap.title}
						/>
					) : (
						<div className={s.roadMap_image}>
							<ImagePlaceholderIcon sx={{ width: "100%", height: "100%" }} />
						</div>
					)}
					<h3 className={s.roadMap__container__title}>{roadMap.title}</h3>
				</div>
				<div className={s.roadMap__actions}>
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
						/>
					</div>
					<input
						className={s.roadMap__comment}
						id="comment"
						type="text"
						placeholder="Adicione um comentário ao local"
					/>
				</div>
			</div>
		</div>
	);
};
