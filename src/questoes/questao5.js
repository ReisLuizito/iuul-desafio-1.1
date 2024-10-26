const prompt = require('prompt-sync')();
const { DateTime } = require('luxon'); 

class Cliente {
    constructor(nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.rendaMensal = rendaMensal;
        this.estadoCivil = estadoCivil;
        this.dependentes = dependentes;
    }

    exibirDados() {
        console.log("\nDados do Cliente:");
        console.log(`Nome: ${this.nome}`);
        console.log(`CPF: ${this.formatarCPF(this.cpf)}`);
        console.log(`Data de Nascimento: ${this.formatarData(this.dataNascimento)}`);
        console.log(`Renda Mensal: R$ ${this.rendaMensal.toFixed(2).replace('.', ',')}`);
        console.log(`Estado Civil: ${this.estadoCivil}`);
        console.log(`Dependentes: ${this.dependentes}`);
    }

    formatarCPF(cpf) {
        const cpfStr = cpf.toString().padStart(11, '0');
        return `${cpfStr.slice(0, 3)}.${cpfStr.slice(3, 6)}.${cpfStr.slice(6, 9)}-${cpfStr.slice(9)}`;
    }

    formatarData(data) {
        return data.toFormat('dd/MM/yyyy');
    }
}

function solicitarNome() {
    while (true) {
        const nome = prompt("Digite o nome (mínimo 5 caracteres): ");
        if (nome.length >= 5) return nome;
        console.log("Erro: O nome deve ter pelo menos 5 caracteres.");
    }
}

function solicitarCPF() {
    while (true) {
        const cpf = prompt("Digite o CPF (11 dígitos, apenas números): ");
        if (/^\d{11}$/.test(cpf)) return Number(cpf);
        console.log("Erro: CPF deve conter exatamente 11 dígitos numéricos.");
    }
}

function solicitarDataNascimento() {
    while (true) {
        const dataStr = prompt("Digite a data de nascimento (DD/MM/AAAA): ");
        const data = DateTime.fromFormat(dataStr, "dd/MM/yyyy");

        if (data.isValid) {
            const idade = DateTime.now().diff(data, "years").years;
            if (idade >= 18) return data;
            else console.log("Erro: O cliente deve ter pelo menos 18 anos.");
        } else {
            console.log("Erro: Data de nascimento inválida. Use o formato DD/MM/AAAA.");
        }
    }
}

function solicitarRendaMensal() {
    while (true) {
        const rendaStr = prompt("Digite a renda mensal (use vírgula como decimal): ");
        const renda = parseFloat(rendaStr.replace(',', '.'));

        if (!isNaN(renda) && renda >= 0) return renda;
        console.log("Erro: A renda mensal deve ser um valor positivo.");
    }
}

function solicitarEstadoCivil() {
    while (true) {
        const estadoCivil = prompt("Digite o estado civil (C, S, V, D): ").toUpperCase();
        if (["C", "S", "V", "D"].includes(estadoCivil)) return estadoCivil;
        console.log("Erro: Estado civil deve ser uma das opções: C, S, V ou D.");
    }
}

function solicitarDependentes() {
    while (true) {
        const dependentesStr = prompt("Digite o número de dependentes (0 a 10): ");
        const dependentes = parseInt(dependentesStr);

        if (!isNaN(dependentes) && dependentes >= 0 && dependentes <= 10) return dependentes;
        console.log("Erro: Número de dependentes deve estar entre 0 e 10.");
    }
}

function executarQuestao5() {
    console.log("Cadastro de Cliente");

    const nome = solicitarNome();
    const cpf = solicitarCPF();
    const dataNascimento = solicitarDataNascimento();
    const rendaMensal = solicitarRendaMensal();
    const estadoCivil = solicitarEstadoCivil();
    const dependentes = solicitarDependentes();

    const cliente = new Cliente(nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes);
    cliente.exibirDados();
}

executarQuestao5();
