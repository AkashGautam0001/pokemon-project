import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
	const [pokemonList, setPokemonList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function downloadPokemon() {
		const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
		const pokemonResults = response.data.results;
		const pokemonResultsPromise = pokemonResults.map((pokemon) =>
			axios.get(pokemon.url)
		);
		const pokemonData = await axios.all(pokemonResultsPromise);

		const res = pokemonData.map((pokedata) => {
			const pokemon = pokedata.data;
			return {
				id: pokemon.id,
				name: pokemon.name,
				image: pokemon.sprites?.other?.dream_world?.front_default,
				types: pokemon.types,
			};
		});
		console.log(res);
		setPokemonList(res);
		setIsLoading(false);
	}
	useEffect(() => {
		downloadPokemon();
	}, []);

	return (
		<div className="pokemon-list-wrapper">
			<div>Pokemon List</div>
			{isLoading
				? "Loading..."
				: pokemonList.map((pokemon) => (
						<Pokemon
							key={pokemon.id}
							name={pokemon.name}
							image={pokemon.image}
						/>
				  ))}
		</div>
	);
}

export default PokemonList;
