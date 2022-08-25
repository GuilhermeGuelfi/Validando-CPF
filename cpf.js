function ValidaCPF(cpf) {
    Object.defineProperty(this, 'cpfLimpo', {
        get: function() {
            return cpf.replace(/\D+/g, '');
        }
    })
};

ValidaCPF.prototype.criaDigito = function(cpfParcial) {
    let cpfArray = Array.from(cpfParcial);
    
    cpfArray = cpfArray.map(obj => Number(obj));
    
    let regressivo = cpfArray.length + 1;
    
    let somaDigitos = cpfArray.map(function(obj) {
        let acumulador = 0;
        acumulador += Number(obj) * Number(regressivo);
        regressivo--;
        return acumulador;    
    }).reduce((acc,valor) => {
        return acc + valor;
    });

    const digito = 11 - (somaDigitos % 11);
    return digito > 9? '0' : String(digito);
};

ValidaCPF.prototype.isSequencia = function() {
    return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo;
};

ValidaCPF.prototype.valida = function() {
    if (typeof this.cpfLimpo === 'undefined') return false;
    if (this.cpfLimpo.length !== 11) return false;
    if (this.isSequencia()) return false;
    let cpfParcial = this.cpfLimpo.slice(0,-2);
    const digitoUm = this.criaDigito(cpfParcial);
    const digitoDois = this.criaDigito(cpfParcial + digitoUm);
    const novoCpf = cpfParcial + digitoUm + digitoDois;
    return novoCpf === this.cpfLimpo;
};

const cpf = new ValidaCPF('705.484.450-52');
console.log(cpf.valida());