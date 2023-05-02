import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Root } from "./pages/Root/Root";
import { Home } from "./pages/Home/Home";
import { NovoCliente } from "./pages/NovoCliente/NovoCliente";
import { Clientes } from "./pages/Clientes/Clientes";
import { EditaCliente } from "./pages/EditaCliente/EditaCliente";
import { NovoPet } from "./pages/NovoPet/NovoPet";
import { Pets } from "./pages/Pets/Pets";
import { PetSingle } from "./pages/PetSingle/PetSingle";
import { AtualizarProduto } from "./pages/AtualizarProduto/AtualizarProduto";
<<<<<<< Updated upstream
import { EditaPet } from "./pages/EditaPet/EditaPet";
=======
import { Servicos } from "./pages/Servicos/Servicos";
import { NovoServico } from "./pages/Servicos/NovoServico";
import { EditaServicos } from "./pages/Servicos/EditarServico";

>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets/>} />
          <Route path="/pets/novo" element={<NovoPet/>} />
          <Route path="/pets/pet/:id" element={<PetSingle/>} />
          <Route path="/pets/editar/:id" element={<EditaPet/>} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/clientes/novo" element={<NovoCliente />} />
          <Route path="/clientes/editar/:id" element={<EditaCliente />} />
          <Route path="/produtos/atualizar/:id" element={<AtualizarProduto />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/servicos/novo" element={<NovoServico />} />
          <Route path="/servicos/editar/:id" element={<EditaServicos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
