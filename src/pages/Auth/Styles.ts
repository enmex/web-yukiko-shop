import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 20rem;
    justify-content: space-between;
    align-items: center;
    min-height: 400px;
    border-radius: 5px;
    border: 1px solid pink;
`
export const FormHeader = styled.div`
    margin-top: 1rem;
    font-size: 1.5em;
`

export const InputForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const Input = styled.input`
    min-height: 3rem;
    border: 1px solid #bdbdbd;
    border-radius: 10px;
    padding: 0 10px;
    min-width: auto;
    font-size: 16px;
    text-align: center;
    margin: 0.2rem 0;

    &:active {
        border: 1px solid grey;
        transition: 0.3s;
    }

    &:hover {
        border: 1px solid pink;
        transition: 0.2s;
    }
`

export const SubmitButton = styled.button`
    background-color: grey;
    border: none;
    color: white;
    padding: 1rem 2rem;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    min-width: 9rem;
    margin: 0.2rem 1rem;
    min-height: 1rem;
    border-radius: 10px;
    &:hover {
        background-color: #ffffff;
        border: 1px solid pink;
        color: $color;
        transition: 0.2s;
    }
`