import styled from 'styled-components';

const Thumbnail = styled.img`
  outline: ${props => props.active && 'solid red 1px'};
  width: 40px;
  height: 40px;
  margin: 0 2px;
`;

export default Thumbnail;
