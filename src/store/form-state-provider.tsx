"use client";

import React, { createContext, useState, ReactNode, useCallback } from 'react';

interface ConnectionData {
    databaseType: string;
    host: string;
    port: number | '';
    databaseName: string;
    userName: string;
    password: string;
    sid?: string;
    instance?: string;
}

interface FormState {
    isConnected: boolean;
    connectionData: ConnectionData;
}

interface FormStateContextType extends FormState {
    setConnected: (connected: boolean, connectionData?: ConnectionData) => void;
}

export const FormStateContext = createContext<FormStateContextType | undefined>(undefined);

export const FormStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [connectionData, setConnectionData] = useState<ConnectionData>({
        databaseType: '',
        host: 'localhost',
        port: '',
        databaseName: '',
        userName: '',
        password: '',
        sid: '',
        instance: '',
    });

    const setConnected = useCallback((connected: boolean, data?: ConnectionData) => {
        setIsConnected(connected);
        if (connected && data) {
            setConnectionData(data);
        } else {
            setConnectionData({
                databaseType: '',
                host: 'localhost',
                port: '',
                databaseName: '',
                userName: '',
                password: '',
                sid: '',
                instance: '',
            });
        }
    }, []);

    return (
        <FormStateContext.Provider value={{ isConnected, connectionData, setConnected }}>
            {children}
        </FormStateContext.Provider>
    );
};
