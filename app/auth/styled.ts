import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 85vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const AuthForm = styled.form`
    width: 500px;
    min-height: 100px;
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
`;

export const AuthTitle = styled.h4`
    margin-bottom: 1rem;
`;

export const InputField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    label {
        margin-left: 7px;
        font-weight: 600;
        font-size: 14px;
        color: var(--label-color);
    }
`;

export const SignupButton = styled.div`
    display: flex;
    gap: 5px;
    margin-top: 1rem;
    font-size: 14px;
`;
export const StyledLink = styled.div`
    font-weight: 600;
`;
