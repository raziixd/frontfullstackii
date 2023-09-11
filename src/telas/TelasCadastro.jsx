import FormUsuarios from "../forms/FormUsuario";
import Pagina from "../templates/pagina";
import TabelaUsuarios from "../tabelas/TabelaUsuarios";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase2, urlBase3 } from "../utilitarios/definicoes";
import BarraBusca from "../forms/BarraBusca";

export default function TelaCadastro(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    nome: "",
    cpf: "",
    dataNasc: "",
    email: "",
    tel: "",
    sexo: "",
    cidade: "",
    uf: "",
    treinador: "",
    jogador: "",
  });

  function prepararTela(usuario) {
    setModoEdicao(true);
    setUsuarioEdicao(usuario);
    setExibirTabela(false);
  }

  // function excluir(usuario){

  //     fetch(urlBase + '/usuarios',{
  //         method: "DELETE",
  //         headers: {
  //             "Content-Type":"application/json"
  //         },
  //         body: JSON.stringify(usuario)
  //     })
  //     .then((resposta) =>{
  //         window.location.reload()
  //         return resposta.json()
  //     })

  // }

  function deletarUsuario(usuario) {
    fetch(urlBase3, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    })
      .then((resposta) => {
        window.alert("O usuário selecionado foi deletado com sucesso!");
        return resposta.json();
      })
      .then(window.location.reload());
  }

  useEffect(() => {
    fetch(urlBase3, {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setUsuarios(dados);
        } else {
        }
      });
  }, []);



  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
          Cadastro de Jogadores
        </Alert>
        {exibirTabela ? (
          <TabelaUsuarios
            listaUsuarios={usuarios}
            setUsuarios={setUsuarios}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarUsuario}
          />
        ) : (
          <div>
            {/* <BarraBusca
              placeHolder={"Informe sua busca"}
              dados={setListaDoacao}
              campoChave={"cpf"}
              campoBusca={ListaDoacao}
              funcaoSelecao={setDoacaoSelecionado}
              valor={doacaoSelecionado}
            /> */}
            <FormUsuarios
              listaUsuarios={usuarios}
              exibirTabela={setExibirTabela}
              setUsuarios={setUsuarios}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              usuario={usuarioEdicao}
            />
          </div>
        )}
      </Container>
    </Pagina>
  );
}
