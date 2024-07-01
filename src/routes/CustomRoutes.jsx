import { Route, Routes } from "react-router-dom";
import Pokedex from "../components/Pokedex/Pokedex";
import PokemonDetail from "../components/PokemonDetails/PokemonDetail";

function CustomRoutes() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={<Pokedex />}
				/>
				<Route
					path="/pokemon/:id"
					element={<PokemonDetail />}
				/>
			</Routes>
		</>
	);
}

export default CustomRoutes;
