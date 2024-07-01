import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";

function PokemonList() {
	// const { pokemonListState, setPokemonListState } = usePokemonList();
	const [pokemonListState, setPokemonListState] = usePokemonList();

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
