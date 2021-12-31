import styled from 'styled-components';

const Main = styled('div')`
	& .input-date-c {
		display: flex;
		align-items: center;
		width: 100%;
		position: relative;
		
		& .date-display {
			position: absolute;
			left: 6px;
			z-index: 1;
		}
		
		& .date-hide  {
			visibility: hidden;
		}
	}
`;

export { Main };
