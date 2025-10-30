export class Result<T, E extends Error> {
  private constructor(
    public readonly success: boolean,
    public readonly value?: T,
    public readonly error?: E,
  ) {}

  public static success<T, E extends Error>(value: T): Result<T, E> {
    return new Result(true, value);
  }

  public static failure<T, E extends Error>(error: E): Result<T, E> {
    return new Result(false, undefined, error);
  }

  public isSuccess(): this is { success: true; value: T } {
    return this.success;
  }

  public isFailure(): this is { success: false; error: E } {
    return !this.success;
  }

  public static combine<T, E extends Error>(
    results: Result<T, E>[],
  ): Result<T[], E> {
    const errors = results
      .filter((r) => r.isFailure())
      .map((r) => r.error as E);
    if (errors.length > 0) {
      return this.failure(errors[0]);
    }
    const values = results.map((r) => r.value as T);
    return this.success(values);
  }

  public static map<T, U, E extends Error>(
    result: Result<T, E>,
    f: (value: T) => U,
  ): Result<U, E> {
    if (result.isSuccess()) {
      return this.success(f(result.value));
    }
    return result;
  }
}

export const success = <T, E extends Error>(value: T): Result<T, E> =>
  Result.success(value);

export const failure = <T, E extends Error>(error: E): Result<T, E> =>
  Result.failure(error);
