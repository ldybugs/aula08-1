import { useEffect, useState } from "react";
import jspdf from 'jspdf';
import 'jspdf-autotable';

import default function Home() {
  const [usuarios, setUsuarios] = useState([]);
}



export default function Home() {

  const exportarPDF = () => {
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
      </tr>
      </thead>
    </table>
    </div>
  );
}