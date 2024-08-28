import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { createTravel } from "../../services/TravelsService";
import s from "./TravelModal.module.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

interface TravelModalProps {
	open: boolean;
	onClose: () => void;
}

export const TravelModal: React.FC<TravelModalProps> = ({ open, onClose }) => {
	const [data, setData] = useState({
		title: "",
		description: "",
		date: dayjs().format("dd/mm/yyyy"),
		file: null as File | null,
	});
	const [errors, setErrors] = useState({
		title: "",
		description: "",
		date: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value, files } = event.target;

		if (id === "file" && files) {
			setData((prev) => ({ ...prev, file: files[0] }));
		} else {
			setData((prev) => ({ ...prev, [id]: value }));
		}
	};

	const validateFields = () => {
		let isValid = true;
		const newErrors = {
			title: "",
			description: "",
			date: "",
		};

		if (!data.title) {
			newErrors.title = "Título é obrigatório";
			isValid = false;
		}

		if (!data.description) {
			newErrors.description = "Descrição é obrigatória";
			isValid = false;
		}

		if (!data.date || dayjs(data.date, "YYYY-MM-DD").isValid() === false) {
			newErrors.date = "Data inválida";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSave = async () => {
		if (!validateFields()) {
			return;
		}

		//funciona assim
		const formattedDate = dayjs(data.date).format("DD/MM/YYYY");

		const travelData = {
			title: data.title,
			description: data.description,
			date: formattedDate,
			file: data.file || null || undefined,
		};

		try {
			await createTravel(travelData);
			onClose();
			window.location.reload();
		} catch (error) {
			alert("Erro ao criar viagem");
			console.log("travel data", formattedDate);
		}
	};

	return (
		<Dialog className={s.modal} open={open} onClose={onClose}>
			<DialogTitle className={s.modal__title}>Criar Viagem</DialogTitle>
			<DialogContent className={s.modal__inputs}>
				<input
					id="title"
					placeholder="Título"
					type="text"
					value={data.title}
					onChange={handleChange}
					required
				/>
				<input
					id="description"
					placeholder="Descrição"
					type="text"
					value={data.description}
					onChange={handleChange}
				/>
				<input
					id="date"
					type="date"
					value={data.date}
					onChange={handleChange}
				/>
				<input
					id="file"
					type="file"
					accept="image/*"
					onChange={handleChange} // Importante para capturar o arquivo
				/>
			</DialogContent>
			<DialogActions className={s.modal__actions}>
				<Button
					className={s.modal__actions__button}
					onClick={onClose}
					color="primary"
				>
					Cancelar
				</Button>
				<Button
					className={s.modal__actions__button}
					onClick={handleSave}
					color="primary"
				>
					Salvar
				</Button>
			</DialogActions>
		</Dialog>
	);
};
