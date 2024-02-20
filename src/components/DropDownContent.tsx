import styled from "styled-components";

const ContentContainer = styled.section`
  padding: 10rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Text = styled.p`
  width: 80%;
  font-size: 1.5rem;
  color: #c2dee9;
  margin-bottom: 1rem;
`;

const TextColorChange = styled(Text)`
  color: #7fc7e3;
`;

const ContentTitle = styled.h1`
  color: #c2dee9;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

function DropDownContent() {
  return (
    <ContentContainer>
      <div>
        <ContentTitle>Visionen</ContentTitle>
        <Text>
          Detta är platsen du ska vända dig till om du vill utforska kommande
          men också nyöppnade resturanger i Göteborg.
        </Text>
        <Text>
          Detta är för dig som vill vara först med att testa Göteborgs nyheter
          matväg.
        </Text>
      </div>
      <div>
        <TextColorChange>goteborg.</TextColorChange>
      </div>
    </ContentContainer>
  );
}

export default DropDownContent;
