import s from "./SelectTravelModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import type { TravelData } from "../../interface/Travelprops";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import { RoadMapTravelModal } from "../RoadMapTravelModal/RoadMapTravelModal";

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
					type="button"
					className={s.modal__content_closeButton}
					onClick={onClose}
				>
					<CloseIcon />
				</button>
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
					type="submit"
					className={s.modal__actions__button}
					onClick={() => travel.id !== undefined && onRemove(travel.id)}
				>
					Remover Viagem
				</button>
			</div>
		</div>
	);
};

export default SelectTravelModal;
