import styled from "styled-components";

export const WelcomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainLetter = styled.div`
  font-size: 300px;
  font-weight: bold;
  display: inline;
`;

export const SubLetters = styled.div`
  font-size: 100px;
  display: inline;
`;

export const LogoDiv = styled.div`
  width: 500px;
  text-align: center;
`;

export const Tagline = styled.h5`
  font-size: 30px;
  margin: 0px;
  padding: 0px;
`;

export const SellingPoint = styled.h5`
  margin-top: 0.5em;
  font-size: 25px;
  font-weight: normal;
`;

export const Prioritize = styled(SellingPoint)`
  margin-right: 7em;
`;

export const Perfect = styled(SellingPoint)`
  margin-left: 7em;
`;

export const StyledFooter = styled.footer`
  margin-top: 5em;
`;