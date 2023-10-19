import {  useState } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { urlBase } from "../utilitarios/definicoes";

export default function FormMaterial(props) {
  const [validado, setValidado] = useState(false);
  const [material, setMaterial] = useState(props.material);
  // useEffect(() => {
  //   // if (props.material) {
  //   //   setMaterial(props.material);
  //   // }
  //   console.log(props.material)
  // }, [props.material]);


  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setMaterial({ ...material, [id]: valor });
  }

  function manipulaSumissao(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      const dadosEnvio = {
        id: material.id,
        item: material.item,
      };
      if (!props.modoEdicao) {
        fetch(urlBase, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("O material foi registrado no banco de dados!");
          props.exibirTabela(true);
          return resposta.json();
        });
      } else {
        dadosEnvio.id = material.id;
        fetch(urlBase, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert(
            "A doação dos materiais foi atualizada no banco de dados!"
          );
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

  return (
    <Container>
      <Form noValidate validated={validado} onSubmit={manipulaSumissao}>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>ID Material</Form.Label>
            <Form.Control
              required
              type="int"
              placeholder="Gerado automaticamente"
              disabled
              id="id"
              onChange={manipularMudanca}
            />
          </Form.Group>

          <Col>
            <Form.Group className="mb-3"></Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Nome Material</Form.Label>
              <Form.Control
                type="text"
                placeholder="Material a ser cadastrado"
                value={material.item}
                id="item"
                onChange={manipularMudanca}
              />
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
