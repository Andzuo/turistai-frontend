import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { createTravel } from "../../services/TravelsService";
import s from "./TravelModal.module.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

interface TravelModalProps {
	open: boolean;
	onClose: () => void;
}

const TravelModal: React.FC<TravelModalProps> = ({ open, onClose }) => {
	const [data, setData] = useState({
		title: "",
		description: "",
		date: dayjs().format("DD/MM/YYYY"), // Inicializa com a data atual no formato brasileiro
	});

	const [errors, setErrors] = useState({
		title: "",
		description: "",
		date: "",
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		setData((prev) => ({ ...prev, [id]: value }));
	};

	const handleDateChange = (newValue: dayjs.Dayjs | null) => {
		setData((prev) => ({
			...prev,
			date: newValue
				? newValue.format("DD/MM/YYYY") // Formata a data para o formato brasileiro
				: dayjs().format("DD/MM/YYYY"),
		}));
	};

	const validateFields = () => {
		let isValid = true;
		const newErrors: { title: string; description: string; date: string } = {
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

		if (!data.date || dayjs(data.date, "DD/MM/YYYY").isValid() === false) {
			newErrors.date = "Data inválida";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSave = async () => {
		if (!validateFields()) {
			return; // Não prosseguir se a validação falhar
		}

		try {
			console.log("Saving travel with data:", data);

			await createTravel({
				title: data.title,
				description: data.description,
				date: data.date, // Envia a data no formato brasileiro
			});

			onClose();
			window.location.reload(); // Recarrega a página após salvar
		} catch (error) {
			console.error("Error saving travel:", error);
		}
	};

	return (
		<Dialog className={s.modal} open={open} onClose={onClose}>
			<DialogTitle className={s.modal__title}>Criar Viagem</DialogTitle>
			<DialogContent className={s.modal__inputs}>
				<TextField
					autoFocus
					margin="dense"
					id="title"
					label="Título"
					type="text"
					fullWidth
					variant="outlined"
					value={data.title}
					onChange={handleChange}
					error={!!errors.title}
					helperText={errors.title}
				/>
				<TextField
					margin="dense"
					id="description"
					label="Descrição"
					type="text"
					fullWidth
					variant="outlined"
					value={data.description}
					onChange={handleChange}
					error={!!errors.description}
					helperText={errors.description}
				/>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker
						label="Data da sua viagem"
						value={dayjs(data.date, "DD/MM/YYYY")}
						onChange={handleDateChange}
					/>
				</LocalizationProvider>
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

export default TravelModal;
