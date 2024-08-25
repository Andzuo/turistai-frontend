import FmdGoodIcon from "@mui/icons-material/FmdGood";

import s from "./Travels.module.css";
import { useState } from "react";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from "@mui/material";
import type { TravelData } from "../../interface/Travelprops";
import TravelComponent from "../TravelComponent/TravelComponent";

export const Travels = () => {
	const exampleTravels: TravelData[] = [
		{
			id: 1,
			userId: 123,
			title: "Viagem para Paris",
			description:
				"Uma viagem maravilhosa para Paris com visita à Torre Eiffel.",
			date: "2024-08-15",
			image: "",
		},
		{
			id: 2,
			userId: 123,
			title: "Viagem para Paris 2",
			description:
				"Uma viagem maravilhosa para Paris com visita à Torre Eiffel.",
			date: "2024-08-15",
			image: "",
		},
		{
			id: 3,
			userId: 123,
			title: "Viagem para Paris 3",
			description: "Uma terceira viagem maravilhosa para Paris.",
			date: "2024-08-16",
			image: "",
		},
	];
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
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
					{exampleTravels.map((travel) => (
						<TravelComponent key={travel.id} travel={travel} />
					))}
				</div>
			</div>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Criar Viagem</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="title"
						label="Título"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextField
						margin="dense"
						id="description"
						label="Descrição"
						type="text"
						fullWidth
						variant="outlined"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancelar
					</Button>
					<Button onClick={handleClose} color="primary">
						Salvar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
