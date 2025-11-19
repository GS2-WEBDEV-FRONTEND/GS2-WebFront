import { useEffect } from "react"
import PerfilProfissional from "./components/PerfilProfissional"
import Desafios from "./components/Desafios"

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  const rota = window.location.pathname

  return (
    <div>
      {rota === "/desafios" ? <Desafios /> : <PerfilProfissional />}
    </div>
  )
}

export default App
