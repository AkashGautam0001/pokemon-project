import { Link, useParams } from "react-router-dom";
import "./Pokemon.css";
function Pokemon({ name, image, id }) {
	return (
		<div className="pokemon">
			{/* <a href="/polemon/2"></a> Not Recommended beacuse page is refresh which remove the sole purpose of single page application
			 */}
			<Link to={`/pokemon/${id}`}>
				<div className="pokemon-name">{name}</div>
				<div>
					<img
						className="pokemon-image"
						src={image}
					/>
				</div>
			</Link>
		</div>
	);
}

export default Pokemon;
