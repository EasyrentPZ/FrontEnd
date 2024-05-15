export interface RegistrationForm {
    username: string;
    password: string;
    confirmPassword: string; // Ensuring type safety by using string instead of any
    name: string;
    lastname: string;
}
