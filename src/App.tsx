import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/sign-in/Login";
import { Cadastro } from "./pages/sign-up/Cadastro";
import { Home } from "./pages/home/Home";

function App() {
	return (
		<>
			<div className={s.app}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cadastro" element={<Cadastro />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
