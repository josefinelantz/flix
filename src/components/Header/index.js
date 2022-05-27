import React from "react";
import { Link } from "react-router-dom";
import TMDBLogo from "../../images/tmdb_logo.svg";
import { Wrapper, Content, TMDBLogoImg, BrandName } from "./Header.styles";

const Header = () => (
	<Wrapper>
		<Content>
			<Link to="/">
			<h1 className="brand-name">fliX</h1>
			</Link>
			<TMDBLogoImg src={TMDBLogo} alt="tmdb-logo" />
		</Content>
	</Wrapper>
);

export default Header;