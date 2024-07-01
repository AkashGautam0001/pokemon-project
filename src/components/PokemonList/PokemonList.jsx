import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
	const [pokemonListState, setPokemonListState] = useState({
		pokemonList: [],
		isLoading: true,
		pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
		nextUrl: "",
		prevUrl: "",
	});

	async function downloadPokemon() {
		setPokemonListState((state) => ({ ...state, isLoading: true }));

		const response = await axios.get(pokemonListState.pokedexUrl);
		const pokemonResults = response.data.results;
		const pokemonResultsPromise = pokemonResults?.map((pokemon) =>
			axios.get(pokemon.url)
		);

		const pokemonData = await axios.all(pokemonResultsPromise);
		setPokemonListState((state) => ({
			...state,
			nextUrl: response.data?.next,
			prevUrl: response.data?.previous,
		}));

		console.log("setPokemonListState", pokemonData);
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
		setPokemonListState((state) => ({
			...state,
			pokemonList: res,
			isLoading: false,
		}));
	}
	useEffect(() => {
		downloadPokemon();
	}, [pokemonListState.pokedexUrl]);

	return (
		<div className="pokemon-list-wrapper">
			<div className="pokemon-wrapper">
				{pokemonListState.isLoading
					? "Loading..."
					: pokemonListState.pokemonList?.map((pokemon) => (
							<Pokemon
								key={pokemon.id}
								name={pokemon.name}
								image={pokemon.image}
								id={pokemon.id}
							/>
					  ))}
			</div>

			<div className="controls">
				<button
					disabled={pokemonListState.prevUrl === null}
					onClick={() =>
						setPokemonListState({
							...pokemonListState,
							pokedexUrl: pokemonListState.prevUrl,
						})
					}
				>
					Prev
				</button>
				<button
					disabled={pokemonListState.nextUrl === undefined}
					onClick={() =>
						setPokemonListState({
							...pokemonListState,
							pokedexUrl: pokemonListState.nextUrl,
						})
					}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default PokemonList;
