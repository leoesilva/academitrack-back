const Turma = require('../models/turma.model');

const criarTurma = async (req, res) => {
  try {
    const {
      disciplina,
      professor,
      alunos,
      ano,
      semestre
    } = req.body;

    // Validação dos campos obrigatórios
    if (!disciplina || !professor || !ano || !semestre || !alunos || alunos.length === 0) {
      return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const novaTurma = new Turma({
      disciplina_id: disciplina,
      professor_id: professor,
      alunos_id: alunos,
      ano: Number(ano),      // Converte para número
      semestre: Number(semestre)  // Converte para número
    });

    await novaTurma.save();
    res.status(201).json({ message: 'Turma criada com sucesso', turma: novaTurma });
  } catch (error) {
    console.error(error); // Adicione para debugar
    res.status(500).json({ message: error.message });
  }
};


const listarTurmas = async (req, res) => {
  try {
    const turmas = await Turma.find()
      .populate('disciplina_id', 'nome')
      .populate('professor_id', 'nomeCompleto')

    const turmasDetalhadas = turmas.map(turma => ({
      _id: turma._id,
      disciplina: turma.disciplina_id.nome,
      professor: turma.professor_id.nomeCompleto,
      ano: turma.ano,
      semestre: turma.semestre
    }));

    res.status(200).json(turmasDetalhadas);
  } catch (error) {
    console.error('Erro ao listar turmas:', error);
    res.status(500).json({ message: 'Erro ao listar turmas', error: error.message });
  }
};

const obterTurma = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id)
      .populate('disciplina_id', 'nome')
      .populate('professor_id', 'nomeCompleto')
      .populate('alunos_id', '_id nomeCompleto cpf matricula');
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    const turmaDetalhada = {
      _id: turma._id,
      disciplina: turma.disciplina_id.nome,
      professor: turma.professor_id.nomeCompleto,
      alunos: turma.alunos_id.map(aluno => ({
        _id: aluno._id,
        nomeCompleto: aluno.nomeCompleto,
        cpf: aluno.cpf,
        matricula: aluno.matricula
      })),
      ano: turma.ano,
      semestre: turma.semestre
    };
    res.status(200).json(turmaDetalhada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao pesquisar turma', error });
  }
};

const atualizarTurma = async (req, res) => {
  try {
    const {
      disciplina,
      professor,
      alunos,
      ano,
      semestre
    } = req.body;
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    if (disciplina) turma.disciplina = disciplina;
    if (professor) turma.professor = professor;
    if (alunos) turma.alunos = alunos;
    if (ano) turma.ano = ano;
    if (semestre) turma.semestre = semestre;
    await turma.save();

    res.status(200).json({ message: 'Turma atualizada com sucesso', turma });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar turma', error });
  }
};

const excluirTurma = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    await Turma.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Turma deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar turma', error });
  }
};

const adicionarAluno = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    
    if (!req.body.alunoId) {
      return res.status(400).json({ message: 'ID do aluno não fornecido' });
    }

    if (turma.alunos_id.includes(req.body.alunoId)) {
      return res.status(400).json({ message: 'Aluno já está na turma' });
    }

    turma.alunos_id.push(req.body.alunoId);
    await turma.save();

    const turmaAtualizada = await Turma.findById(req.params.id)
      .populate('disciplina_id', 'nome')
      .populate('professor_id', 'nomeCompleto')
      .populate('alunos_id', 'nomeCompleto cpf matricula');

    res.status(200).json({
      message: 'Aluno adicionado com sucesso',
      turma: {
        _id: turmaAtualizada._id,
        disciplina: turmaAtualizada.disciplina_id.nome,
        professor: turmaAtualizada.professor_id.nomeCompleto,
        alunos: turmaAtualizada.alunos_id.map(aluno => ({
          _id: aluno._id,
          nomeCompleto: aluno.nomeCompleto,
          cpf: aluno.cpf,
          matricula: aluno.matricula
        })),
        ano: turmaAtualizada.ano,
        semestre: turmaAtualizada.semestre
      }
    });
  } catch (error) {
    console.error('Erro ao adicionar aluno:', error);
    res.status(500).json({ message: 'Erro ao adicionar aluno', error: error.message });
  }
};

const removerAluno = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }

    turma.alunos_id = turma.alunos_id.filter(aluno => aluno.toString() !== req.body.alunoId);
    await turma.save();
    res.status(200).json({ message: 'Aluno removido com sucesso', turma });
  } catch (error) {
    console.error('Erro ao remover aluno:', error);
    res.status(500).json({ message: 'Erro ao remover aluno', error: error.message });
  }
};

module.exports = {
  criarTurma,
  listarTurmas,
  obterTurma,
  atualizarTurma,
  excluirTurma,
  adicionarAluno,
  removerAluno
};
