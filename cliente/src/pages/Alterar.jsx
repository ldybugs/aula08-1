import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Alterar() {

    const { id } = useParams();
    const navigation = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [aniversario, setAniversario] = useState('');
    const [estilo, setEstilo] = useState('');
    const [cor, setCor] = useState('');

    useEffect(() => {
        const busca = async()=>{
            const resposta = await fetch('http://localhost:3000/usuarios/'+ id );
            const dados = await resposta.json();
            setNome(dados.nome);
            setEmail(dados.email);
            setTelefone(dados.telefone);
            setAniversario(dados.aniversario);
            setEstilo(dados.estilo);
            setCor(dados.cor);
        }
        busca();
    } ,[id]);

    const alterar = async(event) => {
        event.preventDefault();
        try{
            await fetch('http://localhost:3000/usuarios/'+ id, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        nome: nome,
                        email: email,
                        telefone: telefone,
                        aniversario: aniversario,
                        estilo: estilo,
                        cor: cor
                    })
                }
            );
            navigation('/');
        }catch{
            alert('Erro ao alterar');
        }
    }
    return (
     <main>
       <form onSubmit={alterar}>
        <input type="text" 
         id="" 
         value={nome}  
         placeholder="Nome"
         onChange={(event) => setNome(event.target.value)}/> <br/>

  <input type="email" 
         id="" 
         value={email}
         placeholder="E-mail"
         onChange={(event) => setEmail(event.target.value)}/> <br/>

  <input type="number" 
         id="" 
         value={telefone}  
         placeholder="Telefone"
         onChange={(event) => setTelefone(event.target.value)}/> <br/>
 
  <input type="date" 
         id="" 
         value={aniversario}
         placeholder="Aniversário" 
         onChange={(event) => setAniversario(event.target.value)}/> <br/>
  
  <input type="text" 
         id="" 
         value={estilo}  
         placeholder="Preferência de estilo"
         onChange={(event) => setEstilo(event.target.value)}/> <br/>
  
  <input type="text" 
         cor="" 
         id="" 
         value={cor} 
         placeholder="Cor favorita"
         onChange={(event) => setCor(event.target.value)}/> <br/>
  
  <button type="submit" onClick={alterar}>Salvar</button>
</form>
</main>
    );
}