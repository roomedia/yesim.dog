export const makeDebouncer = (handler: () => void, timeout: number = 750) => {
    let timer: number | undefined;
    return () => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(handler, timeout);
    }
}
