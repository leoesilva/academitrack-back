const express = require('express');
const alunoController = require('../../controllers/alunoController');
const professorController = require('../../controllers/professorController');
const authMiddleware = require('../../middlewares/authMiddleware'); // Importa o middleware
const router = express.Router();

// Aplica o middleware para garantir que apenas administradores possam acessar essas rotas
router.use(authMiddleware(['administrador']));

// Rotas para gerenciamento de alunos
router.get('/alunos/:id', alunoController.pesquisarAluno);
router.get('/alunos', alunoController.listarAlunos);
router.post('/alunos', alunoController.cadastrarAluno);
router.put('/alunos/:id', alunoController.atualizarAluno);
router.delete('/alunos/:id', alunoController.deletarAluno);

// Rotas para gerenciamento de professores
router.get('/professores/:id', professorController.pesquisarProfessor);
router.get('/professores', professorController.listarProfessores);
router.post('/professores', professorController.cadastrarProfessor);
router.put('/professores/:id', professorController.atualizarProfessor);
router.delete('/professores/:id', professorController.deletarProfessor);

module.exports = router;
