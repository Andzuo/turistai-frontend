import { useState, useEffect } from "react";
import { Logo } from "../assets/Logo";
import s from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";

export const Navbar = () => {
	const [open, setOpen] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("acessToken");
		if (token) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const loginnav = () => {
		navigate("/login");
	};

	return (
		<header className={s.navbarRoot}>
			<nav className={s.navbar_container}>
				<div className={s.navbar_logo}>
					<Logo />
				</div>
				<div className={s.navbar_actions}>
					{isLoggedIn ? (
						<div>
							<Profile />
						</div>
					) : (
						<button onClick={loginnav} type="button" className={s.navbar_login}>
							Login
						</button>
					)}
				</div>
			</nav>
		</header>
	);
};
