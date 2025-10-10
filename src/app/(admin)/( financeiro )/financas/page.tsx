
"use client";
import { useState } from "react";


export default function FinancasPage() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h2 className="text-xl font-semibold">Área Financeira</h2>
      <p className="mt-2 text-gray-600">Somente usuários com função "financeiro" podem acessar.</p>
      <p> essa parte deve conter tudo relacionado a transições </p>
      return <button onClick={() => setCount(count + 1)}>Cliquei {count} vezes</button>;
    </div>



  );
}
