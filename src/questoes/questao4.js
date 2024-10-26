const prompt = require('prompt-sync')();

class Aluno {
    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
        this.p1 = null;
        this.p2 = null;
    }

    get notaFinal() {
        if (this.p1 !== null && this.p2 !== null) {
            return ((this.p1 + this.p2) / 2).toFixed(1);
        } else if (this.p1 !== null) {
            return (this.p1 / 2).toFixed(1);
        } else if (this.p2 !== null) {
            return (this.p2 / 2).toFixed(1);
        }
        return (0).toFixed(1);
    }
}

class Turma {
    constructor() {
        this.alunos = [];
    }

    inserirAluno(aluno) {
        if (this.alunos.some(a => a.matricula === aluno.matricula)) {
            console.log("Erro: Já existe um aluno com essa matrícula.");
            return false;
        }
        this.alunos.push(aluno);
        console.log(`Aluno ${aluno.nome} inserido com sucesso.`);
        return true;
    }

    removerAluno(matricula) {
        const index = this.alunos.findIndex(a => a.matricula === matricula);
        if (index === -1) {
            console.log("Erro: Aluno não encontrado.");
            return false;
        }
        this.alunos.splice(index, 1);
        console.log(`Aluno com matrícula ${matricula} removido com sucesso.`);
        return true;
    }

    lancarNota(matricula, prova, nota) {
        const aluno = this.alunos.find(a => a.matricula === matricula);
        if (!aluno) {
            console.log("Erro: Aluno não encontrado.");
            return false;
        }
        if (prova === 'P1') {
            aluno.p1 = nota;
        } else if (prova === 'P2') {
            aluno.p2 = nota;
        } else {
            console.log("Erro: Prova inválida.");
            return false;
        }
        console.log(`Nota ${nota} lançada para ${aluno.nome} na ${prova}.`);
        return true;
    }

    imprimirAlunos() {
        console.log('---------------------------------------');
        console.log('Matricula Nome               P1    P2    NF');
        console.log('---------------------------------------');

        this.alunos
            .sort((a, b) => a.nome.localeCompare(b.nome))
            .forEach(aluno => {
                console.log(
                    `${aluno.matricula}    ${aluno.nome.padEnd(18)} ` +
                    `${aluno.p1 !== null ? aluno.p1.toFixed(1) : '-'}   ` +
                    `${aluno.p2 !== null ? aluno.p2.toFixed(1) : '-'}   ` +
                    `${aluno.notaFinal}`
                );
            });

        console.log('---------------------------------------');
    }
}

function executarQuestao4() {
    const turma = new Turma();

    let continuar = 's';
    while (continuar.toLowerCase() === 's') {
        const matricula = prompt("Digite a matrícula do aluno: ");
        const nome = prompt("Digite o nome do aluno: ");
        const aluno = new Aluno(matricula, nome);
        turma.inserirAluno(aluno);

        continuar = prompt("Deseja adicionar outro aluno? (s/n): ");
    }

    continuar = 's';
    while (continuar.toLowerCase() === 's') {
        const matricula = prompt("Digite a matrícula do aluno para lançar nota: ");
        const prova = prompt("Qual prova deseja lançar? (P1/P2): ");
        const nota = parseFloat(prompt("Digite a nota: "));

        if (!turma.lancarNota(matricula, prova, nota)) {
            console.log("Erro ao lançar nota.");
        }

        continuar = prompt("Deseja lançar outra nota? (s/n): ");
    }

    turma.imprimirAlunos();
}

executarQuestao4();

module.exports = { Aluno, Turma };
