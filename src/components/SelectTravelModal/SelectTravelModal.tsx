import s from "./SelectTravelModal.module.css";
import type { TravelData } from "../../interface/Travelprops";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { RoadMapTravelModal } from "../RoadMapTravelModal/RoadMapTravelModal";
import DeleteIcon from "@mui/icons-material/Delete";

interface SelectTravelModalProps {
	travel: TravelData;
	onClose: () => void;
	onRemove: (id: number) => void;
}

const SelectTravelModal: React.FC<SelectTravelModalProps> = ({
	travel,
	onClose,
	onRemove,
}) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div className={s.modal}>
			<div className={s.modal__Content}>
				<button
					type="submit"
					className={s.modal__content_closeButton}
					onClick={() => travel.id !== undefined && onRemove(travel.id)}
				>
					<DeleteIcon />
				</button>
				<div>
					<img src={travel.image} alt={travel.title} />
				</div>
				<h2 className={s.modal__content__title}>{travel.title}</h2>
				<p className={s.modal__content__date}>
					{new Date(travel.date).toLocaleDateString()}
				</p>
				<p className={s.modal__content_description}>{travel.description}</p>
				<div>
					<h2>
						Adicionar roteiro da viagem:
						<button
							className={s.modal__content_addButton}
							type="submit"
							onClick={handleClickOpen}
						>
							<AddCircleIcon />
						</button>
					</h2>
				</div>
				<RoadMapTravelModal open={open} onClose={handleClose} />
				<button
					type="button"
					className={s.modal__actions__button}
					onClick={onClose}
				>
					Fechar Janela
				</button>
			</div>
		</div>
	);
};

export default SelectTravelModal;
