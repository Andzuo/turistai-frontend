import { Logo } from "../assets/Logo";
import s from "./Navbar.module.css";

export const Navbar = () => {
	return (
		<header className={s.navbarRoot}>
			<nav className={s.navbar_container}>
				<div className={s.navbar_logo}>
					<Logo />
				</div>
				{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
				<button className={s.navbar_login}>Login</button>
			</nav>
		</header>
	);
};
