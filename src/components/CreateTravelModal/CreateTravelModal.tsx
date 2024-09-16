import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useState } from "react";
import { toast } from "react-toastify";
import { createTravel } from "../../services/TravelsService";
import s from "./CreateTravelModal.module.css";
dayjs.extend(customParseFormat);

interface TravelModalProps {
	open: boolean;
	onClose: () => void;
}

export const CreateTavelModal: React.FC<TravelModalProps> = ({
	open,
	onClose,
}) => {
	const [data, setData] = useState({
		title: "",
		description: "",
		date: dayjs().format("dd/mm/yyyy"),
		file: null as File | null,
		location: "",
		state: "",
	});
	const [, setErrors] = useState({
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
			toast.error("Por favor, preencha todos os campos corretamente.");
			return;
		}

		//funciona assim não alterar
		const formattedDate = dayjs(data.date).format("DD/MM/YYYY");

		const travelData = {
			title: data.title,
			description: data.description,
			date: formattedDate,
			file: data.file || null || undefined,
			location: data.location,
			state: data.state,
		};

		try {
			await createTravel(travelData);
			toast.success("Viagem criada com sucesso!");
			onClose();
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} catch (error) {
			toast.error("Erro ao criar viagem. Tente novamente mais tarde.");
		}
	};

	return (
		<Dialog
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100%",
				backgroundColor: "rgb(1, 0, 0, 0.2)",
			}}
			className={s.modal}
			open={open}
			onClose={onClose}
		>
			<div className={s.modal__title}>
				<strong>Criar Viagem</strong>
			</div>
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
					type="text"
					placeholder="Descrição"
					value={data.description}
					onChange={handleChange}
				/>
				<input
					id="date"
					type="date"
					placeholder="Data da viagem"
					value={data.date}
					onChange={handleChange}
				/>
				<input
					id="location"
					type="text"
					placeholder="Local da viagem"
					value={data.location}
					onChange={handleChange}
				/>
				<input
					id="state"
					type="text"
					placeholder="Estado"
					value={data.state}
					onChange={handleChange}
				/>
				<div className={s.img__container}>
					<label htmlFor="file" className={s.img__label}>
						Escolher imagem
					</label>
					<input
						id="file"
						type="file"
						accept="image/*"
						className={s.img}
						onChange={handleChange}
					/>
					{data.file && (
						<span className={s.img__filename}>{data.file.name}</span>
					)}
				</div>
			</DialogContent>
			<DialogActions
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
					gap: "1rem",
					paddingBottom: "2rem",
				}}
				className={s.modal__actions}
			>
				<button
					type="button"
					className={s.modal__actions__button__cancel}
					onClick={onClose}
					color="primary"
				>
					Cancelar
				</button>
				<button
					type="submit"
					className={s.modal__actions__button}
					onClick={handleSave}
					color="primary"
				>
					Salvar
				</button>
			</DialogActions>
		</Dialog>
	);
};
