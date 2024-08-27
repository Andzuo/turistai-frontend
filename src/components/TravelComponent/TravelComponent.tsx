import { useEffect, useState } from "react";
import type { TravelData } from "../../interface/Travelprops";
import s from "./TravelComponent.module.css";
import { fetchImage } from "../../services/TravelsService";

interface TravelComponentProps {
	travel: TravelData;
}

const TravelComponent: React.FC<TravelComponentProps> = ({ travel }) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		const loadImage = async () => {
			if (travel.image) {
				try {
					const imageBlob = await fetchImage(travel.image);
					const imageObjectURL = URL.createObjectURL(imageBlob);
					setImageUrl(imageObjectURL);
				} catch (error) {
					console.error("Erro ao carregar imagem:", error);
				}
			}
		};

		loadImage();

		return () => {
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl);
			}
		};
	}, [travel.image, imageUrl]);

	return (
		<div className={s.travel}>
			{imageUrl && (
				<img className={s.travel_image} src={imageUrl} alt={travel.title} />
			)}
			<h1 className={s.travel__title}>{travel.title}</h1>
			<p className={s.travel__date}>
				{new Date(travel.date).toLocaleDateString()}
			</p>
		</div>
	);
};

export default TravelComponent;
