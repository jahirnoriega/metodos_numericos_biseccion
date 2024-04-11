export function bisectionMethod(f, a, b, tol = 0.01, maxIter = 100) {
  let c;
  let iter = 0;
  let fa = f(a);
  let fb = f(b);
  if (fa * fb >= 0) {
    throw new Error(
      "La función no tiene signos opuestos en los extremos del intervalo."
    );
  }

  do {
    c = (a + b) / 2; // Punto medio
    let fc = f(c);

    if (fa * fc < 0) {
      b = c;
      fb = fc;
    } else {
      a = c;
      fa = fc;
    }

    iter++;
  } while (Math.abs(a - b) > tol && iter < maxIter);
  console.log((a + b) / 2);
  return (a + b) / 2;
}
