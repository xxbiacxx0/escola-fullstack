"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "../auth.module.css";

export default function AuthForm({ mode }) {
  const router = useRouter();
  const isRegistro = mode === "registro";

  function handleSubmit(event) {
    event.preventDefault();
    router.push(isRegistro ? "/login" : "/principal");
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Sistema Escolar - Sesi</p>
        <h1 className={styles.title}>
          {isRegistro ? "Criar registro" : "Entrar no sistema"}
        </h1>
        <p className={styles.description}>
          {isRegistro
            ? "Preencha seus dados para criar um registro."
            : "Informe seu usuário e sua senha para continuar."}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Usuário</span>
            <input
              autoComplete="username"
              name="usuario"
              placeholder="Digite seu usuário"
              required
            />
          </label>

          {isRegistro && (
            <label className={styles.field}>
              <span>Nome</span>
              <input
                autoComplete="name"
                name="nome"
                placeholder="Digite seu nome"
                required
              />
            </label>
          )}

          <label className={styles.field}>
            <span>Senha</span>
            <input
              autoComplete={isRegistro ? "new-password" : "current-password"}
              name="senha"
              placeholder="Digite sua senha"
              required
              type="password"
            />
          </label>

          <button className={styles.submit} type="submit">
            {isRegistro ? "Salvar registro" : "Entrar no sistema"}
          </button>
        </form>

        <p className={styles.footer}>
          {isRegistro ? "Já tem um registro?" : "Ainda não tem um registro?"}{" "}
          <Link href={isRegistro ? "/login" : "/registro"}>
            {isRegistro ? "Ir para login" : "Criar registro"}
          </Link>
        </p>
      </section>
    </main>
  );
}
