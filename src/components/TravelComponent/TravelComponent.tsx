import { useEffect, useState } from "react";
import type { TravelData } from "../../interface/Travelprops";
import s from "./TravelComponent.module.css";
import { fetchImage } from "../../services/TravelsService";
import PlaceIcon from "@mui/icons-material/Place";

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
			if (travel.image === null) {
			}
		};
	}, [travel.image, imageUrl]);

	return (
		<div className={s.travel}>
			<div className={s.travel__container}>
				{imageUrl && (
					<img className={s.travel_image} src={imageUrl} alt={travel.title} />
				)}
				<div className={s.travel__container__content}>
					<div className={s.travel__container__title}>
						<h1 className={s.travel__title}>{travel.title}</h1>
						<p className={s.travel__date}>
							{new Date(travel.date).toLocaleDateString()}
						</p>
					</div>
					<p>
						<PlaceIcon className={s.travel__icon} />
						São Paulo - SP
						{/* {travel.location} - <span>{travel.state}</span> */}
					</p>
				</div>
				{/* <div className={s.travel__container__span}></div> */}
			</div>
		</div>
	);
};

export default TravelComponent;
