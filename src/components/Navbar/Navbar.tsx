import { Button, IconButton, Toolbar, AppBar } from "@mui/material";

import { Logo } from "../assets/Logo";

import s from "./Navbar.module.css";

export const Navbar = () => {
	return (
		<AppBar className={s.navbar}>
			<Toolbar className={s.navbar__container}>
				<IconButton className={s.navbar__logo}>
					<Logo />
				</IconButton>
				<Button className={s.navbar__login}>Login</Button>
			</Toolbar>
		</AppBar>
	);
};
