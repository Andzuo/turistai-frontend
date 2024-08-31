import type React from "react";
import type { RoadMapData } from "../../services/RoadMapService";

import s from "./RoadMapComponent.module.css";

interface RoadMapComponentProps {
	roadMap: RoadMapData;
}

export const RoadMapComponent: React.FC<RoadMapComponentProps> = ({
	roadMap,
}) => {
	return (
		<div className={s.roadMap}>
			<div className={s.roadMap__container}>
				<div className={s.roadMap__content__image}>
					{roadMap.image && (
						<img
							src={roadMap.image}
							alt={roadMap.title}
							className={s.roadMap__content__image__img}
						/>
					)}
					<h3 className={s.roadMap__container__title}>{roadMap.title}</h3>
				</div>
				<p className={s.roadMap_container__addres}>
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
					id="comment"
					type="text"
					placeholder="adicione um comentário ao local"
				/>
			</div>
			<hr style={{ margin: "10px 0", width: "100%" }} />
		</div>
	);
};
