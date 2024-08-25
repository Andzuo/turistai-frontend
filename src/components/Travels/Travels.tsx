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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

import { createTravel } from "../../services/TravelsService";

const defaultTravel: TravelData = {
	title: "",
	description: "",
	date: "",
	image: "",
	id: 0,
	userId: 0,
};

export const Travels = () => {
	const exampleTravels: TravelData[] = [
		{
			id: 1,
			userId: 123,
			title: "Viagem para Paris",
			description:
				"Uma viagem maravilhosa para Paris com visita à Torre Eiffel.",
			date: "2024-08-15",
			image:
				"https://viagemeturismo.abril.com.br/wp-content/uploads/2016/11/thinkstockphotos-4549879531.jpeg",
		},
		{
			id: 2,
			userId: 123,
			title: "Viagem para Paris 2",
			description:
				"Uma viagem maravilhosa para Paris com visita à Torre Eiffel.",
			date: "2024-08-15",
			image:
				"https://viagemeturismo.abril.com.br/wp-content/uploads/2016/11/thinkstockphotos-4549879531.jpeg",
		},
		{
			id: 3,
			userId: 123,
			title: "Viagem para Paris 3",
			description: "Uma terceira viagem maravilhosa para Paris.",
			date: "2024-08-16",
			image:
				"https://viagemeturismo.abril.com.br/wp-content/uploads/2016/11/thinkstockphotos-4549879531.jpeg",
		},
	];
	const [open, setOpen] = useState(false);
	const [data, setData] = useState<TravelData>({
		...defaultTravel,
	});

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
						helperText="Por favor, insira o título da viagem."
						margin="dense"
						id="title"
						label="Título"
						type="text"
						fullWidth
						variant="outlined"
						value={data.title}
					/>
					<TextField
						margin="dense"
						id="description"
						label="Descrição"
						type="text"
						fullWidth
						variant="outlined"
						value={data.description}
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DateField"]}>
							<DateField value={dayjs(data.date)} label="Data da viagem" />
						</DemoContainer>
					</LocalizationProvider>
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
