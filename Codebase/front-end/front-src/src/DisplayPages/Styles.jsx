
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

export const Tagline = styled.h1`
  font-size: 30px;
  margin: 0px;
  padding: 0px;
`;

export const SellingPoint = styled(Tagline)`
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

export const CompleteButton = styled.button`
  font-size: 18px;
  width: 200px;
  height: 40px;
  background-color: #F0E9DB;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TaskDisplay = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5%;
  padding-bottom: 3%;
  padding-left: 5%;
  padding-right: 5%;
`;