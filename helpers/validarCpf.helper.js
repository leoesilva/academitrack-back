function validarCPF(cpf) {
    var i = 0; // index de iteracao
    var somatoria = 0;
    cpf = cpf.toString().split("");
    var dv11 = cpf[cpf.length - 2]; // mais significativo
    var dv12 = cpf[cpf.length - 1]; // menos significativo
    cpf.splice(cpf.length - 2, 2); // remove os digitos verificadores originais
    for (i = 0; i < cpf.length; i++) {
        somatoria += cpf[i] * (10 - i);
    }
    var dv21 = (somatoria % 11 < 2) ? 0 : (11 - (somatoria % 11));
    cpf.push(dv21);
    somatoria = 0;
    for (i = 0; i < cpf.length; i++) {
        somatoria += cpf[i] * (11 - i);
    }
    var dv22 = (somatoria % 11 < 2) ? 0 : (11 - (somatoria % 11));

    return dv11 == dv21 && dv12 == dv22;
}

module.exports = { validarCPF }; // Exporta a função para ser usada em outros arquivos