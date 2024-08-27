import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import s from "./Profile.module.css";

const Profile: React.FC = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		localStorage.removeItem("acessToken");
		navigate("/");
		window.location.reload();
	};

	return (
		<div>
			<IconButton onClick={handleClick} color="inherit">
				<AccountCircleIcon className={s.profile__icon} />
			</IconButton>
			<Menu
				sx={{
					marginTop: "40px",
					display: "inline-flex",
					flexDirection: "column",
				}}
				className={s.profile__box}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleLogout}>Sair</MenuItem>
			</Menu>
		</div>
	);
};

export default Profile;
