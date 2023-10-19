import TelaCadastro from "./telas/TelasCadastro";
import TelaMenu from "./telas/TelaMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tela404 from "./telas/tela404";
import TelaDoacao from "./telas/TelaDoacao";
import TelaMaterial from "./telas/TelaMaterial";
import TelaDoacaoMaterial from "./telas/TelaDoacaoMaterial";
// import Home from "./home";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/frontfullstackii/FormUsuario" element={<TelaCadastro />} />
          <Route path="/frontfullstackii/FormDoacao" element={<TelaDoacao />} />
          <Route path="/frontfullstackii/FormMaterial" element={<TelaMaterial />} />
          <Route path="/frontfullstackii/FormDoacaoMaterial" element={<TelaDoacaoMaterial />} />
          <Route path="/frontfullstackii/" element={<TelaMenu />} />
          <Route path="*" element={<Tela404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
