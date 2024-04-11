import { useState } from "react";
import Graph from "./components/Graph";
import { bisectionMethod } from "./scripts";
import { evaluate } from "mathjs";

function App() {
  const [expression, setExpression] = useState("");
  const [root, setRoot] = useState(null);
  const [error, setError] = useState("");
  const [showGraph, setShowGraph] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowGraph(false);
    setError("");

    // Reemplaza 'x' con el valor y 'evalúa' la expresión.
    const f = (x) => {
      try {
        // Reemplazar '^' por '**' para que mathjs pueda entenderlo.
        const cleanedExpression = expression.replace(/\^/g, "**");
        return evaluate(cleanedExpression, { x });
      } catch (e) {
        setError(`Error al evaluar la expresión: ${e.message}`);
        return null;
      }
    };

    // Asegúrate de que los extremos del intervalo tienen signos opuestos
    if (f(0) * f(1) >= 0) {
      setError(
        "La función debe tener signos opuestos en los extremos del intervalo [a, b]."
      );
      return;
    }

    try {
      // Llama al método de bisección para encontrar la raíz
      const a = 0; // Definir el inicio del intervalo
      const b = 1; // Definir el final del intervalo
      const tol = 0.01; // La tolerancia para el método de bisección

      const rootFound = bisectionMethod(f, a, b, tol);
      setRoot(rootFound);
      setShowGraph(true);
    } catch (e) {
      setError(`Error en el método de bisección: ${e.message}`);
    }
  };

  return (
    <div className="bg-neutral-900 w-screen h-screen font-ubuntu text-white ">
      <div className="w-full flex justify-center py-12">
        <h1 className="font-archivo-black text-3xl ">MÉTODOS NUMÉRICOS</h1>
      </div>
      <div className="w-full flex justify-center py-8">
        {error && <p>Error: {error}</p>}
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <label htmlFor="formula" className="block mb-2">
            Ingresa la fórmula:
          </label>
          <input
            type="text"
            id="formula"
            value={expression}
            onChange={(e) => setExpression(e.target.value.replace(/\^/g, "**"))}
            className="rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
          >
            Resultado
          </button>
        </form>
        {showGraph && <Graph expression={expression} root={root} />}
      </div>
    </div>
  );
}

export default App;
