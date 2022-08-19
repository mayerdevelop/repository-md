import styled from 'styled-components';

export const Container = styled.div `
    flex:1;
    flex-direction: row;
    height: 80px;
    width:100%;
    display: flex;
    background-color: #1A202C; 
    justify-content: flex-end;
    border-bottom: 0.5px solid #fff
`;


export const ContUser = styled.div `
    display: flex;
    align-items:center;
    justify-content: flex-end;
    color: white;
    text-transform: capitalize;
    text-align: center;
    padding: 30px;
    font-size: 20px
`;