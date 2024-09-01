import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { useState, useEffect } from "react";
import { CreateTavelModal } from "../CreateTravelModal/CreateTravelModal";
import { useNavigate } from "react-router-dom";
import { getLocationName } from "../../services/GeolocationService";
import { TravelsList } from "../TravelsList/TravelsList";

import s from "./TravelsBoard.module.css";

export const TravelsBoard = () => {
	const [open, setOpen] = useState(false);
	const [userLocation, setUserLocation] = useState<string>(
		"Carregando localização...",
	);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					async (position) => {
						const { latitude, longitude } = position.coords;
						const locationName = await getLocationName(latitude, longitude);
						setUserLocation(locationName);
					},
					(error) => {
						console.error("Error getting location:", error);
						setUserLocation("Localização não disponível");
					},
				);
			} else {
				setUserLocation("Geolocalização não suportada");
			}
		};

		fetchLocation();
	}, []);

	const handleClickOpen = () => {
		const token = localStorage.getItem("acessToken");
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
							Você está em <strong>{userLocation}</strong>
						</span>
						<h1 className={s.travels__title}>Minhas viagens</h1>
					</div>
					<div className={s.travels__create}>
						<button onClick={handleClickOpen} type="button">
							Criar Viagem
						</button>
					</div>
				</div>
				<TravelsList />
			</div>
			<CreateTavelModal open={open} onClose={handleClose} />
		</div>
	);
};
