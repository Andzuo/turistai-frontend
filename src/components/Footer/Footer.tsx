import { Link } from "react-router-dom";

import s from "./Footer.module.css";

export const Footer = () => {
	return (
		<footer className={s.footer}>
			<p>
				Desnvolvido por{" "}
				<Link
					about="_blank"
					to={"https://www.linkedin.com/in/anderson-medeiros-dev/"}
				>
					Anderson Medeiros
				</Link>
			</p>
		</footer>
	);
};
