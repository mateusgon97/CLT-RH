function CalculaSalario(salario) {
    if(salario == undefined) {
        var salario = parseFloat(document.getElementById("salario").value)
    }

    const tabelaINSS = [
        {min: 0, maximo: 1320, aliquota: 0.075},
        {min: 1320.01, maximo: 2571.29, aliquota: 0.09},
        {min: 2571.3, maximo: 3856.94, aliquota: 0.12},
        {min: 3856.94, maximo: 7507.49, aliquota: 0.14}
    ]

    const tabelaIRPF = [
        {min: 0, maximo: 2112, aliquota: 0.0},
        {min: 2112.01, maximo: 2826.65, aliquota: 0.075},
        {min: 2826.66, maximo: 3751.05, aliquota: 0.15},
        {min: 3751.06, maximo: 4664.68, aliquota: 0.225},
        {min: 4664.69, maximo: Infinity, aliquota: 0.275}
    ]

    var salarioBruto = salario;    
    if (salarioBruto > tabelaINSS[3].maximo) {
        salarioBruto = tabelaINSS[3].maximo
    }

    var imposto = 0.0;  
    var faixaAtual = 0.0;

    while (salarioBruto > 0) {
        for (let i = 0; i < tabelaINSS.length; i++) {
            if (salarioBruto <= tabelaINSS[i].maximo & salarioBruto >= tabelaINSS[i].min) {                
                faixaAtual = tabelaINSS[i].aliquota
                var desconto = 0;                
                if (salarioBruto <= tabelaINSS[0].maximo) {
                    desconto = salarioBruto * faixaAtual;
                    salarioBruto = 0.0;
                } else {
                    desconto = (salarioBruto - tabelaINSS[i].min) * faixaAtual;
                    salarioBruto -= (salarioBruto - tabelaINSS[i].min + 0.01)
                }   
                imposto += desconto;
            }                  
        } 
    }
    
    salarioBruto = salario - imposto;
    while (salarioBruto > 0) {
        for (let i = 0; i < tabelaIRPF.length; i++) {
            if (salarioBruto <= tabelaIRPF[i].maximo & salarioBruto >= tabelaIRPF[i].min) {                
                faixaAtual = tabelaIRPF[i].aliquota
                var desconto = 0;                
                desconto = (salarioBruto - tabelaIRPF[i].min) * faixaAtual;
                salarioBruto -= (salarioBruto - tabelaIRPF[i].min + 0.01)
                imposto += desconto;
            }                  
        } 
    }

    var salarioLiquido = salario - imposto;
    var resposta = `O salário líquido será de: R$${salarioLiquido.toLocaleString('pt-BR', {maximumFractionDigits:2})}`
    document.getElementById("result").innerHTML=resposta
    return salarioLiquido;
}

function CalculaFerias() {
    var salario = parseFloat(document.getElementById("salariob").value)
    var dias = parseFloat(document.getElementById("DiasFerias").value)

    var valProporcional = (salario / 30) * dias
    var tercoFerias = valProporcional / 3
    var salarioBruto = valProporcional + tercoFerias
    var calculo = CalculaSalario(salarioBruto)

    var resposta = `O valor bruto de férias será ${salarioBruto.toLocaleString('pt-BR', {maximumFractionDigits:2})}`
    var resposta2 = `O valor líquido de férias será ${calculo.toLocaleString('pt-BR', {maximumFractionDigits:2})}`
    document.getElementById("result").innerHTML=resposta
    document.getElementById("result2").innerHTML=resposta2
}

function CalculaRescisao() {
    var salario = parseFloat(document.getElementById("salario").value);
    var saldoFgts = parseFloat(document.getElementById("fgts").value);
    var feriasVencidas = parseFloat(document.getElementById("fVencidas").value);
    var feriasProporcionais = parseFloat(document.getElementById("fPendentes").value);
    var decimoTercProp = parseFloat(document.getElementById("mesesDecimoTerceiro").value);
    var valorFerias = (feriasVencidas * (salario + (1/3 * salario))) + ((salario / 12) * feriasProporcionais);
    var decimoTerceiro = (salario / 12) * decimoTercProp;
    var rescisaoBruta = valorFerias + decimoTerceiro + saldoFgts;
    var salarioLiquido = CalculaSalario(rescisaoBruta);

    var resultado = `O salário bruto será de: R$${rescisaoBruta.toLocaleString('pt-BR', {maximumFractionDigits:2})}`;
    var resultado2 = `O salário líquido será de: R$${salarioLiquido.toLocaleString('pt-BR', {maximumFractionDigits:2})}`;

    document.getElementById("result").innerHTML = resultado;
    document.getElementById("result2").innerHTML = resultado2;
}







