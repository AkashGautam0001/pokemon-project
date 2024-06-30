import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
	const [pokemonList, setPokemonList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [pokedexUrl, setPokedexUrl] = useState(
		"https://pokeapi.co/api/v2/pokemon"
	);

	const [nextUrl, setNextUrl] = useState("");
	const [prevUrl, setPrevUrl] = useState("");

	async function downloadPokemon() {
		setIsLoading(true);
		const response = await axios.get(pokedexUrl);
		const pokemonResults = response.data.results;
		const pokemonResultsPromise = pokemonResults?.map((pokemon) =>
			axios.get(pokemon.url)
		);
		const pokemonData = await axios.all(pokemonResultsPromise);
		setNextUrl(response.data?.next);
		setPrevUrl(response.data?.previous);

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
	}, [pokedexUrl]);

	return (
		<div className="pokemon-list-wrapper">
			<div className="pokemon-wrapper">
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

			<div className="controls">
				<button
					disabled={prevUrl === undefined}
					onClick={() => setPokedexUrl(prevUrl)}
				>
					Prev
				</button>
				<button
					disabled={nextUrl === undefined}
					onClick={() => setPokedexUrl(nextUrl)}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default PokemonList;
