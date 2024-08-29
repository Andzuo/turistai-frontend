import s from "./SelectTravelModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import type { TravelData } from "../../interface/Travelprops";

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
					<h2>Lugares Recomendados:</h2>
				</div>
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
