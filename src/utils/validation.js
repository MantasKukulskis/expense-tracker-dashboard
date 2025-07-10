export function validateTransaction({ description, amount, date }) {
    const errors = {};

    if (!description || description.trim() === "") {
        errors.description = "Description is required";
    }

    if (!amount || isNaN(amount)) {
        errors.amount = "Amount must be a number";
    } else if (parseFloat(amount) <= 0) {
        errors.amount = "Amount must be greater than 0";
    }

    if (!date) {
        errors.date = "Date is required";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export function validatePassword(password) {
    const errors = [];

    if (!password) {
        errors.push("Password is required");
    }

    if (password && password.length < 8) {
        errors.push("Password must be at least 8 characters");
    }

    if (password && !/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (password && !/[0-9]/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    if (password && /[^a-zA-Z0-9]/.test(password)) {
        errors.push("Password can only contain letters and numbers");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function validateEmail(email) {
    const errors = [];

    if (!email) {
        errors.push("Email is required");
    } else if (!email.includes("@")) {
        errors.push("Email must contain '@' symbol");
    } else if (!/\.[a-z]{2,}$/.test(email)) {
        errors.push("Email must end with a valid domain");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}