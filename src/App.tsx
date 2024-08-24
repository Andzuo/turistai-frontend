import { Navbar } from "./components/Navbar/Navbar";
import { Travels } from "./components/Travels/Travels";

import s from "./App.module.css";

function App() {
	return (
		<>
			<Navbar />
			<div className={s.app}>
				<Travels />
			</div>
		</>
	);
}

export default App;
