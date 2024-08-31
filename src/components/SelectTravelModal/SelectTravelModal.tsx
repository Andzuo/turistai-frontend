import s from "./SelectTravelModal.module.css";
import type { TravelData } from "../../interface/Travelprops";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState, useEffect } from "react";
import { RoadMapTravelModal } from "../RoadMapTravelModal/RoadMapTravelModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchImage } from "../../services/TravelsService";
import { RoadMapList } from "../RoadMapList/RoadMapList";

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
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	useEffect(() => {
		const loadImage = async () => {
			if (travel.image) {
				try {
					const imageBlob = await fetchImage(travel.image);
					const imageObjectURL = URL.createObjectURL(imageBlob);
					setImageUrl(imageObjectURL);
				} catch (error) {
					console.error("Erro ao carregar imagem:", error);
				}
			}
		};

		loadImage();

		return () => {
			if (imageUrl) {
				URL.revokeObjectURL(imageUrl);
			}
		};
	}, [travel.image, imageUrl]);

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
					className={s.modal__content_removeTravel}
					onClick={() => travel.id !== undefined && onRemove(travel.id)}
				>
					<DeleteIcon />
				</button>
				<div className={s.image__container}>
					{imageUrl ? (
						<img src={imageUrl} alt={travel.title} />
					) : (
						<div className={s.imagePlaceholder}>Imagem não disponível</div>
					)}
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
					<RoadMapList travelId={travel.id as number} />
				</div>
				<RoadMapTravelModal
					open={open}
					onClose={handleClose}
					travelId={travel.id?.toString() ?? ""}
				/>
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
