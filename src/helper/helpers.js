export const getAgeString = (age) => {
    console.log(age);
    const years = Math.floor(age);
    const months = Math.round(Number((age - Math.floor(age)).toFixed(2)) * 12);
    let weeks = 0;

    let yearString = '';
    let monthString = '';

    if (years === 1) {
        yearString = `${years} year`;
    } else if (years > 1) {
        yearString = `${years} years`;
    }

    if (months === 1) {
        monthString = `${months} month`;
    } else if (months > 1) {
        monthString = `${months} months`;
    }

    // edge case
    if (months === 0 && years === 0) {
        weeks = Math.round(Number((age - Math.floor(age)).toFixed(2)) * 12 * 4);
        if (weeks === 0) {
            return '1 week old';
        } else {
            return `${weeks} weeks old`;
        }
    }

    return `${yearString} ${monthString} old`;
};
