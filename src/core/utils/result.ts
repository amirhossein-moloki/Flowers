export type Result<T, E extends Error> =
  | { success: true; value: T }
  | { success: false; error: E };

export const success = <T, E extends Error>(value: T): Result<T, E> => ({
  success: true,
  value,
});

export const failure = <T, E extends Error>(error: E): Result<T, E> => ({
  success: false,
  error,
});