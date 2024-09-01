import { RoadMapList } from "../RoadMapList/RoadMapList";

import s from "./RoadMapNextTravel.module.css";

interface RoadMapNextTravelProps {
	travelId: number;
}

export const RoadMapNextTravel: React.FC<RoadMapNextTravelProps> = ({
	travelId,
}) => {
	return (
		<div className={s.roadMapNextTravel}>
			<RoadMapList travelId={travelId} className={s.roadMapList} />
		</div>
	);
};
