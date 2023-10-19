import FormDoacaoMaterial from "../forms/FormDoacaoMaterial";
import Pagina from "../templates/pagina";
import TabelaDoacaoMaterial from "../tabelas/TabelaDoacaoMaterial";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase4} from "../utilitarios/definicoes";


export default function TelaDoacaoMaterial(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [materialdoacoes, setMaterialDoacoes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [materialdoacoesEdicao, setMaterialDoacoesEdicao] = useState({
    doacaoID: "",
    materialID: "",
    quantidade: "",
  });

  function prepararTela(doacaomaterial) {
    setModoEdicao(true);
    setMaterialDoacoesEdicao(doacaomaterial);
    setExibirTabela(false);
  }

  // function excluir(doacaomaterial){

  //     fetch(urlBase + '/materialdoacoes',{
  //         method: "DELETE",
  //         headers: {
  //             "Content-Type":"application/json"
  //         },
  //         body: JSON.stringify(doacaomaterial)
  //     })
  //     .then((resposta) =>{
  //         window.location.reload()
  //         return resposta.json()
  //     })

  // }

  function deletarUsuario(doacaomaterial) {
    fetch(urlBase4, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doacaomaterial),
    })
      .then((resposta) => {
        window.alert("O item selecionado foi deletado com sucesso!");
        return resposta.json();
      })
      .then(window.location.reload());
  }

  useEffect(() => {
    fetch(urlBase4, {
      method: "GET",
    })
      .then((resposta) => {
        return resposta.json();
      })
      .then((dados) => {
        if (Array.isArray(dados)) {
          setMaterialDoacoes(dados);
        } else {
        }
      });
  }, []);



  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
          Adicione items a sua doação!
        </Alert>
        {exibirTabela ? (
          <TabelaDoacaoMaterial
            listaDoacoesMateriais={materialdoacoes}
            setMaterialDoacoes={setMaterialDoacoes}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarUsuario}
          />
        ) : (
          <div>
           
            <FormDoacaoMaterial
              listaDoacoesMateriais={materialdoacoes}
              exibirTabela={setExibirTabela}
              setMaterialDoacoes={setMaterialDoacoes}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              doacaomaterial={materialdoacoesEdicao}
            />
          </div>
        )}
      </Container>
    </Pagina>
  );
}
