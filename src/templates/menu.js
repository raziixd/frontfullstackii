import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Menu(props){

    return (
        <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to ="/frontfullstackii"><Navbar.Brand>Inicio</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              
              <LinkContainer to="/frontfullstackii/FormUsuario"><NavDropdown.Item>Usuario</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/frontfullstackii/FormDoacao"><NavDropdown.Item>Doações</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/frontfullstackii/FormMaterial"><NavDropdown.Item>Cadastro de Materiais</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/frontfullstackii/FormDoacaoMaterial"><NavDropdown.Item>Adicionar material para doação</NavDropdown.Item></LinkContainer>
              <NavDropdown.Divider />
             
              
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/frontfullstackii"> Sair</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}