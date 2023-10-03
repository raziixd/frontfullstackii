import FormMaterial from "../forms/FormMaterial";
import Pagina from "../templates/pagina";
import TabelaMaterial from "../tabelas/TabelaMaterial";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase} from "../utilitarios/definicoes";


export default function TelaMaterial(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [doacoes, setDoacoes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    id:"",
    item: "",
    qtd: "",
    
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
    fetch(urlBase, {
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
    fetch(urlBase, {
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



  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
          Registre itens para doação!
        </Alert>
        {exibirTabela ? (
          <TabelaMaterial
            listaDoacoes={doacoes}
            setDoacoes={setDoacoes}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarUsuario}
          />
        ) : (
          <div>
           
            <FormMaterial
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
