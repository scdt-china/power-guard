import { GuardFunction, Optional } from '../global';
import PowerGuardError from '../error';

function guardArray<T>(elemGuard: GuardFunction<T>): (x: unknown) => Array<T>;
function guardArray<T>(
  elemGuard: GuardFunction<T>,
  optional: true,
): (x: unknown) => Optional<Array<T>>;
function guardArray<T>(
  elemGuard: GuardFunction<T>,
  optional = false,
): (x: unknown) => Optional<Array<T>> {
  return (x) => {
    if (optional && !x) {
      return undefined;
    }

    if (!Array.isArray(x)) {
      throw new PowerGuardError('array', x, optional);
    }

    return x.map((el) => elemGuard(el));
  };
}

export default guardArray;
