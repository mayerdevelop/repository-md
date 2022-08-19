import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: white;
  padding: 10px;
  cursor: pointer;
  margin: 0 15px 20px;
  > svg {
    margin: 0 20px;
  }
  &:hover {
    color: #0c9abe;
  }
`;