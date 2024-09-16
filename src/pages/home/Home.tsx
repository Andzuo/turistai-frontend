import { useEffect, useState } from "react";
import { Calendar } from "../../components/Calendar/Calendar";
import { Navbar } from "../../components/Navbar/Navbar";
import { RoadMapNextTravel } from "../../components/RoadMapNextTravel/RoadMapNextTravel";
import { TravelsBoard } from "../../components/TravelsBoard/TravelsBoard";

import { Footer } from "../../components/Footer/Footer";
import type { TravelData } from "../../interface/Travelprops";
import { getAllTravels } from "../../services/TravelsService";
import s from "./Home.module.css";

export const Home = () => {
	const [nextTravel, setNextTravel] = useState<TravelData | null>(null);

	useEffect(() => {
		const fetchTravels = async () => {
			try {
				const fetchedTravels: TravelData[] = await getAllTravels();
				const sortedTravels = fetchedTravels.sort(
					(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
				);
				setNextTravel(sortedTravels[0]); // Armazene a viagem mais próxima
			} catch (error) {
				console.error("Error fetching travels:", error);
			}
		};

		fetchTravels();
	}, []);
	return (
		<>
			<Navbar />
			<section className={s.home}>
				<TravelsBoard />
				<section className={s.home__section}>
					<Calendar />
					{nextTravel && <RoadMapNextTravel travelId={nextTravel.id || 0} />}
				</section>
			</section>
			{/* <Footer /> */}
		</>
	);
};
