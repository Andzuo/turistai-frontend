import FmdGoodIcon from "@mui/icons-material/FmdGood";
import s from "./Travels.module.css";
import { useState, useEffect } from "react";
import type { TravelData } from "../../interface/Travelprops";
import TravelComponent from "../TravelComponent/TravelComponent";
import { getAllTravels } from "../../services/TravelsService";
import { TravelModal } from "../TravelModal/TravelModal";
import { useNavigate } from "react-router-dom";

export const Travels = () => {
	const [open, setOpen] = useState(false);
	const [travels, setTravels] = useState<TravelData[]>([]);
	const navigate = useNavigate();

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
		const token = localStorage.getItem("acessToken");
		console.log(token);
		if (token === null) {
			navigate("/login");
		} else {
			setOpen(true);
		}
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
							Você está em <strong>Recife</strong>
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
			<TravelModal open={open} onClose={handleClose} />
		</div>
	);
};
