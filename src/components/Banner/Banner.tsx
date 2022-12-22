import { Container, SlideButton } from "./Styles";

export const Banner = (props: {
    children: JSX.Element[]
}) => {
    return (
        <>
        <Container>
            <SlideButton></SlideButton>
            <SlideButton></SlideButton>
        </Container>
        </>
    );
}