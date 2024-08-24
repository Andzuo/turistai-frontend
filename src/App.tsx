import { Box } from "@mui/material";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
	return (
		<Box>
			<Navbar />
			<Box className="app">
				<h1>hello World</h1>
			</Box>
		</Box>
	);
}

export default App;
