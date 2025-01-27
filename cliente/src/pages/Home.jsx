import { useEffect, useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from "@mui/material";
import AdfScannerIcon from '@mui/icons-material/AdfScanner';

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

useEffect(() => {
  const buscarUsuario = async () => {
    try {
      const resposta = await fetch("http://localhost:3000/usuarios");
      const dados = await resposta.json();
      setUsuarios(dados);
    } catch {
      alert('Ocorreu um erro no app!');
    }
  }
  buscarUsuario();
}, [usuarios])

  const deletar = async(id) => {
    try{
      await fetch('http://localhost:3000/usuarios/'+ id , {
        method: 'DELETE'
      });
    }catch{
      alert("Ops... lascou!")
    }
  }

  const exportarPDF = () => {
    const doc = new jsPDF();

    const tabela = usuarios.map( usuario => [
      usuario.id,
      usuario.nome,
      usuario.email,
      usuario.telefone,
      usuario.aniversario,
      usuario.estilo,
      usuario.cor
    ]);
    doc.text ("Lista de Usuários", 10, 10);

    doc.autoTable({
      head:[[ "ID", "Nome", "E-mail", "Nome", "Telefone", "Aniversario", "Estilo", "Cor"]],
      body: tabela
    });

    doc.save("clientesMIUMIU");
  }

  return (
    <main>
    <div>
    <button onClick={()=> exportarPDF()}>Gerar PDF</button>
    <Link to={'/registro'}><button>Registrar</button></Link>
    <table>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
        <td>Telefone</td>
        <td>Aniversario</td>
        <td>Estilo</td>
        <td>Cor</td>
      </tr>
      {usuarios.map((usuario) =>
        <tr key={usuario.id}>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td>{usuario.telefone}</td>
          <td>{usuario.aniversario}</td>
          <td>{usuario.estilo}</td>
          <td>{usuario.cor}</td>
          <td> <button onClick={()=> deletar(usuario.id)}>Deletar</button></td>
          <Link to={'/alterar/' + usuario.id}>
            <button>Alterar</button>
          </Link>
        </tr>
      )}
    </table>
    </div>
    </main>
  );
}