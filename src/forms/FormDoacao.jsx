import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { urlBase2, urlBase3 } from "../utilitarios/definicoes";
import { IMaskInput } from "react-imask";
import BarraBusca from "./BarraBusca";
// import Home from "../home";

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
          window.alert("A doacao foi registrada no banco de dados!");
          props.exibirTabela(true);
          return resposta.json();
        });
      } else {
        dadosEnvio.id = doacao.id;
        fetch(urlBase2, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("A doacao foi atualizada no banco de dados!");
          props.exibirTabela(true);
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
      try {
        const response = await fetch(urlBase3, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data from API:", data);
        setListaUsuarios(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Form noValidate validated={validado} onSubmit={manipulaSumissao}>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Doador:</Form.Label>
            {/* <Home/> */}
            <BarraBusca
              placeHolder={"Informe o Doador"}
              dados={listaUsuarios}
              campoChave={"cpf"}
              campoBusca={"nome"}
              funcaoSelecao={(usuarioSelecionado) => {
                setUsuarioSelecionado(usuarioSelecionado);
                setDoacao({ ...doacao, usuario: usuarioSelecionado });
              }}
              valor={""}
            />
            {/* {console.log(listaUsuarios)} */}
            <Form.Control.Feedback type="invalid">
              Por favor, insira o Usuário!
            </Form.Control.Feedback>
            <Form.Control
              type="text"
              placeholder="Nome do Usuário"
              value={usuarioSelecionado?.nome || ""}
              onChange={(e) => {}}
            />
            <Form.Control
              type="text"
              placeholder="CPF do Usuário"
              value={usuarioSelecionado?.cpf || ""}
              onChange={(e) => {}}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <h6>Somente valores inteiros!</h6>
              <Form.Control
                type="int"
                as={IMaskInput}
                mask="R$ 000000000"
                placeholder="R$ 100"
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
