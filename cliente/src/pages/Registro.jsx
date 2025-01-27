import { useState } from "react";
import {useNavigate} from 'react-router-dom';

export default function Registrar() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [aniversario, setAniversario] = useState('');
    const [estilo, setEstilo] = useState('');
    const [cor, setCor] = useState('');

  const navigation = useNavigate();

  const registrar = async(event) => {
    event.preventDefault();
    try{
      const resposta = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers:{'Content-Type': 'Application/json'},
        body: JSON.stringify({
          nome: nome,
          email: email,
          telefone: telefone,
          aniversario: aniversario,
          estilo: estilo,
          cor: cor
        })
      });
      if(resposta.ok){
        navigation('/');
      }
    } catch (error){
      console.log(error)
      alert('Ocorreu um erro na aplicação: ');
    }
  }


  return (
    <main>
      <form onSubmit={registrar}>
        <input type="text" 
               nome="" 
               id="" 
               value={nome}  
               placeholder="Nome"
               onChange={(event) => setNome(event.target.value)}/> <br/>

        <input type="email" 
               email="" id="" 
               value={email}
               placeholder="E-mail"
               onChange={(event) => setEmail(event.target.value)}/> <br/>

        <input type="number" 
               telefone="" 
               id="" value={telefone}  
               placeholder="Telefone"
               onChange={(event) => setTelefone(event.target.value)}/> <br/>
       
        <input type="date" 
               aniversario="" 
               id="" value={aniversario}
               placeholder="Aniversário" 
               onChange={(event) => setAniversario(event.target.value)}/> <br/>
        
        <input type="text" 
               estilo="" 
               id="" 
               value={estilo}  
               placeholder="Preferência de estilo"
               onChange={(event) => setEstilo(event.target.value)}/> <br/>
        
        <input type="text" 
               cor="" 
               id="" value={cor} 
               placeholder="Cor favorita"
               onChange={(event) => setCor(event.target.value)}/> <br/>
        
        <button onClick={registrar}>Salvar</button>
      </form>
    </main>
  );
}