const prompt = require('prompt-sync')();

class Vertice {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    distancia(outroVertice) {
        const dx = this.#x - outroVertice.x;
        const dy = this.#y - outroVertice.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move(novoX, novoY) {
        this.#x = novoX;
        this.#y = novoY;
    }

    equals(outroVertice) {
        return this.#x === outroVertice.x && this.#y === outroVertice.y;
    }
}

function executarQuestao1() {
    console.log("Vamos criar 3 vértices.");

    const vertices = [];
    for (let i = 1; i <= 3; i++) {
        const x = parseFloat(prompt(`Digite o valor de x para o vértice ${i}: `));
        const y = parseFloat(prompt(`Digite o valor de y para o vértice ${i}: `));
        vertices.push(new Vertice(x, y));
    }

    console.log(`Distância entre o vértice 1 e o vértice 2: ${vertices[0].distancia(vertices[1])}`);

    const novoX = parseFloat(prompt("Digite o novo valor de x para mover o vértice 3: "));
    const novoY = parseFloat(prompt("Digite o novo valor de y para mover o vértice 3: "));
    vertices[2].move(novoX, novoY);
    console.log(`Novo valor do vértice 3 após mover: (${vertices[2].x}, ${vertices[2].y})`);

    console.log(`O vértice 1 e o vértice 3 são iguais? ${vertices[0].equals(vertices[2])}`);
}

executarQuestao1();

module.exports = Vertice;
