// src/questions/question1.js

const prompt = require('prompt-sync')();

// Definição da classe Vertice
class Vertice {
    #x;  // Atributo privado para x
    #y;  // Atributo privado para y

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Getters para os atributos privados x e y
    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    // Método para calcular a distância euclidiana entre este vértice e outro
    distancia(outroVertice) {
        const dx = this.#x - outroVertice.x;
        const dy = this.#y - outroVertice.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Método para mover o vértice para outra posição (x, y)
    move(novoX, novoY) {
        this.#x = novoX;
        this.#y = novoY;
    }

    // Método para verificar se dois vértices são iguais
    equals(outroVertice) {
        return this.#x === outroVertice.x && this.#y === outroVertice.y;
    }
}

// Função principal para rodar o código da Questão 1
function executarQuestao1() {
    console.log("Vamos criar 3 vértices.");

    // Criar três vértices com valores do usuário
    const vertices = [];
    for (let i = 1; i <= 3; i++) {
        const x = parseFloat(prompt(`Digite o valor de x para o vértice ${i}: `));
        const y = parseFloat(prompt(`Digite o valor de y para o vértice ${i}: `));
        vertices.push(new Vertice(x, y));
    }

    // Testar o método distancia entre o primeiro e o segundo vértices
    console.log(`Distância entre o vértice 1 e o vértice 2: ${vertices[0].distancia(vertices[1])}`);

    // Mover o terceiro vértice para uma nova posição
    const novoX = parseFloat(prompt("Digite o novo valor de x para mover o vértice 3: "));
    const novoY = parseFloat(prompt("Digite o novo valor de y para mover o vértice 3: "));
    vertices[2].move(novoX, novoY);
    console.log(`Novo valor do vértice 3 após mover: (${vertices[2].x}, ${vertices[2].y})`);

    // Verificar se o vértice 1 e o vértice 3 são iguais
    console.log(`O vértice 1 e o vértice 3 são iguais? ${vertices[0].equals(vertices[2])}`);
}

// Executa a função principal para rodar o código da Questão 1
executarQuestao1();

module.exports = Vertice;
