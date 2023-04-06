import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #000;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;

    > img {
        width: 100%;
        height: 120px;
    }
`;

export const Form = styled.form`
    width: 300px;
    height: 300px;

    padding: 30px;

    border-radius: 10px;

    background-color: ${props => props.theme.colors.primary};
`;

export const FormTitle = styled.h1`
    margin-bottom: 30px;

    color: ${props => props.theme.colors.white}; 

    &:after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 10px solid ${props => props.theme.colors.info};  
    }
`;

