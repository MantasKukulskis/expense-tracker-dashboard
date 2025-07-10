import i18n from "i18next";

export function validateTransaction({ description, amount, date }) {
    const errors = {};

    if (!description || description.trim() === "") {
        errors.description = i18n.t("descriptionRequired");
    }

    if (!amount || isNaN(amount)) {
        errors.amount = i18n.t("amountMustBeNumber");
    } else if (parseFloat(amount) <= 0) {
        errors.amount = i18n.t("amountGreaterThanZero");
    }

    if (!date) {
        errors.date = i18n.t("dateRequired");
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export function validatePassword(password) {
    const errors = [];

    if (!password) {
        errors.push(i18n.t("passwordRequired"));
    }

    if (password && password.length < 8) {
        errors.push(i18n.t("passwordLength"));
    }

    if (password && !/[A-Z]/.test(password)) {
        errors.push(i18n.t("passwordUppercase"));
    }

    if (password && !/[0-9]/.test(password)) {
        errors.push(i18n.t("passwordNumber"));
    }

    if (password && /[^a-zA-Z0-9]/.test(password)) {
        errors.push(i18n.t("passwordNoSymbols"));
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}

export function validateEmail(email) {
    const errors = [];

    if (!email) {
        errors.push(i18n.t("emailRequired"));
    } else if (!email.includes("@")) {
        errors.push(i18n.t("emailMustContainAt"));
    } else if (!/\.[a-z]{2,}$/.test(email)) {
        errors.push(i18n.t("emailValidDomain"));
    }

    return {
        isValid: errors.length === 0,
        errors
    };
}