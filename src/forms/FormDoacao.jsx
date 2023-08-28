import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import {urlBase3} from "../utilitarios/definicoes";
import InputMask from 'react-input-mask';


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
            if (!props.modoEdicao) {
                fetch(urlBase3, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(doacao)
                }).then((resposta) => {
                    window.alert('A doacao foi registrado no banco de dados!')
                    window.location.reload();
                    return resposta.json();
                })
            }
            else {
                fetch(urlBase3, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(doacao)
                }).then((resp) => {
                    window.alert('A doacao foi atualizado no banco de dados!')
                    window.location.reload();
                    return resp.json();
                })
            }
            setValidado(false);
        }
        else {
            setValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();

    }
    return (
        <>
            <Form noValidate validated={validado} onSubmit={manipulaSumissao}>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="formNome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Insira o nome" value={doacao.nome} id="nome" onChange={manipularMudanca} required />
                            <Form.Control.Feedback type="invalid">
                                Por getileza, insira o nome!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="itemDoado">
                            <Form.Label>Item a ser Doado</Form.Label>
                            <InputMask
                                mask="Bola de capotão"
                                value={doacao.itemDoado}
                                id="itemDoado"
                                onChange={manipularMudanca}
                                required
                                
                            >
                                {(inputProps) => <Form.Control {...inputProps} />}
                            </InputMask>
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
                            <Form.Control type="int" placeholder="R$ 100,00" value={doacao.valorDoado} id="valorDoado" onChange={manipularMudanca} required />
                            <Form.Control.Feedback type="invalid">
                                Por getileza, informe o e-mail!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                
                <Row>
                    <Col md={2}>
                        <Button type="submit">Gravar</Button>
                        {' '}{<p></p>}
                        <Button type="button" onClick={() => {
                            props.exibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </>
    );
}