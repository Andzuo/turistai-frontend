import type React from "react";
import s from "./RoadMapTravelModal.module.css";

interface RoadMapTravelModalProps {
	open: boolean;
	onClose: () => void;
}

export const RoadMapTravelModal: React.FC<RoadMapTravelModalProps> = ({
	open,
	onClose,
}) => {
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
					/>
					<input
						className={s.roadMap__inputss__input}
						id="comment"
						type="text"
						placeholder="Comentário"
					/>
					<input
						className={s.roadMap__inputs__input}
						id="addres"
						type="text"
						placeholder="Endereço"
					/>
					<div className={s.img__container}>
						<label htmlFor="file" className={s.img__label}>
							Escolher imagem
						</label>
						<input id="file" type="file" accept="image/*" className={s.img} />
					</div>
					<div className={s.roadMap__inputs__checkbox}>
						<input
							className={s.roadMap__inputs__checkbox__input}
							id="visited"
							type="checkbox"
						/>
						<label htmlFor="visited" className={s.roadMap__label}>
							Já visitado?
						</label>
					</div>
				</div>
				<div className={s.roadMap__actions}>
					<button
						type="submit"
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
