import s from "./Login.module.css";

export const Login = () => {
	return (
		<div className={s.login}>
			<div className={s.login__container}>
				<h1 className={s.login__title}>Login</h1>
				<form className={s.login__form}>
					<div className={s.login__form__group}>
						<label htmlFor="name" className={s.login__form__label}>
							Nome
						</label>
						<input
							type="text"
							id="name"
							className={s.login__form__input}
							placeholder="Digite seu nome"
						/>
					</div>
					<div className={s.login__form__group}>
						<label htmlFor="password" className={s.login__form__label}>
							Senha
						</label>
						<input
							type="password"
							id="password"
							className={s.login__form__input}
							placeholder="Digite sua senha"
						/>
					</div>
					<button type="submit" className={s.login__form__button}>
						Logar
					</button>
				</form>
			</div>
		</div>
	);
};
