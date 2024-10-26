const prompt = require('prompt-sync')();
const Vertice = require('./questao1');

class Poligono {
    #vertices;

    constructor(vertices) {
        if (!vertices || vertices.length < 3) {
            throw new Error("Um polígono deve ter pelo menos 3 vértices.");
        }
        this.#vertices = vertices;
    }

    addVertice(vertice) {
        if (this.#vertices.some(v => v.equals(vertice))) {
            return false;
        }
        this.#vertices.push(vertice);
        return true;
    }

    get perimetro() {
        let perimetro = 0;
        for (let i = 0; i < this.#vertices.length; i++) {
            const verticeAtual = this.#vertices[i];
            const proximoVertice = this.#vertices[(i + 1) % this.#vertices.length];
            perimetro += verticeAtual.distancia(proximoVertice);
        }
        return perimetro;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }
}

function executarQuestao3() {
    console.log("Vamos criar um polígono.");

    const vertices = [];
    for (let i = 1; i <= 3; i++) {
        const x = parseFloat(prompt(`Digite o valor de x para o vértice ${i}: `));
        const y = parseFloat(prompt(`Digite o valor de y para o vértice ${i}: `));
        vertices.push(new Vertice(x, y));
    }

    try {
        const poligono = new Poligono(vertices);
        console.log(`Polígono criado com ${poligono.qtdVertices} vértices.`);

        let adicionarMais = prompt("Deseja adicionar mais um vértice ao polígono? (s/n): ");
        while (adicionarMais.toLowerCase() === 's') {
            const x = parseFloat(prompt("Digite o valor de x para o novo vértice: "));
            const y = parseFloat(prompt("Digite o valor de y para o novo vértice: "));
            const novoVertice = new Vertice(x, y);
            if (poligono.addVertice(novoVertice)) {
                console.log("Vértice adicionado com sucesso.");
            } else {
                console.log("O vértice já existe no polígono e não foi adicionado.");
            }
            adicionarMais = prompt("Deseja adicionar mais um vértice? (s/n): ");
        }

        console.log(`Perímetro do polígono: ${poligono.perimetro}`);
        console.log(`Quantidade total de vértices no polígono: ${poligono.qtdVertices}`);
    } catch (error) {
        console.log(`Erro ao criar o polígono: ${error.message}`);
    }
}

executarQuestao3();

module.exports = Poligono;
