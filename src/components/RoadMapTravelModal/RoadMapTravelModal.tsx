import type React from "react";
import s from "./RoadMapTravelModal.module.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { createRoadMap } from "../../services/RoadMapService";

interface RoadMapTravelModalProps {
	open: boolean;
	onClose: () => void;
	travelId: string;
}

export const RoadMapTravelModal: React.FC<RoadMapTravelModalProps> = ({
	open,
	onClose,
	travelId,
}) => {
	const [data, setData] = useState({
		title: "",
		addres: "",
		file: null as File | null,
	});
	const [, setErrors] = useState({
		title: "",
		addres: "",
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
			addres: "",
		};

		if (!data.title) {
			newErrors.title = "Título é obrigatório";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSave = async () => {
		if (!validateFields()) {
			toast.error("Por favor, preencha o título corretamente.");
			return;
		}

		const roadMapData = {
			title: data.title,
			addres: data.addres,
		};

		try {
			await createRoadMap(
				travelId?.toString() || "",
				roadMapData,
				data.file || undefined,
			);
			toast.success("Roteiro criado com sucesso!");
		} catch (error) {
			toast.error("Erro ao criar roteiro. Tente novamente mais tarde.");
		}
	};

	if (!open) return null;

	return (
		<div className={s.roadMap}>
			<div className={s.roadMap__content}>
				<h2 className={s.roadMap__content__title}>Detalhes do RoadMap</h2>
				<div className={s.roadMap__inputs}>
					<input
						className={s.roadMap__inputs__input}
						id="title"
						placeholder="Título"
						type="text"
						required
						value={data.title}
						onChange={handleChange}
					/>
					<input
						className={s.roadMap__inputs__input}
						id="addres"
						type="text"
						placeholder="Endereço"
						value={data.addres}
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
					</div>
				</div>
				<div className={s.roadMap__actions}>
					<button
						type="submit"
						className={s.modal__actions__button}
						onClick={handleSave}
					>
						Salvar
					</button>
					<button
						type="button"
						className={s.modal__actions__button}
						onClick={onClose}
					>
						Fechar
					</button>
				</div>
			</div>
		</div>
	);
};
