import type React from "react";
import s from "./RoadMapComponent.module.css";
import type { RoadMapData } from "../../services/RoadMapService";

interface RoadMapComponentProps {
	roadMap: RoadMapData;
}

const RoadMapComponent: React.FC<RoadMapComponentProps> = ({ roadMap }) => {
	return (
		<div className={s.roadMap}>
			<h4>{roadMap.title}</h4>
			<p>{roadMap.addres}</p>
			{roadMap.image && (
				<img
					src={`http://localhost:8080/api/roadmap/image/${roadMap.image}`}
					alt={roadMap.title}
					className={s.roadMapImage}
				/>
			)}
			<p>Visitado: {roadMap.visited ? "Sim" : "Não"}</p>
			{roadMap.comments && roadMap.comments.length > 0 && (
				<div>
					<h5>Comentários:</h5>
					<ul>
						{roadMap.comments.map((comment, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<li key={index}>{comment}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default RoadMapComponent;
