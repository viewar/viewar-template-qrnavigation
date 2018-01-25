import styled from 'styled-components';

const Image = styled.div`
  margin: 1.5em;
  position: absolute;
  right: 0;
  width: 200px;
  height: 61px;
  background: url(${props => props.src}) center no-repeat;
  background-size: contain;
`;

export default Image;