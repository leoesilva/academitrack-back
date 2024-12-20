const express = require("express");
const administradorController = require("../controllers/administrador.controller");
const alunoController = require("../controllers/aluno.controller");
const professorController = require("../controllers/professor.controller");
const cursoController = require("../controllers/curso.controller");
const disciplinaController = require("../controllers/disciplina.controller");
const turmaController = require("../controllers/turma.controller");
const mensagemController = require("../controllers/mensagem.controller");
const { isLoggedIn, isAdmin } = require("../middlewares/auth.middleware");
const router = express.Router();

// Rotas para gerenciamento de administradores
router.get(
  "/perfil",
  isLoggedIn,
  isAdmin,
  administradorController.obterPerfilAdministrador
);
router.put(
  "/perfil",
  isLoggedIn,
  isAdmin,
  administradorController.atualizarPerfilAdministrador
);

// Rotas para gerenciamento de alunos
router.get("/alunos/:id", isLoggedIn, isAdmin, alunoController.pesquisarAluno);
router.get("/alunos", isLoggedIn, isAdmin, alunoController.listarAlunos);
router.post("/alunos", isLoggedIn, isAdmin, alunoController.cadastrarAluno);
router.put("/alunos/:id", isLoggedIn, isAdmin, alunoController.atualizarAluno);
router.delete("/alunos/:id", isLoggedIn, isAdmin, alunoController.deletarAluno);

// Rotas para gerenciamento de professores
router.get(
  "/professores/:id",
  isLoggedIn,
  isAdmin,
  professorController.pesquisarProfessor
);
router.get(
  "/professores",
  isLoggedIn,
  isAdmin,
  professorController.listarProfessores
);
router.post(
  "/professores",
  isLoggedIn,
  isAdmin,
  professorController.cadastrarProfessor
);
router.put(
  "/professores/:id",
  isLoggedIn,
  isAdmin,
  professorController.atualizarProfessor
);
router.delete(
  "/professores/:id",
  isLoggedIn,
  isAdmin,
  professorController.deletarProfessor
);

// Rotas para gerenciamento de cursos
router.get("/cursos/:id", isLoggedIn, isAdmin, cursoController.pesquisarCurso);
router.get("/cursos", isLoggedIn, isAdmin, cursoController.listarCursos);
router.post("/cursos", isLoggedIn, isAdmin, cursoController.cadastrarCurso);
router.put("/cursos/:id", isLoggedIn, isAdmin, cursoController.atualizarCurso);
router.delete("/cursos/:id", isLoggedIn, isAdmin, cursoController.excluirCurso);

// Rotas para gerenciamento de disciplinas
router.get(
  "/disciplinas/:id",
  isLoggedIn,
  isAdmin,
  disciplinaController.pesquisarDisciplina
);
router.get(
  "/disciplinas",
  isLoggedIn,
  isAdmin,
  disciplinaController.listarDisciplinas
);
router.post(
  "/disciplinas",
  isLoggedIn,
  isAdmin,
  disciplinaController.cadastrarDisciplina
);
router.put(
  "/disciplinas/:id",
  isLoggedIn,
  isAdmin,
  disciplinaController.atualizarDisciplina
);
router.delete(
  "/disciplinas/:id",
  isLoggedIn,
  isAdmin,
  disciplinaController.excluirDisciplina
);

// Rotas para gerenciamento de turmas
router.post("/turmas", isLoggedIn, isAdmin, turmaController.criarTurma);
router.get("/turmas", isLoggedIn, isAdmin, turmaController.listarTurmas);
router.get("/turmas/:id", isLoggedIn, isAdmin, turmaController.obterTurma);
router.put("/turmas/:id", isLoggedIn, isAdmin, turmaController.atualizarTurma);
router.delete("/turmas/:id", isLoggedIn, isAdmin, turmaController.excluirTurma);
router.post(
  "/turmas/:id/alunos",
  isLoggedIn,
  isAdmin,
  turmaController.adicionarAluno
);
router.delete(
  "/turmas/:id/alunos",
  isLoggedIn,
  isAdmin,
  turmaController.removerAluno
);

// **Rotas para Mensagens para todas as turmas**
router.post(
  "/mensagens/enviar/todas",
  isLoggedIn,
  isAdmin,
  mensagemController.enviarMensagemParaTodasTurmas
); // Enviar mensagem para todas as turmas
router.get(
  "/mensagens/listar/todas",
  isLoggedIn,
  isAdmin,
  mensagemController.listarMensagensParaTodasTurmas
); // Listar mensagens para todas as turmas
router.delete(
  "/mensagens/excluir/todas/:mensagemId",
  isLoggedIn,
  isAdmin,
  mensagemController.excluirMensagemDeTodasTurmas
); // Excluir mensagem de todas as turmas

// **Rotas para Mensagens para uma unica turma **
router.post(
  "/mensagens/enviar/:turmaId",
  isLoggedIn,
  isAdmin,
  mensagemController.enviarMensagemParaTurma
); // Enviar mensagem para uma unica turma
router.get(
  "/mensagens/listar/:turmaId",
  isLoggedIn,
  isAdmin,
  mensagemController.listarMensagensPorTurma
); // Listar mensagens de uma unica turma
router.delete(
  "/mensagens/excluir/:turmaId/:mensagemId",
  isLoggedIn,
  isAdmin,
  mensagemController.excluirMensagemDaTurma
); // Excluir mensagem de uma unica turma

module.exports = router;
