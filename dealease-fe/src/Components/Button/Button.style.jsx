import styled from 'styled-components';
import Button from './Button';

const ButtonBaseStyle = styled(Button)`
  display: inline-block;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  font-family: Inter, sans-serif;
  cursor: pointer;
  padding: 0.8rem 2rem;
`;

export const ButtonStyle = styled(ButtonBaseStyle)`
  background-color: ${(props) => props.backgroundColor};
  transition: all 0.3s;
  color: #fff;

  &:hover {
    background: ${(props) => props.hoverBgColor};
  }
`;

export const ButtonBorderedStyle = styled(ButtonBaseStyle)`
  outline: 2px solid rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.5);
  margin: 0 1rem;

  &:hover,
  &:focus {
    background: ${(props) => props.hoverBgOutlineColor};
    color: #fff;
    outline: 2px solid #fff;
  }
`;
