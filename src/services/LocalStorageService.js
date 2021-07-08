const LocalStorageService = {
    isAuthorized: () => localStorage.getItem('jwtToken') !== null,
    getToken: () => localStorage.getItem('jwtToken'),
    removeToken: () => localStorage.removeItem('jwtToken'),
    clear: () => localStorage.clear(),
}

export default LocalStorageService;