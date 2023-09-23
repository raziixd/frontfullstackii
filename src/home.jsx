import axios from 'axios'
import React, { useEffect, useState } from "react";
import { urlBase3 } from './utilitarios/definicoes';

function Home() {
    const [data, setData] = useState([])
    const [records, setRecords] = useState([])
  useEffect(() => {
    // axios.get("https://129.146.68.51/aluno19-pfsii/usuarios")
    axios.get(urlBase3)
    .then(res => {
        setData(res.data)
        setRecords(res.data);
    })
    .catch(err => console.log(err));
  }, []);
  const Filter = (event) => {
        setRecords(data.filter(f => f.nome.toLowerCase().includes(event.target.value)))
  }
  return (
    <div className='p-5 bg-light'>
        <div className= 'bg-white shadow border'>
            <input type="text" className='form-control' onChange={Filter} placeholder='Usuários cadastrados'/>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                    </tr>
                </thead>
                <tbody >
                    {records.map((d,i) => (
                        <tr key={i}>
                            <td>{d.nome}</td>
                            <td>{d.cpf}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    </div>
    );
}

export default Home;
