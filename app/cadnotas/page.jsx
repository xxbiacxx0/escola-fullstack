'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "../components/header";

export default function CadastroNotas() {
  const router = useRouter();
  const [alunos, setAlunos] = useState([]);
  const [alunoId, setAlunoId] = useState('');
  const [notas, setNotas] = useState({
    t1: '',
    t2: '',
    t3: '',
    n1: '',
    n2: '',
    n3: '',
  });
  const [erro, setErro] = useState('');
  const [carregandoAlunos, setCarregandoAlunos] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    async function buscarAlunos() {
      try {
        const resposta = await fetch('/api/alunos');
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível carregar os alunos.');
        }
        setAlunos(dados);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregandoAlunos(false);
      }
    }

    buscarAlunos();
  }, []);

  function atualizarNota(event) {
    const { name, value } = event.target;
    setNotas((notasAtuais) => ({ ...notasAtuais, [name]: value }));
  }

  async function cadastrarNota(event) {
    event.preventDefault();
    setErro('');
    setSalvando(true);

    try {
      const resposta = await fetch('/api/notas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aluno_id: alunoId, ...notas }),
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível salvar as notas.');
      }
      alert(dados.mensagem);
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
            Cadastro de Notas
          </h2>

          {erro && <p role="alert" style={{ color: "#cc0000" }}>{erro}</p>}
          <form onSubmit={cadastrarNota} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label htmlFor="alunoId" style={labelStyle}>
                Nome do Aluno
              </label>
              <select
                id="alunoId"
                value={alunoId}
                onChange={(event) => setAlunoId(event.target.value)}
                style={inputStyle}
                required
                disabled={carregandoAlunos || alunos.length === 0}
              >
                <option value="">
                  {carregandoAlunos ? 'Carregando alunos...' : 'Selecione um aluno'}
                </option>
                {alunos.map((aluno) => (
                  <option key={aluno.id_aluno} value={aluno.id_aluno}>
                    {aluno.nome} (RA: {aluno.ra})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span style={sectionTitleStyle}>Trabalhos</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="T1" style={labelStyle}>T1</label>
                  <input
                    id="T1"
                    type="number"
                    name="t1"
                    placeholder="0.0"
                    value={notas.t1}
                    onChange={atualizarNota}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="T2" style={labelStyle}>T2</label>
                  <input
                    id="T2"
                    type="number"
                    name="t2"
                    placeholder="0.0"
                    value={notas.t2}
                    onChange={atualizarNota}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="T3" style={labelStyle}>T3</label>
                  <input
                    id="T3"
                    type="number"
                    name="t3"
                    placeholder="0.0"
                    value={notas.t3}
                    onChange={atualizarNota}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <span style={sectionTitleStyle}>Avaliações</span>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="N1" style={labelStyle}>N1</label>
                  <input
                    id="N1"
                    type="number"
                    name="n1"
                    placeholder="0.0"
                    value={notas.n1}
                    onChange={atualizarNota}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="N2" style={labelStyle}>N2</label>
                  <input
                    id="N2"
                    type="number"
                    name="n2"
                    placeholder="0.0"
                    value={notas.n2}
                    onChange={atualizarNota}
                    style={inputStyle}
                    required
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label htmlFor="N3" style={labelStyle}>N3</label>
                  <input
                    id="N3"
                    type="number"
                    name="n3"
                    placeholder="0.0"
                    value={notas.n3}
                    onChange={atualizarNota}
                    style={inputStyle}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={salvando || carregandoAlunos || alunos.length === 0}
              style={{
                backgroundColor: "#cc0000",
                color: "#ffffff",
                border: "none",
                padding: "12px",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
                marginTop: "10px",
                width: "100%"
              }}
            >
              {salvando ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}