'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../components/header';

export default function EditarNota() {
  const { id } = useParams();
  const router = useRouter();
  const [notas, setNotas] = useState({
    t1: '',
    t2: '',
    t3: '',
    n1: '',
    n2: '',
    n3: '',
  });
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function buscarNota() {
      try {
        const resposta = await fetch(`/api/notas/${encodeURIComponent(id)}`);
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível carregar a nota.');
        }
        setNotas({
          t1: String(dados.t1),
          t2: String(dados.t2),
          t3: String(dados.t3),
          n1: String(dados.n1),
          n2: String(dados.n2),
          n3: String(dados.n3),
        });
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarNota();
  }, [id]);

  function atualizarNota(event) {
    const { name, value } = event.target;
    setNotas((notasAtuais) => ({ ...notasAtuais, [name]: value }));
  }

  async function salvarNota(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      const resposta = await fetch(`/api/notas/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notas),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível atualizar a nota.');
      }
      router.push('/listnotas');
    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  }

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    color: "#000000"
  };

  const labelStyle = {
    fontWeight: "bold",
    fontSize: "13px",
    color: "#000000"
  };

  const sectionTitleStyle = {
    fontSize: "12px",
    fontWeight: "bold",
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    display: "block",
    marginBottom: "8px"
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Header />

      <main style={{ maxWidth: "550px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ padding: "30px", border: "2px solid #fee2e2", borderRadius: "10px", backgroundColor: "#ffffff", boxShadow: "0 4px 10px rgba(204, 0, 0, 0.05)", boxSizing: "border-box" }}>
          <h2 style={{ color: "#cc0000", marginTop: 0, marginBottom: "20px", borderBottom: "2px solid #fee2e2", paddingBottom: "10px", fontSize: "22px" }}>
            Editar Notas
          </h2>

          {erro && <p role="alert" style={{ color: "#cc0000" }}>{erro}</p>}
          {carregando ? (
            <p>Carregando notas...</p>
          ) : !erro && (
            <form onSubmit={salvarNota} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <span style={sectionTitleStyle}>Trabalhos</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" }}>
                  {['t1', 't2', 't3'].map((campo, index) => (
                    <div key={campo} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor={campo} style={labelStyle}>T{index + 1}</label>
                      <input
                        id={campo}
                        name={campo}
                        type="number"
                        min="0"
                        max="10"
                        step="any"
                        value={notas[campo]}
                        onChange={atualizarNota}
                        style={inputStyle}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span style={sectionTitleStyle}>Avaliações</span>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" }}>
                  {['n1', 'n2', 'n3'].map((campo, index) => (
                    <div key={campo} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <label htmlFor={campo} style={labelStyle}>N{index + 1}</label>
                      <input
                        id={campo}
                        name={campo}
                        type="number"
                        min="0"
                        max="10"
                        step="any"
                        value={notas[campo]}
                        onChange={atualizarNota}
                        style={inputStyle}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={salvando}
                style={{
                  backgroundColor: "#cc0000",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  fontSize: "15px",
                  cursor: salvando ? "wait" : "pointer",
                  marginTop: "10px",
                  width: "100%"
                }}
              >
                {salvando ? 'Salvando...' : 'Salvar alterações'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
