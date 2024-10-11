import React, { createContext, useState } from 'react';

interface FormState {
    databaseType: string;
    host: string;
    port: number | '';
    databaseName: string;
    userName: string;
    password: string;
    sid?: string;
    instance?: string;
}

interface FormStateContextProps {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
}

export const FormStateContext = createContext<FormStateContextProps | undefined>(undefined);

export const FormStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [formState, setFormState] = useState<FormState>({
        databaseType: '',
        host: 'localhost',
        port: '',
        databaseName: '',
        userName: '',
        password: '',
        sid: '',
        instance: '',
    });

    return (
        <FormStateContext.Provider value={{ formState, setFormState }}>
            {children}
        </FormStateContext.Provider>
    );
};