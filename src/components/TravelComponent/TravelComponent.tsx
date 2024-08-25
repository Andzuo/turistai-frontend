import type { TravelData } from "../../interface/Travelprops";

import s from "./TravelComponent.module.css";

interface TravelComponentProps {
	travel: TravelData; // Define o tipo da propriedade
}

const TravelComponent: React.FC<TravelComponentProps> = ({ travel }) => {
	return (
		<div className={s.travel}>
			{travel.image && (
				<img className={s.travel_image} src={travel.image} alt={travel.title} />
			)}
			<h1 className={s.travel__title}>{travel.title}</h1>
			<p className={s.travel__description}>{travel.description}</p>
			<p className={s.travel__date}>
				{new Date(travel.date).toLocaleDateString()}
			</p>
		</div>
	);
};

export default TravelComponent;
