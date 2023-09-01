import FormDoacao from "../forms/FormDoacao";
import Pagina from "../templates/pagina";
import TabelaDoacao from "../tabelas/TabelaDoacao";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase3, urlBase2} from "../utilitarios/definicoes";
import BarraBusca from "../forms/BarraBusca";

export default function TelaCadastro(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [doacoes, setDoacoes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    valorDoado: "",
    itemDoado: "",
    nome: "",
  });

  function prepararTela(doacao) {
    setModoEdicao(true);
    setUsuarioEdicao(doacao);
    setExibirTabela(false);
  }

  // function excluir(doacao){

  //     fetch(urlBase + '/doacoes',{
  //         method: "DELETE",
  //         headers: {
  //             "Content-Type":"application/json"
  //         },
  //         body: JSON.stringify(doacao)
  //     })
  //     .then((resposta) =>{
  //         window.location.reload()
  //         return resposta.json()
  //     })

  // }

  function deletarUsuario(doacao) {
    fetch(urlBase2, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doacao),
    })
      .then((resposta) => {
        window.alert("O item selecionado foi deletado com sucesso!");
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
          setDoacoes(dados);
        } else {
        }
      });
  }, []);

  const [doacaoSelecionado, setDoacaoSelecionado] = useState({});
  const [ListaDoacao, setListaDoacao] = useState([]);

  useEffect(() => {
    fetch(urlBase3)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setListaDoacao(dados);
      });
  }, []);

  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
          Faça uma doação
        </Alert>
        {exibirTabela ? (
          <TabelaDoacao
            listaDoacoes={doacoes}
            setDoacoes={setDoacoes}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarUsuario}
          />
        ) : (
          <div>
            <BarraBusca
              placeHolder={"Informe sua busca"}
              dados={setListaDoacao}
              campoChave={"cpf"}
              campoBusca={"nome"}
              funcaoSelecao={setDoacaoSelecionado}
              valor={""}
            />
            <FormDoacao
              listaDoacoes={doacoes}
              exibirTabela={setExibirTabela}
              setDoacoes={setDoacoes}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              doacao={usuarioEdicao}
            />
          </div>
        )}
      </Container>
    </Pagina>
  );
}
