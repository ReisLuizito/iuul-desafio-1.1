const prompt = require('prompt-sync')();
const Vertice = require('./questao1');

class Triangulo {
    #vertice1;
    #vertice2;
    #vertice3;o

    constructor(v1, v2, v3) {
        if (!Triangulo.formaTriangulo(v1, v2, v3)) {
            throw new Error("Os vértices fornecidos não formam um triângulo.");
        }
        this.#vertice1 = v1;
        this.#vertice2 = v2;
        this.#vertice3 = v3;
    }

    static formaTriangulo(v1, v2, v3) {
        const a = v1.distancia(v2);
        const b = v2.distancia(v3);
        const c = v3.distancia(v1);
        return a + b > c && a + c > b && b + c > a;
    }

    equals(outroTriangulo) {
        const [a1, b1, c1] = this.lados();
        const [a2, b2, c2] = outroTriangulo.lados();
        const lados1 = [a1, b1, c1].sort();
        const lados2 = [a2, b2, c2].sort();
        return lados1[0] === lados2[0] && lados1[1] === lados2[1] && lados1[2] === lados2[2];
    }

    get perimetro() {
        const [a, b, c] = this.lados();
        return a + b + c;
    }

    tipo() {
        const [a, b, c] = this.lados();
        if (a === b && b === c) return "Equilátero";
        if (a === b || b === c || a === c) return "Isósceles";
        return "Escaleno";
    }

    clone() {
        return new Triangulo(this.#vertice1, this.#vertice2, this.#vertice3);
    }

    get area() {
        const [a, b, c] = this.lados();
        const s = this.perimetro / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }

    lados() {
        const a = this.#vertice1.distancia(this.#vertice2);
        const b = this.#vertice2.distancia(this.#vertice3);
        const c = this.#vertice3.distancia(this.#vertice1);
        return [a, b, c];
    }
}

function executarQuestao2() {
    console.log("Vamos criar 3 triângulos.");

    const triangulos = [];
    for (let i = 1; i <= 3; i++) {
        console.log(`\nDefinindo os vértices do Triângulo ${i}:`);
        const v1 = new Vertice(parseFloat(prompt("Digite o valor de x para o vértice 1: ")), parseFloat(prompt("Digite o valor de y para o vértice 1: ")));
        const v2 = new Vertice(parseFloat(prompt("Digite o valor de x para o vértice 2: ")), parseFloat(prompt("Digite o valor de y para o vértice 2: ")));
        const v3 = new Vertice(parseFloat(prompt("Digite o valor de x para o vértice 3: ")), parseFloat(prompt("Digite o valor de y para o vértice 3: ")));

        try {
            const triangulo = new Triangulo(v1, v2, v3);
            triangulos.push(triangulo);

            console.log(`Triângulo ${i} criado com sucesso.`);
            console.log(`Perímetro: ${triangulo.perimetro}`);
            console.log(`Área: ${triangulo.area}`);
            console.log(`Tipo: ${triangulo.tipo()}`);
            console.log("Clonando o triângulo...");
            const clone = triangulo.clone();
            console.log(`Triângulo ${i} e seu clone são iguais? ${triangulo.equals(clone)}`);
        } catch (error) {
            console.log(`Erro ao criar o Triângulo ${i}: ${error.message}`);
        }
    }

    if (triangulos.length >= 2) {
        console.log("\nComparando Triângulo 1 e Triângulo 2:");
        console.log(`Triângulo 1 e Triângulo 2 são iguais? ${triangulos[0].equals(triangulos[1])}`);
    }
}

executarQuestao2();

module.exports = Triangulo;
