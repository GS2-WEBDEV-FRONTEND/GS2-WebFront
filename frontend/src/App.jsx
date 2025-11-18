// src//App.jsx
import { useEffect } from "react";
import PerfilProfissional from "./components/PerfilProfissional";

function App() {

  // Garante que o dark mode fica ativo sempre
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased">
      <PerfilProfissional />
    </div>
  );
}

export default App;
