const LeptonCas = {
  results: null,
  solverList: new Map(),

  makeSolverTemplate: function (output) {
    return {
      outputPlainText: function (input) {
        output.appendChild(document.createTextNode(input))
      }
    }
  },

  addSolver: function (name, solveFtn = function (input) {}) {
    if (LeptonCas.solverList.has(name)) {
      throw new Error(`Solver named '${name}' already exists`)
    } else {
      LeptonCas.solverList.set(name, function (outputList, input) {
        const output = document.createElement('div')
        output.className = 'solution'
        solveFtn.call(LeptonCas.makeSolverTemplate(output), input)
        outputList.appendChild(output)
      })
    }
  },

  evaluate: function (input) {
    console.log(input)
    LeptonCas.solverList.forEach((value, key, map) => value(LeptonCas.results, input))
    for (const name in LeptonCas.solverList) {
      LeptonCas.solverList.get(name)(LeptonCas.results, input)
    }
  }
}

window.onload = () => {
  const inputElement = document.getElementById('input-text')
  const submitEvent = (event) => {
    event.preventDefault()
    LeptonCas.evaluate(inputElement.value)
  }

  LeptonCas.results = document.getElementById('results')

  LeptonCas.addSolver('displayContent', function (input) {
    this.outputPlainText(input)
  })

  document.getElementById('input-form').addEventListener('submit', submitEvent)
}
