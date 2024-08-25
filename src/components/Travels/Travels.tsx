import FmdGoodIcon from "@mui/icons-material/FmdGood";
import s from "./Travels.module.css";
import { useState, useEffect } from "react";
import type { TravelData } from "../../interface/Travelprops";
import TravelComponent from "../TravelComponent/TravelComponent";
import { getAllTravels } from "../../services/TravelsService";
import TravelModal from "../TravelModal/TravelModal";

const defaultTravel: TravelData = {
	title: "",
	description: "",
	date: "",
	image: "",
	id: 0,
	userId: 0,
};

export const Travels = () => {
	const [open, setOpen] = useState(true);
	const [data, setData] = useState<TravelData>({
		...defaultTravel,
	});
	const [travels, setTravels] = useState<TravelData[]>([]);

	useEffect(() => {
		const fetchTravels = async () => {
			try {
				const fetchedTravels = await getAllTravels();
				setTravels(fetchedTravels);
			} catch (error) {
				console.error("Error fetching travels:", error);
			}
		};

		fetchTravels();
	}, []);

	const handleClickOpen = () => {
		console.log("Opening modal");
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={s.travels}>
			<div className={s.travels__container}>
				<div className={s.travels__header}>
					<div className={s.travels__findMe}>
						<span id="findMe" className={s.travels__findMe__span}>
							<FmdGoodIcon className={s.travels__findMe__icon} />
							Você está em Recife
						</span>
						<h1 className={s.travels__title}>Minhas viagens</h1>
					</div>
					<div className={s.travels__create}>
						<button onClick={handleClickOpen} type="button">
							Criar Viagem
						</button>
					</div>
				</div>
				<div className={s.travels__list}>
					{travels.map((travel) => (
						<TravelComponent key={travel.id} travel={travel} />
					))}
				</div>
			</div>
			<TravelModal open={open} onClose={() => setOpen(false)} />
		</div>
	);
};
