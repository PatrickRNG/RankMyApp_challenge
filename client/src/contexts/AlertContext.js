import { createContext } from 'react';

const AlertContext = createContext({});

export const AlertProvider = AlertContext.Provider;
export const AlertConsumer = AlertContext.Consumer;

export default AlertContext;