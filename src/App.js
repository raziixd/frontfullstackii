import TelaCadastro from "./telas/TelasCadastro";
import TelaMenu from "./telas/TelaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tela404 from "./telas/tela404";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/FormUsuario" element={<TelaCadastro />} />
          <Route path="/Doacao" element={<TelaCadastro />} />
          <Route path="/" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
