export default function fetcher(state = { isLoading: false }, action) {
    switch (action.type) {
        case 'START_LOADING':
            return { isLoading: action.isLoading };
        case 'STOP_LOADING':
            return { isLoading: action.isLoading };
        default:
            return state;
    }
}
