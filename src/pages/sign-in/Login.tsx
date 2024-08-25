import s from "./Cadastro.module.css";

export const Cadastro = () => {
	return (
		<div className={s.cadastro}>
			<div className={s.cadastro__container}>
				<h1 className={s.cadastro__title}>Cadastro</h1>
				<form className={s.cadastro__form}>
					<div className={s.cadastro__form__group}>
						<label htmlFor="name" className={s.cadastro__form__label}>
							Nome
						</label>
						<input
							type="text"
							id="name"
							className={s.cadastro__form__input}
							placeholder="Digite seu nome"
						/>
					</div>
					<div className={s.cadastro__form__group}>
						<label htmlFor="password" className={s.cadastro__form__label}>
							Senha
						</label>
						<input
							type="password"
							id="password"
							className={s.cadastro__form__input}
							placeholder="Digite sua senha"
						/>
					</div>
					<button type="submit" className={s.cadastro__form__button}>
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
};
