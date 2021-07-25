export const getAgeString = (age) => {
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

export  const getUserFromToken = () => {
    if (window.localStorage['jwtToken']) {
        let token = window.localStorage['jwtToken'];
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let userJson = JSON.parse(window.atob(base64));
        // if token is expired delete it and return { isAuthenticated: false }
        // --> User is not logged in anymore.
        const expirationTime = (userJson.exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            window.localStorage.removeItem('jwtToken');
            return { isAuthenticated: false };
        }
        return {
            isAuthenticated: true,
            user: {
                id: userJson._id,
                username: userJson.username,
                role: userJson.role,
            },
        };
    }
    return {};
};

export const isObjEmpty = (obj) => obj === undefined || obj === null || Object.keys(obj).length === 0;

export const showPremiumBanner = (loggedInUser) => !loggedInUser || (loggedInUser.subscriptionPlan === 'free' && loggedInUser.role !== 'admin');
