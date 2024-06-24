import styled from "styled-components";

export const Container = styled.div`
    display: flex;
`

export const Menu = styled.aside`
    flex: 1;
`

export const Content = styled.main`
    flex: 8;
    height: 100%;

    .d-table, .cta-wrapper  {
        width: 86vw;
    }
`

export const Header = styled.header`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 86vw;
`

export const spLevels = styled.span<{ color: string }>`
    display: inline-block;
    background-color: ${(props) => props.color};
    font-size: 16px;
    color: #fff;
    padding: 7px;
    border-radius: 6px;
`

export const Button = styled.button`
    background-color: #77dd77;
    color: #fff;
    padding: 12px;
    border-radius: 8px;
`