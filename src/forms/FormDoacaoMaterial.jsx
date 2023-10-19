import { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { urlBase, urlBase2, urlBase4 } from "../utilitarios/definicoes";
import BarraBusca from "./BarraBusca";
// import Home from "../home";

export default function FormDoacaoMaterial(props) {
  const [validado, setValidado] = useState(false);
  const [materialdoacao, setMaterialDoacao] = useState(props.doacaomaterial);

useEffect(()=>{
  console.log(props.doacaomaterial)
},[props.doacaomaterial])

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setMaterialDoacao({ ...materialdoacao, [id]: valor });
  }

  function manipulaSumissao(evento) {
    const form = evento.currentTarget;

    if (form.checkValidity()) {
      // const usuario = {
      //   cpf: usuarioSelecionado.cpf,
      //   nome: usuarioSelecionado.nome,
      // };
      const dadosEnvio = {
        doacao:{id: materialdoacao.doacao.id},
        material:{id: materialdoacao.material.id},
        // idDoacao: materialdoacao.doacao.id,
        // idMaterial: materialdoacao.material.id,
        quantidade: materialdoacao.quantidade,
        // usuario: usuario,
      };
      
      if (!props.modoEdicao) {
        fetch(urlBase4, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("A doação dos materiais foi registrada no banco de dados!");
          window.location.reload();
          return resposta.json();
        });
      } else {
        dadosEnvio.id = materialdoacao.id;
        fetch(urlBase4, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosEnvio),
        }).then((resposta) => {
          window.alert("A doação dos materiais foi atualizada no banco de dados!");
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

  // const [usuarioSelecionado, setUsuarioSelecionado] = useState({});
  // const [listaUsuarios, setListaUsuarios] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(urlBase3, { method: "GET" });
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();
  //       console.log("Data from API:", data);
  //       setListaUsuarios(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);


  const [doacaoSelecionado, setDoacaoSelecionado] = useState({});
  const [listaDoacoes, setListaDoacoes] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlBase2, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data from API:", data);
        setListaDoacoes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  const [materialSelecionado, setMaterialSelecionado] = useState({});
  const [listaMaterial, setListaMaterial] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(urlBase, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Data from API:", data);
        setListaMaterial(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  

  return (
    <Container>
      <Form noValidate validated={validado} onSubmit={manipulaSumissao}>
      <Col>
            <Form.Group className="mb-3" >
              {/* <Form.Label>Item a ser Doado</Form.Label>
              <Form.Control
                placeholder="Bola de capotão"
                value={doacao.item}
                id="item"
                onChange={manipularMudanca}
              />
              {(inputProps) => <Form.Control {...inputProps} />} */}

<Form.Label>ID da doação</Form.Label>
<BarraBusca
              placeHolder={"Informe a doação"}
              dados={listaDoacoes}
              campoChave={"id"}
              campoBusca={"valorDoado"}
              funcaoSelecao={(doacaoSelecionado) => {
                setDoacaoSelecionado(doacaoSelecionado);
                setMaterialDoacao({ ...materialdoacao, doacao : doacaoSelecionado });
              }}
              valor={""}> 
              
              </BarraBusca>
   
<Form.Label>ID do Material</Form.Label>
<BarraBusca
              placeHolder={"Informe o material"}
              dados={listaMaterial}
              campoChave={"id"}
              campoBusca={"item"}
              funcaoSelecao={(materialSelecionado) => {
                setMaterialSelecionado(materialSelecionado);
                setMaterialDoacao({ ...materialdoacao, material : materialSelecionado });
              }}
              valor={""}> 
              
</BarraBusca>

             
             
            </Form.Group>
          </Col>
        <Row>
          <Col>
            <Form.Group className="mb-3" >
              <Form.Label>Quantidade de itens</Form.Label>
              <Form.Control
                type="int"
                placeholder="10"
                value={materialdoacao.quantidade}
                id="quantidade"
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
