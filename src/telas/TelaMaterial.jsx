import FormMaterial from "../forms/FormMaterial";
import Pagina from "../templates/pagina";
import TabelaMaterial from "../tabelas/TabelaMaterial";
import { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { urlBase} from "../utilitarios/definicoes";


export default function TelaMaterial(props) {
  const [exibirTabela, setExibirTabela] = useState(true);
  const [materiais, setMateriais] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [usuarioEdicao, setUsuarioEdicao] = useState({
    id:"",
    item: "",
    
    
  });

  function prepararTela(material) {
    setModoEdicao(true);
    setUsuarioEdicao(material);
    setExibirTabela(false);
  }

  // function excluir(material){

  //     fetch(urlBase + '/materiais',{
  //         method: "DELETE",
  //         headers: {
  //             "Content-Type":"application/json"
  //         },
  //         body: JSON.stringify(material)
  //     })
  //     .then((resposta) =>{
  //         window.location.reload()
  //         return resposta.json()
  //     })

  // }

  function deletarUsuario(material) {
    fetch(urlBase, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(material),
    })
      .then((resposta) => {
        window.alert("O item selecionado foi deletado com sucesso!");
        return resposta.json();
      })
      .then(window.location.reload());
  }

  useEffect(() => {
    if(exibirTabela){
      fetch(urlBase, {
        method: "GET",
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((dados) => {
          if (Array.isArray(dados)) {
            setMateriais(dados);
          } 
        });      
    }
  }, [exibirTabela]);



  return (
    <Pagina>
      <Container className="border">
        <Alert variant="success" className="text-center">
          Registro de materiais para doação!
        </Alert>
        {exibirTabela ? (
          <TabelaMaterial
            listaMateriais={materiais}
            setMateriais={setMateriais}
            exibirTabela={setExibirTabela}
            editar={prepararTela}
            deletar={deletarUsuario}
          />
        ) : (
          <div>
           
            <FormMaterial
              listaMateriais={materiais}
              exibirTabela={setExibirTabela}
              setMateriais={setMateriais}
              editar={prepararTela}
              modoEdicao={modoEdicao}
              setModoEdicao={setModoEdicao}
              material={usuarioEdicao}
            />
          </div>
        )}
      </Container>
    </Pagina>
  );
}
