import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";

function PokemonDetail() {
	const { id } = useParams();
	const [pokemon, setPokemon] = useState({});

	async function downloadPokemon() {
		const response = await axios.get(
			`https://pokeapi.co/api/v2/pokemon/${id}`
		);
		setPokemon({
			id: response.data.id,
			name: response.data.name,
			image: response.data.sprites.other.dream_world.front_default,
			weight: response.data.weight,
			height: response.data.height,
			types: response.data.types?.map((t) => t.type.name),
		});
		console.log(response.data);
	}

	useEffect(() => {
		downloadPokemon();
	}, []);

	return (
		<div className="pokemon-detail-wrapper">
			<img
				className="pokemon-detail-image"
				src={pokemon.image}
				alt="pokemon-image"
			/>

			<div className="pokemon-detail-name">{pokemon.name}</div>

			<div className="pokemon-detail-height">
				Height : {pokemon.height}
			</div>
			<div className="pokemon-detail-weight">
				Weight : {pokemon.weight}
			</div>
			<div className="pokemon-detail-types">
				Types :{" "}
				{pokemon.types?.map((t, idx) => (
					<span key={pokemon.id + "" + idx}>{t}</span>
				))}
			</div>
		</div>
	);
}

export default PokemonDetail;
