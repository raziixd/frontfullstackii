import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { urlBase2, urlBase3 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca";
import Home from "../home";

export default function FormDoacao(props) {
  const [validado, setValidado] = useState(false);
  const [doacao, setDoacao] = useState(props.doacao);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setDoacao({ ...doacao, [id]: valor });
  }

  function manipulaSumissao(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const usuario = {
        cpf: usuarioSelecionado.cpf,
        nome: usuarioSelecionado.nome,
      };
      const dadosEnvio = {
        itemDoado: doacao.itemDoado,
        valorDoado: doacao.valorDoado,
        cpf: doacao.cpfUsuario,
        usuario: usuario,
      };
      if (!props.modoEdicao) {
        fetch(urlBase2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("A doacao foi registrado no banco de dados!");
          window.location.reload();
          return resposta.json();
        });
      } else {
        dadosEnvio.codigo = doacao.codigo
        fetch(urlBase2, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("A doacao foi atualizado no banco de dados!");
          window.location.reload();
          return resposta.json();
        });
      }
      setValidado(false);
    } else {
      setValidado(true);
    }
    evento.preventDefault();
    evento.stopPropagation();
  }

  const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {

    const fetchData = async () => {

        const response = await fetch("https://129.146.68.51/aluno19-pfsii/usuarios", {method:"GET"});
        const data = await response.json();
        setListaUsuarios(data)

        console.log(data)
    }
    fetchData()
    
}, []);
    
  
  return (
    <Container>
      <Form noValidate validated={validado} onSubmit={manipulaSumissao}>
        <Row>
        <Form.Group className="mb-3">
            <Form.Label>Usuário:</Form.Label>
            {/* <Home/> */}
            <BarraBusca
              placeHolder={"Informe um Usuário"}
              dados={listaUsuarios}              
              campoChave={"cpf"}
              campoBusca={"nome"}
              funcaoSelecao={(usuarioSelecionado) =>{
                  setUsuarioSelecionado(usuarioSelecionado);
                  setDoacao({...doacao, usuario : usuarioSelecionado})
              }}
              valor={""}
              />
              {console.log(listaUsuarios)}
            <Form.Control.Feedback type="invalid">
              Por favor, insira o Usuário!
            </Form.Control.Feedback>
          </Form.Group>

          <Col>
            <Form.Group className= "mb-3" controlId="itemDoado">
              <Form.Label>Item a ser Doado</Form.Label>
              <Form.Control
                placeholder="Bola de capotão"
                value={doacao.itemDoado}
                id="itemDoado"
                onChange={manipularMudanca}
                
              />
              {(inputProps) => <Form.Control {...inputProps} />}

              <Form.Control.Feedback type="invalid">
                Por favor, informe o item!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="valorDoado">
              <Form.Label>Valor a ser doado</Form.Label>
              <Form.Control
                type="int"
                placeholder="R$ 100,00"
                value={doacao.valorDoado}
                id="valorDoado"
                onChange={manipularMudanca}
                
              />
              <Form.Control.Feedback type="invalid">
                Por getileza, informe o valor da doação!
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={2}>
            <Button type="submit">Gravar</Button> {<p></p>}
            <Button
              type="button"
              onClick={() => {
                props.exibirTabela(true);
              }}
            >
              Voltar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
