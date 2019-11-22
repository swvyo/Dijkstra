const problema = {
  Inicio: {A: 2, B: 2},
  A: {C: 4, D: 2},
  B: {A: 8, D: 1},
  C: {D: 6, Final: 3},
  D: {Final: 1},
  Final: {}
};

//função para retornar o nó mais barato não processado
const menorCustoNo = (custo, processado) => {
  return Object.keys(custo).reduce((lowest, no) => {
    if (lowest === null || custo[no] < custo[lowest]) {
      if (!processado.includes(no)) {
        lowest = no;
      }
    }
    return lowest;
  }, null);
};

// função para retornar o custo e o caminho até o final
const dijkstra = (graph) => {

  const custo = Object.assign({Final: Infinity}, graph.Inicio);

  const pais = {Final: null};
  for (let filhos in graph.Inicio) {
    pais[filhos] = 'Inicio';
  }

  const processado = [];

  let no = menorCustoNo(custo, processado);


  while (no) {
    let cost = custo[no];
    let filhoss = graph[no];
    for (let n in filhoss) {
      let novoCusto = cost + filhoss[n];
      if (!custo[n]) {
        custo[n] = novoCusto;
        pais[n] = no;
      }
      if (custo[n] > novoCusto) {
        custo[n] = novoCusto;
        pais[n] = no;
      }
    }
    processado.push(no);
    no = menorCustoNo(custo, processado);
  }

  let melhorCaminho = ['Final'];
  let paiss = pais.Final;
  while (paiss) {
    melhorCaminho.push(paiss);
    paiss = pais[paiss];
  }
  melhorCaminho.reverse();

  const resultados = {
    DistanciaCusto: custo.Final,
    Caminho: melhorCaminho
  };

  return resultados;
};

console.log(dijkstra(problema));