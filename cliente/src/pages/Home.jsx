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
}, [])

const removerPessoa = async (id) => {
  try {
    await fetch("http://localhost:3000/usuarios/" + id, {
      method: "DELETE",
    });
  } catch {
    alert("Ops, lascou!!!");
  }
};

  const exportarPDF = () => {
    const doc = new jsPDF();

    const tabela = usuarios.map( usuario => [
      usuario.id,
      usuario.nome,
      usuario.email
    ]);

    doc.text ("Lista de Usuários", 10, 10);

    doc.autoTable({
      head:[[ "ID", "Nome", "E-mail"]],
      body: tabela
    });

    doc.save("alunosIFMS");
  }

  return (
    <div>
    <button onClick={()=> exportarPDF()}>Gerar PDF</button>
    <table>
      <thead>
      <tr>
        <td>Nome</td>
        <td>E-mail</td>
        <td>Ações</td>
      </tr>
      </thead>
    </table>
    </div>
  );
}