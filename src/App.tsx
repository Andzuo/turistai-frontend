import { Navbar } from "./components/Navbar/Navbar";
import { Travels } from "./components/Travels/Travels";

import s from "./App.module.css";
import { Calendar } from "./components/Calendar/Calendar";

function App() {
	return (
		<>
			<Navbar />
			<div className={s.app}>
				<Travels />
				<Calendar />
			</div>
		</>
	);
}

export default App;
