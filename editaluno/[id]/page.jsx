'use client';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { useParams, useRouter } from 'next/navigation';

export default function EditarAlunos() {
  const { id } = useParams();
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [serie, setSerie] = useState('');
  const [ra, setRa] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarAluno() {
      if (!id) {
        setErro('Selecione um aluno para editar pela listagem.');
        setCarregando(false);
        return;
      }

      try {
        const resposta = await fetch(`/api/alunos/${encodeURIComponent(id)}`);
        const dados = await resposta.json();
        if (!resposta.ok) {
          throw new Error(dados.erro || 'Não foi possível carregar o aluno.');
        }
        setNome(dados.nome);
        setIdade(String(dados.idade));
        setSerie(dados.serie);
        setRa(dados.ra);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    buscarAluno();
  }, [id]);

  async function editarAluno(event){
    event.preventDefault();
    try {
      const resposta = await fetch(`/api/alunos/${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, idade, serie, ra })
      });
      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.erro || 'Não foi possível atualizar o aluno.');
      }
      router.push('/listaluno');
    } catch (error) {
      setErro(error.message);
    }
  }

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      color: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flex: "1",
      maxWidth: "550px",
      width: "100%",
      margin: "40px auto",
      padding: "0 20px",
      boxSizing: "border-box",
    },
    card: {
      backgroundColor: "#ffffff",
      padding: "32px",
      borderRadius: "12px",
      border: "2px solid #fee2e2",
      boxShadow: "0 4px 12px rgba(204, 0, 0, 0.08)",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#cc0000",
      margin: "0 0 24px 0",
      paddingBottom: "12px",
      borderBottom: "2px solid #fee2e2",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "bold",
      color: "#333333",
    },
    input: {
      padding: "10px 14px",
      borderRadius: "6px",
      border: "1px solid #d1d5db",
      fontSize: "15px",
      outline: "none",
      boxSizing: "border-box",
      width: "100%",
    },
    button: {
      backgroundColor: "#cc0000",
      color: "#ffffff",
      border: "none",
      padding: "12px",
      borderRadius: "6px",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer",
      marginTop: "10px",
      boxShadow: "0 2px 4px rgba(204, 0, 0, 0.2)",
    },
  };

  return (
    <div style={styles.container}>
      <Header />

      <main style={styles.main}>
        <div style={styles.card}>
          <h2 style={styles.title}>Editar Aluno</h2>

          {erro && <p role="alert" style={{ color: "#cc0000" }}>{erro}</p>}
          {carregando ? (
            <p>Carregando dados do aluno...</p>
          ) : id && !erro && (
          <form style={styles.form} onSubmit={editarAluno}>
            <div style={styles.fieldGroup}>
              <label htmlFor="nome" style={styles.label}>Nome Completo</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Digite o nome do aluno"
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="idade" style={styles.label}>Idade</label>
              <input
                id="idade"
                type="number"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                placeholder="Ex: 15"
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="serie" style={styles.label}>Série</label>
              <input
                id="serie"
                type="text"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                placeholder="Ex: 1º Ano EM"
                style={styles.input}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="ra" style={styles.label}>RA (Registro Aluno)</label>
              <input
                id="ra"
                type="number"
                value={ra}
                onChange={(e) => setRa(e.target.value)}
                placeholder="Digite o número do RA"
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>
              Salvar Edição
            </button>
          </form>
          )}
        </div>
      </main>
    </div>
  );
}