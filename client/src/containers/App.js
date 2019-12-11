import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import styled from "styled-components";

import { AlertProvider } from "../contexts/AlertContext";
import {
  getAlerts,
  createAlert,
  deleteAlert as deleteAlertApi,
  getEbayProductByKeyword,
  sendEmail
} from "../api";
import { Search, Header, Footer, Alerts } from "../components";

const { Content } = Layout;

const Paper = styled.div`
  background: #fff;
  padding: 24px;
  min-height: 280;
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
  const [intervals, setIntervals] = useState([]);

  /**
   * Get all alerts
   */
  async function getAllAlerts() {
    const alerts = await getAlerts();
    alerts.reverse();
    setAlerts(alerts);
    return alerts;
  }

  /**
   * Create an alert
   * @param {*} payload
   */
  async function addAlert(payload) {
    const newAlert = await createAlert(payload);
    getAllAlerts();
    return newAlert;
  }

  /**
   * Delete an alert by id
   * @param {*} id
   */
  async function deleteAlert(id) {
    deleteAlertApi({ id });
    const filteredAlerts = alerts.filter(alert => alert._id !== id);
    setAlerts(filteredAlerts);
  }

  /**
   * Send the alert E-mail
   * @param {Array} payload
   */
  async function sendAlertEmail(payload) {
    const products = await getEbayProductByKeyword(payload.search);
    if (products.length) {
      const lastProducts = getLastItems(products);
      const sortedProducts = sortByPrice(lastProducts);
      const text = createEmailBody(sortedProducts);
      const emailPayload = {
        from: "challengerankmyapp@gmail.com",
        to: payload.email,
        subject: `Ebay Alert | ${payload.search}`,
        text
      };
      sendEmail(emailPayload);
    }
  }

  /**
   * Create the email body
   * @param {Array} products
   */
  function createEmailBody(products) {
    let email = "";
    for (let product of products) {
      console.log(product);
      const price = product.sellingStatus[0].currentPrice[0];
      email += `
      Product: ${product.title[0]}
      Price: ${price["@currencyId"]} ${price.__value__}
      ----------
      `;
    }
    return email;
  }

  /**
   * Sort array by price
   * @param {Array} products
   */
  const sortByPrice = products =>
    products.sort((a, b) => {
      const price1 = a.sellingStatus[0].currentPrice[0].__value__;
      const price2 = b.sellingStatus[0].currentPrice[0].__value__;
      return price1 - price2;
    });

  /**
   * Get the last 3 items from an array
   * @param {Array} products
   */
  const getLastItems = products => products.slice(0, 3);


  /**
   * Call a function with intervals for each item of an array
   * @param {Array} arr
   * @param {Function} fn 
   * @param {Number} time 
   */
  function interval(arr, fn, time) {
    let intervalsArr = [];
    for (const interval of intervals) {
      clearInterval(interval);
    }

    for (const item of arr) {
      const minutes = (item.time || time) * 60 * 1000;
      const interval = setInterval(() => {
        fn(item);
      }, minutes);
      intervalsArr.push(interval);
      setIntervals(intervalsArr);
    }
  }

  useEffect(() => {
    getAllAlerts();
  }, []);

  useEffect(() => {
    if (alerts) {
      interval(alerts, sendAlertEmail);
      // timeFunction();
    }
  }, [alerts]);

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
            <Alerts deleteAlert={deleteAlert} />
          </Content>
          <Footer />
        </Layout>
      </div>
    </AlertProvider>
  );
}

export default App;
