import { Calendar } from "../../components/Calendar/Calendar";
import { Navbar } from "../../components/Navbar/Navbar";
import { TravelsBoard } from "../../components/TravelsBoard/TravelsBoard";

import s from "./Home.module.css";

export const Home = () => {
	return (
		<>
			<Navbar />
			<div className={s.home}>
				<TravelsBoard />
				<Calendar />
			</div>
		</>
	);
};
