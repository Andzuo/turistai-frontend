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
import { uploadImage } from "../../services/UploadService";
dayjs.extend(customParseFormat);

interface TravelModalProps {
	open: boolean;
	onClose: () => void;
}

const TravelModal: React.FC<TravelModalProps> = ({ open, onClose }) => {
	const [data, setData] = useState({
		title: "",
		description: "",
		date: dayjs().format("DD/MM/YYYY"),
	});
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [errors, setErrors] = useState({
		title: "",
		description: "",
		date: "",
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setSelectedFile(event.target.files[0]);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		setData((prev) => ({ ...prev, [id]: value }));
	};

	const handleDateChange = (newValue: dayjs.Dayjs | null) => {
		setData((prev) => ({
			...prev,
			date: newValue
				? newValue.format("DD/MM/YYYY")
				: dayjs().format("DD/MM/YYYY"),
		}));
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

		if (!data.date || dayjs(data.date, "DD/MM/YYYY").isValid() === false) {
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

		try {
			let imageUrl: string | null = null;

			if (selectedFile) {
				const formData = new FormData();
				formData.append("file", selectedFile);

				const uploadResponse = await uploadImage(formData);
				console.log("Upload realizado com sucesso:", uploadResponse);
				imageUrl = uploadResponse; // Ajuste conforme o retorno do upload
			}

			const travelData = {
				...data,
				imageUrl,
			};

			const response = await createTravel(travelData);
			console.log("Viagem criada com sucesso:", response);
			onClose();
		} catch (error) {
			console.error("Erro ao salvar viagem:", error);
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
				<input
					type="file"
					accept="image/*"
					onChange={handleFileChange}
					style={{ marginTop: "1rem" }}
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

export default TravelModal;
