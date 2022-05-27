import { useState, useEffect } from "react";
import API from "../API";
// Helpers
import { isPersistedState } from "../helpers";

const initialState = {
	page: 0, 
	results: [],
	total_pages: 0,
	total_results: 0
};

export const useHomeFetch = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [state, setState] = useState(initialState);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);

	const fetchMovies = async (page, searchTerm = "") => {
		try {
			setError(false);
			setLoading(true);

			const movies = await API.fetchMovies(searchTerm, page);

			setState(prev => ({
				...movies,
				results:
					page > 1 ? [...prev.results, ...movies.results] : [...movies.results]
			}));
		} catch (error) {
			setError(true);
		}
		setLoading(false);
	};

	// Initial render / Search
	useEffect(() => {
		// If not in a search, check session storage
		if (!searchTerm) {
			const sessionState = isPersistedState("homeState");
			if (sessionState) {
				console.log("Fetching from sessionStorage");
				setState(sessionState);
				return;
			}
		}
		console.log("Fetching from API");
		// Wipe out old state before new search
		setState(initialState);
		// On search, fetch first page, same as on initial mount. This will work since searchTerm is "" initially, hence we will fetch the most popular movies
		fetchMovies(1, searchTerm)
		// Trigger when searchTerm changes
	}, [searchTerm]);

	// Load More
	useEffect(() => {
		if (!isLoadingMore) return; 

		fetchMovies(state.page + 1, searchTerm);
		setIsLoadingMore(false);
	}, [isLoadingMore, searchTerm, state.page]);

	
	// Write to session storage
	useEffect(() => {
		if (!searchTerm) {
			sessionStorage.setItem("homeState", JSON.stringify(state));
		}
	}, [searchTerm, state]);
	
	return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
};
