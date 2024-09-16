import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar o hook de navegação
import { login } from "../../services/LoginService";
import s from "./Login.module.css";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			const data = await login(email, password);

			const accessTokenData = {
				token: data.acessToken,
			};

			localStorage.setItem("acessToken", JSON.stringify(accessTokenData));
			navigate("/");
		} catch (err) {
			setError("Usuário ou senha inválidos");
		}
	};

	return (
		<div className={s.login}>
			<div className={s.login__container}>
				<h1 className={s.login__title}>Login</h1>
				<form className={s.login__form} onSubmit={handleSubmit}>
					<div className={s.login__form__group}>
						<label htmlFor="email" className={s.login__form__label}>
							Email
						</label>
						<input
							type="email"
							id="email"
							className={s.login__form__input}
							placeholder="Digite seu nome"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{error && <p className={s.login__error}>{error}</p>}
					<button type="submit" className={s.login__form__button}>
						Logar
					</button>
					<p className={s.login__form__span}>
						Ainda não tem conta? <Link to="/cadastro">Cadastre-se</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
