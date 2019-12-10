import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import styled from 'styled-components';

import { AlertProvider } from "../contexts/AlertContext";
import { getAlerts, createAlert, getEbayProductByKeyword } from "../api";
import { Search, Header, Footer, Alerts } from "../components";

const { Content } = Layout;

const Paper = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280
`;

const StyledHeader = styled.h2`
  margin-top: 30px;
`;

function App() {
  const [alert, setAlert] = useState({
    search: "",
    email: "",
    time: 10
  });

  const [alerts, setAlerts] = useState([]);

  async function getAllAlerts() {
    const alerts = await getAlerts();
    alerts.reverse();
    setAlerts(alerts);
  }

  async function addAlert(payload) {
    const newAlert = await createAlert(payload);
    getAllAlerts();
    const product = await getEbayProductByKeyword(payload.search);
    console.log(product);
    return newAlert;
  }

  useEffect(() => {
    getAllAlerts();
  }, []);

  return (
    <AlertProvider value={{ alert, setAlert, alerts }}>
      <div className="App">
        <Layout className="layout">
          <Header />
          <Content style={{ padding: "0 50px" }}>
            <StyledHeader>Create an alert</StyledHeader>
            <Paper>
              <Search addAlert={addAlert} />
            </Paper>
            <Alerts />
          </Content>
          <Footer />
        </Layout>
      </div>
    </AlertProvider>
  );
}

export default App;
