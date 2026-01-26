import React from 'react';
import { Snackbar } from 'react-native-paper';

interface ToastProps {
    message: string | null;
    isVisible: boolean;
    onDismiss: () => void;
}

export const ErrorToast: React.FC<ToastProps> = ({ message, isVisible, onDismiss }) => {
    return (
        <Snackbar
            visible={isVisible}
            onDismiss={onDismiss}
            duration={5000}
            action={{
                label: 'Закрыть',
                onPress: onDismiss,
            }}
            style={{ backgroundColor: 'red'}}
        >
            {message}
        </Snackbar>
    );
};
export default ErrorToast