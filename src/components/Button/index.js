import styled, { css } from 'styled-components';

const Button = styled.div`
  padding: 1em;
  color: white;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center; /* align vertical */
  margin: 0.5em;
  font-size: 1rem;
  background-color: #53AD31;
  pointer-events: all;
    
  ${props => props.big && css`
    font-size: 2rem;
  `}
  
  ${props => props.round && css`
     border-radius: 50%;
     padding: 25px 20px;
  `}
  
  
`;

export default Button;