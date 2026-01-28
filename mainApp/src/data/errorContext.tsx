import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ErrorToast } from 'uikit';

interface ErrorContextType {
    showError: (message: string) => void;
}

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const showError = (message: string) => {
        setErrorMessage(message);
        setIsVisible(true);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        setErrorMessage(null);
    };

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            <ErrorToast 
                message={errorMessage} 
                isVisible={isVisible} 
                onDismiss={handleDismiss} 
            />
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    return context;
};
