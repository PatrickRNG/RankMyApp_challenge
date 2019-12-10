import React, { useContext } from "react";
import styled from "styled-components";
import AlertContext from "../../contexts/AlertContext";
import { Card as AntCard } from "antd";

const StyledHeader = styled.h2`
  margin-top: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled(AntCard)`
  width: 350px;
  margin: 6px;

  & .ant-card-body {
    display: flex;
    justify-content: space-between;
  }
`;

const Left = styled.div`
  word-break: break-word;
  width: 75%;
`;

const P = styled.p`
  margin: 0;
`;

const Time = styled.div`
  font-size: 20px;
  font-weight: 500;
  text-align: center;
`;
  
const Minute = styled.div`
  font-size: 14px;
`;

function Alerts() {
  const { alerts } = useContext(AlertContext);
  return (
    <>
      <StyledHeader>Alerts</StyledHeader>
      <Wrapper>
        {alerts.map((alert, i) => (
          <Card key={i}>
            <Left>
              <b>{alert.search}</b>
              <P>{alert.email}</P>
            </Left>
            <div>
              <Time>
                {alert.time}
                <br />
                <Minute>minutes</Minute>
              </Time>
            </div>
          </Card>
        ))}
      </Wrapper>
    </>
  );
}

export default Alerts;