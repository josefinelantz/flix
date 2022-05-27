import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
// Image
import searchIcon from "../../images/search-icon.svg";
// Styles
import { Wrapper, Content } from "./SearchBar.styles";

const SearchBar = ({ setSearchTerm }) => {
	const [state, setState] = useState("");
	// Initial variable to control that component only renders when user has typed a search term
	const initial = useRef(true);

	useEffect(() => {
		// If initial render
		if (initial.current) {
			// Set initial to false and return
			initial.current = false;
			return;
		}
		// Create a delay so the data is not fetched immediately as the user types
		const timer = setTimeout(() => {
			setSearchTerm(state);
		}, 500)

		// return function to be sure to clear the timer
		return () => clearTimeout(timer)
	}, [setSearchTerm, state])

	return (
		<Wrapper>
			<Content>
				<img src={searchIcon} alt="search-icon" />
				<input 
					type="text" placeholder="Search Movie" 
					onChange={e => setState(e.currentTarget.value)}
					value={state}
				/>
			</Content>
		</Wrapper>
	);
};

SearchBar.propTypes = {
	callback: PropTypes.func 
};

export default SearchBar;