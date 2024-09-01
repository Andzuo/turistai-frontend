import { useState } from "react";
import s from "./Cadastro.module.css";
import { createUser } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Cadastro = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();

		try {
			await createUser(username, password);
			setSuccess("Usuário criado com sucesso.");
			toast.success("Usuário criado com sucesso.");
			navigate("/login");
		} catch (err) {
			setError("Falha ao criar usuário. Tente novamente.");
		}
	};

	return (
		<div className={s.cadastro}>
			<div className={s.cadastro__container}>
				<h1 className={s.cadastro__title}>Cadastro</h1>
				<form className={s.cadastro__form} onSubmit={handleSubmit}>
					<div className={s.cadastro__form__group}>
						<label htmlFor="name" className={s.cadastro__form__label}>
							Nome
						</label>
						<input
							type="text"
							id="name"
							className={s.cadastro__form__input}
							placeholder="Digite seu nome"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
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
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					{success && <p className={s.cadastro__success}>{success}</p>}
					{error && <p className={s.cadastro__error}>{error}</p>}
					<button type="submit" className={s.cadastro__form__button}>
						Cadastrar
					</button>
					<p className={s.cadastro__form__span}>
						Já possui uma conta? <Link to="/login">Faça login</Link>
					</p>
				</form>
			</div>
		</div>
	);
};
