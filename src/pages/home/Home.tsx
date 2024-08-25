import { Travels } from "../../components/Travels/Travels";
import { Calendar } from "../../components/Calendar/Calendar";
import { Navbar } from "../../components/Navbar/Navbar";

import s from "./Home.module.css";

export const Home = () => {
	return (
		<>
			<Navbar />
			<div className={s.home}>
				<Travels />
				<Calendar />
			</div>
		</>
	);
};
