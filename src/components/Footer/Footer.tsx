import { Link } from "react-router-dom";

export const Footer = () => {
	return (
		<footer>
			<p>
				Desnvolvido por{" "}
				<Link to={"https://www.linkedin.com/in/anderson-medeiros-dev/"}>
					Anderson Medeiros
				</Link>
			</p>
		</footer>
	);
};
