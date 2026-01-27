

export const validatePassword = (password: string): { isValid: boolean; message: string } => {
    if (password.length < 8) {
        return { isValid: false, message: 'Пароль должен содержать не менее 8 символов' };
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !@#$%^&*(),.?":{}|<>]).+$/;

    if (!passwordRegex.test(password)) {
        return { 
            isValid: false, 
            message: 'Пароль должен содержать заглавные и строчные буквы, цифры, специальные символы или пробелы' 
        };
    }

    return { isValid: true, message: '' };
};
