import PlaceIcon from "@mui/icons-material/Place";

import s from "./Travels.module.css";

export const Travels = () => {
	return (
		<div className={s.travels}>
			<div className={s.travels__container}>
				<div className={s.travels_findMe}>
					<PlaceIcon className={s.travels__findMe__icon} />
					<span id="findMe" className={s.travels__findMe__span}>
						Você está em Recife
					</span>
				</div>
				<h1 className={s.travels__title}>Minhas viagens</h1>
				<div className={s.travels__list}>lista aq</div>
			</div>
		</div>
	);
};
