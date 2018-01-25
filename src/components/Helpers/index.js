import styled, { css } from 'styled-components';

export const Row = styled.div`
  pointer-events: all;
  display: flex;
  align-items: center; /* align vertical */
`;

export const Absolute = styled.div`
  pointer.events: all;
  position: absolute;
  
  ${props => props.bottom && css`
	bottom: ${props => props.bottom}
  `}
  
  ${props => props.right && css`
	right: ${ props => props.right }
  `}
`;