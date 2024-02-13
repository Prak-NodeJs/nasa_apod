const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const isValidDate = (date: string): boolean => {
    return DATE_REGEX.test(date);
};