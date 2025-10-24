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

export namespace Result {
  export const combine = <T, E extends Error>(results: Result<T, E>[]): Result<T[], E> => {
    const errors = results.filter((r) => !r.success).map((r) => (r as { success: false; error: E }).error);
    if (errors.length > 0) {
      return failure(errors[0]);
    }
    const values = results.map((r) => (r as { success: true; value: T }).value);
    return success(values);
  };

  export const map = <T, U, E extends Error>(result: Result<T, E>, f: (value: T) => U): Result<U, E> => {
    if (result.success) {
      return success(f(result.value));
    }
    return result;
  };
}