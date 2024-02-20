import styled from "styled-components";

const ContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  padding: 10rem;
`;

const Text = styled.p`
  width: 80%;
  font-size: 1.5rem;
  color: #c2dee9;
  margin-bottom: 1rem;
`;

const ContentTitle = styled.h1`
  color: #7fc7e3;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

function DropDownContent() {
  return (
    <ContentContainer>
      <ContentTitle>Visionen</ContentTitle>
      <Text>
        Detta är platsen du ska vända dig till om du vill utforska kommande men
        också nyöppnade resturanger i Göteborg.
      </Text>
      <Text>
        Detta är för dig som vill vara först med att testa Göteborgs nyheter
        matväg.
      </Text>
    </ContentContainer>
  );
}

export default DropDownContent;
