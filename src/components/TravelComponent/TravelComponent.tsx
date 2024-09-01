import { useEffect, useState } from "react";
import type { TravelData } from "../../interface/Travelprops";
import s from "./TravelComponent.module.css";
import { fetchImage } from "../../services/TravelsService";
import PlaceIcon from "@mui/icons-material/Place";
import ImagePlaceholderIcon from "@mui/icons-material/Image";

interface TravelComponentProps {
	travel: TravelData;
}

const TravelComponent: React.FC<TravelComponentProps> = ({ travel }) => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		let imageObjectURL: string | null = null;

		const loadImage = async () => {
			if (travel.image) {
				try {
					const imageBlob = await fetchImage(travel.image);
					imageObjectURL = URL.createObjectURL(imageBlob);
					setImageUrl(imageObjectURL);
				} catch (error) {
					console.error("Erro ao carregar imagem:", error);
				}
			}
		};

		loadImage();

		return () => {
			if (imageObjectURL) {
				URL.revokeObjectURL(imageObjectURL);
			}
		};
	}, [travel.image]);

	return (
		<div className={s.travel}>
			<div className={s.travel__container}>
				{imageUrl ? (
					<img className={s.travel_image} src={imageUrl} alt={travel.title} />
				) : (
					<div className={s.travel_image}>
						<ImagePlaceholderIcon sx={{ width: "100%", height: "100%" }} />
					</div>
				)}
				<div className={s.travel__container__content}>
					<div className={s.travel__container__title}>
						<h1 className={s.travel__title}>{travel.title}</h1>
						<p className={s.travel__date}>
							{new Date(travel.date).toLocaleDateString()}
						</p>
					</div>
					<p className={s.travel__container_location}>
						<PlaceIcon sx={{ color: "#f65261" }} className={s.travel__icon} />
						{travel.location} - {travel.state}
					</p>
				</div>
			</div>
		</div>
	);
};

export default TravelComponent;
