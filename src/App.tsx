import s from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/sign-in/Login";
import { Cadastro } from "./pages/sign-up/Cadastro";
import { Home } from "./pages/home/Home";
import { Perfil } from "./pages/Perfil/Perfil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<>
			<div className={s.app}>
				<ToastContainer />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cadastro" element={<Cadastro />} />
					<Route path="/profile" element={<Perfil />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
