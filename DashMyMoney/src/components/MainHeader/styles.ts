import styled from 'styled-components';

export const Container = styled.div`
    grid-area: MH;
    
    background-color: ${props => props.theme.colors.secondary};
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 20px;

    border-bottom: 1px solid ${props => props.theme.colors.gray};
    
`;

export const Profile = styled.div`
    color: ${props => props.theme.colors.white};
`;

export const Welcome = styled.h3``;

export const UserName = styled.span``;



export const MenuItemLink = styled.a`
    color: ${props => props.theme.colors.info};
    text-decoration: none;

    margin: 7px 0px;
    display: flex;
    align-items: center;
    margin-right:30px;

    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;

export const MenuContainer = styled.nav`
    display: flex;
`;

export const Title = styled.h3`
    color: ${props => props.theme.colors.white};
    margin-bottom:10px;
    font-size:25px;

    @media(max-width: 600px){
        display: none;
    }
`;


export const MenuItemButton = styled.button`
    font-size: 16px;
    color: ${props => props.theme.colors.info};
    
    border: none;
    background: none;

    margin: 7px 0;
    display: flex;
    align-items: center;

    transition: opacity .3s;

    &:hover {
        opacity: .7;
    }

    > svg {
        font-size: 18px;
        margin-right: 5px;
    }
`;