export function startLoading() {
    return { type: 'START_LOADING', isLoading: true };
}

export function stopLoading(u) {
    return { type: 'STOP_LOADING', isLoading: false };
}
