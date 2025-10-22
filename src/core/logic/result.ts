export type Result<T, E> = { success: true; value: T } | { success: false; error: E };

export const success = <T, E>(value: T): Result<T, E> => ({ success: true, value });

export const failure = <T, E>(error: E): Result<T, E> => ({ success: false, error });
