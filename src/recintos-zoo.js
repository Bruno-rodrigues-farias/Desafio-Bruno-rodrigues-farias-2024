const recintos = [
    { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: ['macaco', 'macaco', 'macaco'] },
    { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
    { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: ['gazela'] },
    { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
    { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: ['leão'] }
];

const animais = {
    leão: { tamanho: 3, bioma: 'savana' },
    leopardo: { tamanho: 2, bioma: 'savana' },
    crocodilo: { tamanho: 3, bioma: 'rio' },
    macaco: { tamanho: 1, bioma: ['savana', 'floresta'] },
    gazela: { tamanho: 2, bioma: 'savana' },
    hipopotamo: { tamanho: 4, bioma: ['savana', 'rio'] }
};

class RecintosZoo {
    analisaRecintos(tipoAnimal, quantidade) {
        tipoAnimal = tipoAnimal.toLowerCase();

        if (!animais[tipoAnimal]) {
            return { erro: "Animal inválido" };
        }
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const animal = animais[tipoAnimal];
        const recintosViaveis = recintos.filter(recinto => {
        
            const espaçoAtual = recinto.tamanhoTotal - recinto.animaisExistentes.reduce((acc, a) => acc + animais[a].tamanho, 0);
            
            const espaçoNecessário = quantidade * animal.tamanho + (recinto.animaisExistentes.length > 0 && (recinto.animaisExistentes.length > 1 || animal.tamanho === 1) ? 1 : 0);

            const biomaAdequado = animal.bioma.includes(recinto.bioma) || 
                                  (recinto.bioma === 'savana e rio' && animal.bioma.includes('savana') && animal.bioma.includes('rio'));

            if (!biomaAdequado) {
                return false;
            }

            
            if (recinto.animaisExistentes.length > 0) {
                const animaisExistentes = recinto.animaisExistentes.map(a => animais[a]);
                if (animal.bioma.includes('savana') && animaisExistentes.some(a => a.bioma === 'rio')) {
                    return false; 
                }
                if (animal.tamanho === 1 && (recinto.animaisExistentes.length === 0 || animaisExistentes.some(a => a.tamanho === 1))) {
                    return false; 
                }
                if (animaisExistentes.some(a => a.bioma !== animal.bioma && a.tamanho > 1 && animal.tamanho > 1)) {
                    return false; 
                }
            } else if (animal.tamanho === 1) {
                return false; 
            }

            return espaçoAtual >= espaçoNecessário;
        });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        const resultado = {
            recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.tamanhoTotal - r.animaisExistentes.reduce((acc, a) => acc + animais[a].tamanho, 0) - quantidade * animal.tamanho} total: ${r.tamanhoTotal})`)
        };

        return resultado;
    }
}

export { RecintosZoo as RecintosZoo };
