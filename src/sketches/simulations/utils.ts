export function timeExecution(fn: Function): number {
    const executionStart = window.performance.now();
    fn();
    return window.performance.now() - executionStart;
}