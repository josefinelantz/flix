import styled from "styled-components";

export const Wrapper = styled.div`
	background: var(--darkGrey);
	padding: 0 20px;
`;

export const Content = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	max-width: var(--maxWidth);
	padding: 20px 0;
	margin: 0 auto;
	
	.brand-name {
		width: 200px;
		font-size: 3rem;
		color: var(--white);
		margin: 0;
	}
`;

export const TMDBLogoImg = styled.img`
	width: 100px;

	@media screen and (max-width: 500px) {
		width: 80px;
	}
`;