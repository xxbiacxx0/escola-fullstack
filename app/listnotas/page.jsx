'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/header";

export default function ListaNotas() {
  const [notas, setNotas] = useState([]);
  const [erro, setErro] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function buscarNotas() {
      try {
        const resposta = await fetch('/api/notas');
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível carregar as notas.');
        }
        setNotas(dados);
      } catch (error) {
        setErro(error.message);
      }
    }

    buscarNotas();
  }, []);

  async function excluirNota(idNota) {
    if (!window.confirm('Deseja realmente excluir esta nota?')) {
      return;
    }

    try {
      const resposta = await fetch(`/api/notas/${idNota}`, {
        method: 'DELETE',
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível excluir a nota.');
      }
      setNotas((notasAtuais) =>
        notasAtuais.filter((nota) => nota.id_notas !== idNota)
      );
    } catch (error) {
      setErro(error.message);
    }
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Header />

      <main style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ padding: "30px", border: "2px solid #fee2e2", borderRadius: "10px", backgroundColor: "#ffffff", boxShadow: "0 4px 10px rgba(204, 0, 0, 0.05)" }}>
          <h1 style={{ color: "#cc0000", marginTop: 0, marginBottom: "20px", borderBottom: "2px solid #fee2e2", paddingBottom: "10px", fontSize: "24px" }}>
            Listagem de Notas
          </h1>

          {erro && <p role="alert" style={{ color: "#cc0000" }}>{erro}</p>}

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#cc0000", color: "#ffffff" }}>
                  <th style={{ padding: "12px 16px", borderRadius: "6px 0 0 0" }}>Nome</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>RA</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>T1</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>T2</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>N1</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>N2</th>
                  <th style={{ padding: "12px 16px", textAlign: "center" }}>N3</th>
                  <th colSpan={2} style={{ padding: "12px 16px", textAlign: "center", borderRadius: "0 6px 0 0" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {notas.map((nota) => (
                  <tr key={nota.id_notas} style={{ borderBottom: "1px solid #fee2e2" }}>
                    <td style={{ padding: "12px 16px", fontSize: "14px", color: "#000000", fontWeight: "bold" }}>
                      {nota.nome}
                    </td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", textAlign: "center", color: "#000000" }}>{nota.ra}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", textAlign: "center", color: "#000000" }}>{nota.t1}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", textAlign: "center", color: "#000000" }}>{nota.t2}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", textAlign: "center", color: "#000000" }}>{nota.n1}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", textAlign: "center", color: "#000000" }}>{nota.n2}</td>
                    <td style={{ padding: "12px 16px", fontSize: "14px", textAlign: "center", color: "#000000" }}>{nota.n3}</td>
                    <td style={{ padding: "12px 8px", width: "70px", textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => router.push(`/editnota/${nota.id_notas}`)}
                        style={{ backgroundColor: "#ffffff", color: "#cc0000", border: "1px solid #cc0000", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
                      >
                        Editar
                      </button>
                    </td>
                    <td style={{ padding: "12px 8px", width: "70px", textAlign: "center" }}>
                      <button
                        type="button"
                        onClick={() => excluirNota(nota.id_notas)}
                        style={{ backgroundColor: "#cc0000", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", fontSize: "12px" }}
                      >
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
                {notas.length === 0 && !erro && (
                  <tr>
                    <td colSpan={9} style={{ padding: "12px 16px", textAlign: "center", color: "#444444" }}>
                      Nenhuma nota encontrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: "20px", color: "#666666", fontSize: "14px", marginBottom: 0 }}>
            Esta é a página de listagem de notas.
          </p>
        </div>
      </main>
    </div>
  );
}