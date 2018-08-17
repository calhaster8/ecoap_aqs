function getCustomizedPerfilMensal(idPerfilMensal, i){
    
    if(idPerfilMensal>=0 && idPerfilMensal<3){
        
        if(i>=4 && i<9){
            return idPerfilMensal==0 ? 1 : (idPerfilMensal==2 ? 1 : (idPerfilMensal==1 ? perfil_mensal[idPerfilMensal].consumo : 0 ));            
        }else{
            return idPerfilMensal==0 ? 1 : (idPerfilMensal==2 ? perfil_mensal[idPerfilMensal].consumo : ( idPerfilMensal==1 ? 1 : 0 ));
        }
    }else{
        return new Number($('#perfil-mensal-input' + (i + 1) ).val())/100;
    }

}

function getCustomizedPerfilSemanal(idPerfilSemanal){      

    var perfilVal = 0;
    if (idPerfilSemanal == 3) {

        var soma = 0;
        for(k=1;k<8;k++){
            soma += new Number($('#perfil-semanal-input'+k).val());
        }
        perfilVal = (soma/7)/100;
    }
    return perfilVal;

}

function totalNecessidadesEnergiaFunction() {
    var idPerfilMensal = new Number($('#perfil-mensal').val());
    var idPerfilSemanal = new Number($('#perfil-semanal').val());
    var tmpReq = new Number($("#temp-req").val());
    var idDistrito = new Number($('#distrito').val());
    var consumoTipo = $("#consumo-energia").val();
    var tecnologiaActual = $("#sis-prod").val();
    necessidades_mes = [];
    totalNecessidadesEnergia = 0;
    total = 0;
    var conheceConsumos = $("#conhece-consumo").val();
    
    if(conheceConsumos!="" && conheceConsumos!= undefined && conheceConsumos==0 && consumoTipo==0){
        for(i=0;i<meses_numero_horas.length; i++){
            necessidades_mes[i] = new Number($("input[name='consumoAnualTotal']").val()*meses_numero_horas[i].aqs_mensal*tecnologia_atual[tecnologiaActual].fator_conversao);
            totalNecessidadesEnergia += new Number(necessidades_mes[i]);
        }
    }else if(conheceConsumos!="" && conheceConsumos!= undefined && conheceConsumos==0 && consumoTipo==1){
        
        for(i=0;i<meses_numero_horas.length; i++){
            necessidades_mes[i] = new Number($("input[name='consumosMeses[" + i + "]']").val() * tecnologia_atual[tecnologiaActual].fator_conversao);
            totalNecessidadesEnergia += new Number(necessidades_mes[i]);
        }
    }else if(conheceConsumos!="" && conheceConsumos!= undefined && conheceConsumos==1){
        var calculos = 0;
        
        for(j=1; j < rowId + 1; j++) {
            var inputValue = new Number($('#tipo-consumo-value' + j).val());
            var idLocal = $('#tipo-consumo' + j).val();
            calculos += inputValue * consumo_diario_agua[idLocal].valor;
        }
       for(i=0;i<meses_numero_horas.length; i++){
            necessidades_mes[i] = (calculos *  getCustomizedPerfilMensal(idPerfilMensal, i) * (idPerfilSemanal==0 ? perfil_semanal[idPerfilSemanal].valor : ( idPerfilSemanal==1 ? perfil_semanal[idPerfilSemanal].valor : ( idPerfilSemanal==3 ? new Number(getCustomizedPerfilSemanal(idPerfilSemanal)/7) : 1 )))*meses_numero_horas[i].n_dias*(temperatura_utilizacao-irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua) * fatores_conversao[0]);
            totalNecessidadesEnergia += necessidades_mes[i];
        }       
    }
    total = totalNecessidadesEnergia;
    
    correcaoOrientacao();
    energiaSolarCaptada();
    
}

function correcaoOrientacao() {
    
    var orientacaoInput = $('#orientacao-solar').val();
    var correcaoOrientacao = 0;

    //valor absoluto
    var orientacaoInputAbs = 0;
    if(orientacaoInput!="" && orientacaoInput!=undefined && orientacaoInput<0){
        orientacaoInputAbs = orientacaoInput * (-1);
    }else{
        orientacaoInputAbs = orientacaoInput;
    }
    if(orientacaoInputAbs!="" && orientacaoInputAbs!=undefined){
        if(orientacaoInputAbs > 70) {
            correcaoOrientacao = 0;
        } else if(orientacaoInputAbs > 0) {
            correcaoOrientacao = 1.14 - 0.0085 * orientacaoInput;
        } else{
            correcaoOrientacao = 1;
        }
    }
    
    totalCorrecaoOrientacao = correcaoOrientacao;

}

function getCorrecaoInclinacao(latitude, i){
    for(j=0;j<correcao_inclinacao.length;j++){
        if(latitude==correcao_inclinacao[j].latitude){
            return correcao_inclinacao[j].meses[i].valor;
        }
    }
}

function energiaSolarCaptada() {
    var idDistrito = new Number($('#distrito').val());
    var distritoLatitude = new Number($('#distrito-latitude').val());

    totalEnergiaArray = [];
    totalEnergia = 0;

    for(i=0; i<meses_numero_horas.length;i++){
        
        totalEnergiaArray[i] = (((rendimento_otico * perdas[1].valor) - (coeficient_perdas * ((temperatura_utilizacao - (irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAmb + irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua)) / ((getCorrecaoInclinacao(distritoLatitude, i)) * ((totalCorrecaoOrientacao * perdas[2].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr) * (fatores_conversao[1] * 1000 / meses_numero_horas[i].n_horas_sol))))) * ((getCorrecaoInclinacao(distritoLatitude, i)) * ((totalCorrecaoOrientacao * perdas[2].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr))) * (1 - perdas[0].valor) * meses_numero_horas[i].n_dias;
        totalEnergia += totalEnergiaArray[i];
    }

    racio();
    energiaSolarCaptada2();
    energiaSolarUtilizada();
    energiaSolarUtilizadaPercent();
    energiaBackup();
    energiaBackupPercent();
    excedenteSolar();
    excedenteSolarPerc();
    necessidadesEnergeticaskWh();
    cenarioI();
    cenarioF();
    reduction();
    var result = resume();
    if(result==1){
        nextStep();
    }
}

function racio() {
    totalRacio = new Number(media(necessidades_mes)/media(totalEnergiaArray));
}

function media(el){
    
       var media=0;
    for(i=0;i<el.length;i++){
        if(i>=4 && i<9){
        media += new Number(el[i]);}
    }
    return media/5;
}

function energiaSolarCaptada2() {
    var colectores_num = ($('#corrige-coletores').val() == "" || $('#corrige-coletores').val() == undefined ) ? ( new Number(totalRacio/area_coletor_solar)==0 ? 1 : new Number(totalRacio/area_coletor_solar).toFixed(0) ) : $('#corrige-coletores').val();
    var coletores_reanalise = $('#corrige-coletores').val() != "" && $('#corrige-coletores').val() != undefined ? $('#corrige-coletores').val() : colectores_num;

    totalEnergiaArray2 = [];
    totalEnergia2 = 0;

    for (i = 0; i < meses_numero_horas.length; i++) { 

        totalEnergiaArray2[i] = totalEnergiaArray[i] * coletores_reanalise * 2.25;  
        
        totalEnergia2 += totalEnergiaArray2[i];
    }
}

function energiaSolarUtilizada() {

    totalEnergiaSolarUtilizada = [];
    totalEnergiaSolar = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        if (totalEnergiaArray2[i] > necessidades_mes[i]){
            totalEnergiaSolarUtilizada[i] = necessidades_mes[i];
        }else{
            totalEnergiaSolarUtilizada[i] = totalEnergiaArray2[i];
        }
        
        totalEnergiaSolar += totalEnergiaSolarUtilizada[i];
    }
}

function energiaSolarUtilizadaPercent() {

    totalEnergiaSolarUtilizadaPerc = [];
    totalEnergiaSolarPerc = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        totalEnergiaSolarUtilizadaPerc[i] = totalEnergiaSolarUtilizada[i] / necessidades_mes[i];
    }
    totalEnergiaSolarPerc = totalEnergiaSolar / total;
}

function energiaBackup() {
    var novaFonte = $("#nova-fonte").val();
    var rendimentoNovaFonte = $("#rendimento-medidas").val()!="" && $("#rendimento-medidas").val()>0 ? $("#rendimento-medidas").val() : tecnologia_futura[novaFonte].rendimento ;
    totalEnergiaBackupMes = [];
    totalEnergiaBackup = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        if (necessidades_mes[i]-totalEnergiaArray2[i] < 0) {
            totalEnergiaBackupMes[i] = 0;
        } else {
            totalEnergiaBackupMes[i] = (necessidades_mes[i] - totalEnergiaArray2[i])/rendimentoNovaFonte;
        }

        totalEnergiaBackup += totalEnergiaBackupMes[i];
    }
}

function energiaBackupPercent() {

    totalEnergiaBackupMesPerc = [];
    totalEnergiaBackupPerc = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        totalEnergiaBackupMesPerc[i] = totalEnergiaBackupMes[i] / necessidades_mes[i];
    }
    totalEnergiaBackupPerc = totalEnergiaBackup / total;
}

function excedenteSolar() {

    totalExcedenteSolarArray = [];
    totalExcedenteSolar = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {       

        totalExcedenteSolarArray[i] = totalEnergiaArray2[i] - totalEnergiaSolarUtilizada[i];
        totalExcedenteSolar += totalExcedenteSolarArray[i];
    }
}

function excedenteSolarPerc() {

    totalExcedenteSolarArrayPerc = [];
    totalExcedenteSolarPerc = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        totalExcedenteSolarArrayPerc[i] = totalExcedenteSolarArray[i] / totalEnergiaArray2[i];
        
    }
    totalExcedenteSolarPerc = totalExcedenteSolar/totalEnergia2;
    
}

function necessidadesEnergeticaskWh(){
    necessidades_mes_kWh = [];
    total_mes_kWh = 0;
    var conheceConsumos = $("#conhece-consumo").val();
    var consumoEngergia = $("#consumo-energia").val();
    
    for (i = 0; i < meses_numero_horas.length; i++) {
        necessidades_mes_kWh[i] = (conheceConsumos==0 && consumoEngergia==1) ? $("input[name='consumosMeses["+i+"]']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao : ( (conheceConsumos==0 && consumoEngergia==0) ? $("input[name='consumoAnualTotal']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao*meses_numero_horas[i].aqs_mensal : necessidades_mes[i]*fatores_conversao[1]);
        total_mes_kWh += necessidades_mes_kWh[i];
    }
    
}


function cenarioI() {
    
    var sist_aqs = $("#sis-prod").val();
    var inputRendimento = ($("#rend").val()==2) ? (sist_aqs==0 ? $('#iRendMan').val() : $('#iRendMan').val()/100) : $("#rend").val();
    var age = $("#age").val();
    var custosUnit = $('#custo-unit-input').val();
    var conheceConsumos = $("#conhece-consumo").val();
    var consumoEngergia = $("#consumo-energia").val();
    var rendCenarioI=0;
    
    cenarioI_mes = [];
    cenarioI_custos = [];
    total_cenarioI_mes = 0;
    total_cenarioI_custos = 0;
    
    for (i = 0; i < meses_numero_horas.length; i++) {
        
        if(conheceConsumos==0 && consumoEngergia==1){
            rendCenarioI = $("input[name='consumosMeses["+i+"]']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao;
        }else if (conheceConsumos==0 && consumoEngergia==0){
            rendCenarioI = $("input[name='consumoAnualTotal']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao*meses_numero_horas[i].aqs_mensal;
        }else if (inputRendimento == 0 && tecnologia_atual[sist_aqs].rendimento[age].nome == idades[age]){
            rendCenarioI = necessidades_mes_kWh[i] / tecnologia_atual[sist_aqs].rendimento[age].valor;        
        }else{
            rendCenarioI = necessidades_mes_kWh[i] / inputRendimento;
        }

        cenarioI_mes[i] = rendCenarioI;
        cenarioI_custos[i] = cenarioI_mes[i] * custosUnit / tecnologia_atual[sist_aqs].fator_conversao;
        total_cenarioI_mes += cenarioI_mes[i];
        total_cenarioI_custos += cenarioI_custos[i];
    }
    total_cenarioI_custos = total_cenarioI_custos;
}


function cenarioF() {    

    var sist_aqs = $("#sis-prod").val();
    var inputRendimento = ($("#rend").val()==2) ? (sist_aqs==0 ? $('#iRendMan').val() : $('#iRendMan').val()/100) : $("#rend").val();
    var novaFonte = $("#nova-fonte").val();
    var rendimentoNovaFonte = $("#rendimento-medidas").val()!="" && $("#rendimento-medidas").val()>0 ? $("#rendimento-medidas").val() : tecnologia_futura[novaFonte].rendimento ;
    var age = $("#age").val();
    var custosUnit = $('#custo-unit-medidas').val();
    var rendCenarioF = 0;
    cenarioF_mes = [];
    total_cenarioF_mes = 0;
    cenarioF_custos = [];
    total_cenarioF_custos = 0;
    
    var rendTmp = (inputRendimento!=0 && inputRendimento!="" && inputRendimento>0 && (age=="" || age==undefined) ? inputRendimento : tecnologia_atual[sist_aqs].rendimento[age].valor);
    
    for (i = 0; i < meses_numero_horas.length; i++) {
        rendCenarioF = isNaN((($("#acoplar-solar").val()==1 || $("#acoplar-solar").val()=="" || $("#acoplar-solar").val()== undefined ) ? cenarioI_mes[i]*rendTmp/rendimentoNovaFonte : totalEnergiaBackupMes[i]*fatores_conversao[1]/rendimentoNovaFonte)) ? 0 : ($("#acoplar-solar").val()==1 || $("#acoplar-solar").val()=="" || $("#acoplar-solar").val()== undefined ) ? cenarioI_mes[i]*rendTmp/rendimentoNovaFonte : totalEnergiaBackupMes[i]*fatores_conversao[1];
        cenarioF_mes[i] = rendCenarioF;
        total_cenarioF_mes += cenarioF_mes[i];
        cenarioF_custos[i] = cenarioF_mes[i] * custosUnit / tecnologia_futura[novaFonte].fator_conversao;
        total_cenarioF_custos += cenarioF_custos[i];
    }
    total_cenarioF_custos = total_cenarioF_custos;   
}

function reduction(){
    reducao_mes = [];
    total_reducao_mes = 0;
    reducao_consumos=[];
    total_reducao_consumos = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        reducao_mes[i] = cenarioI_custos[i]-cenarioF_custos[i];
        total_reducao_mes += reducao_mes[i];
        reducao_consumos[i] = cenarioI_mes[i]-cenarioF_mes[i];       
        total_reducao_consumos += reducao_consumos[i];
    }
}



function resume(){

        // resume vars
    var consumosCI = 0;
    var custosCI = 0;    
    var contributoST = 0;
    var consumosCF = 0;
    var custosCF = 0;
    var reducaoEuro = 0;
    var reducaoPercent = 0;
    var n_colectores_final = 0;
    var area_colectores_final = 0;
    var volume_acumulacao_resume = 0;
    var investimento_resume = 0;
    var colectores = 0;
    var equipamento = 0;
    var depositos_acessorios = 0;
    var instalacao = 0;
    var op_manutencao = 0;
    var periodo_retorno = 0;
    var excedente_verao_resume = 0;
    var excedente_final_resume = 0;

    var novaFonte = $("#nova-fonte").val();
    var inputColetores = $("#corrige-coletores").val();
    var rendimentoNovaFonte = $("#rendimento-medidas").val()!="" && $("#rendimento-medidas").val()>0 ? $("#rendimento-medidas").val() : tecnologia_futura[novaFonte].rendimento ; 
    
    if($("#acoplar-solar").val()==1 && $("#acoplar-solar").val()!="" && $("#acoplar-solar").val()!=undefined){
        $(".solar-termico-results").attr("style","display:none");
        $('.nota-acoplar').html('*O investimento estimado incorpora os custos com equipamentos/tecnologia, com depósitos e/ou acessórios e os respetivos custos de instalação.').show();
    }else{
        $(".solar-termico-results").removeAttr("style");
        $('.nota-acoplar').html('*O investimento estimado incorpora os custos com o sistema solar térmico, com equipamentos/tecnologia, com depósitos e/ou acessórios e os respetivos custos de instalação.').show();
    }
    consumosCI = total_cenarioI_mes;
    custosCI = total_cenarioI_custos;
    contributoST = totalEnergiaSolarPerc;
    consumosCF = total_cenarioF_mes;
    custosCF = total_cenarioF_custos;
    reducaoEuro = total_cenarioI_custos - total_cenarioF_custos;
    
    if(reducaoEuro<=0){
        $("#errorAQS").html("A implementação da medida seleccionada resultará num aumento de custos face à situação actual.");
    }
    reducaoPercent = reducaoEuro/total_cenarioI_custos;
    
    n_colectores_final = (inputColetores != undefined && inputColetores != "") ? new Number(inputColetores) : new Number((totalRacio/area_coletor_solar).toFixed(0));
    if(n_colectores_final<avisos[4].valor){
        alert(avisos[4].mensagem);
        return 0;
    }
    
    area_colectores_final = (inputColetores == undefined || inputColetores == "") ? new Number((n_colectores_final*area_coletor_solar).toFixed(0)) : new Number((inputColetores*area_coletor_solar).toFixed(0));
    
    
    var position = max(necessidades_mes_kWh);
    volume_acumulacao_resume = arred(necessidades_mes_kWh[0]/fatores_conversao[0]/fatores_conversao[1]/meses_numero_horas[position].n_dias/($("#temp-req").val()-temperatura_media),-2);
    
    
    colectores = (area_colectores_final<10) ? area_colectores_final*investimento[0].info[0].valor : ((area_colectores_final>100) ? area_colectores_final*investimento[0].info[2].valor : investimento[0].info[1].valor*area_colectores_final); 
    
    equipamento =  maxValor(cenarioF_mes)/rendimentoNovaFonte/meses_numero_horas[max(cenarioF_mes)].n_dias/2*tecnologia_futura[novaFonte].investimento;
    
    var dep_tem = (volume_acumulacao_resume<500 ? volume_acumulacao_resume*investimento[1].info[0].valor : (volume_acumulacao_resume>2000 ? volume_acumulacao_resume*investimento[1].info[2].valor : volume_acumulacao_resume*investimento[1].info[1].valor ) );
    depositos_acessorios = ($("#sis-prod").val()>=5 && $("#sis-prod").val()<8) ? dep_tem : dep_tem/2;
    
    instalacao = ($("#acoplar-solar").val()==0) ?  (colectores + equipamento + depositos_acessorios)*investimento[2].valor_direto : (equipamento + depositos_acessorios)*investimento[2].valor_direto;
    
    investimento_resume = ($("#acoplar-solar").val()==0 && $("#acoplar-solar").val()!="" && $("#acoplar-solar").val()!=undefined) ? (colectores + equipamento + depositos_acessorios + instalacao) : (equipamento + depositos_acessorios + instalacao);
    
    op_manutencao = investimento_resume*investimento[3].valor_direto;
    
    periodo_retorno = investimento_resume/reducaoEuro;

    excedente_verao_resume = (maxValor(totalExcedenteSolarArrayPerc) > avisos[0].valor) ? maxValor(totalExcedenteSolarArrayPerc) : "";
    excedente_final_resume = excedente_verao_resume * 100;
    
    
    $('#consumoCI').html(consumosCI.toFixed(0) + ' kWh');
    $('#custosCI').html(new Number(custosCI).toFixed(0) + ' €');
    $('#consumosCF').html(consumosCF.toFixed(0) + ' kWh');
    $('#custosCF').html(new Number(custosCF).toFixed(0) + ' €');
    $('#contributoSolarTermico').html(new Number(contributoST*100).toFixed(0) + '%');
    $('#reducaoValor').html(reducaoEuro.toFixed(0) + ' €');
    $('#reducaoPercent').html(new Number(reducaoPercent*100).toFixed(0) + '%');
    $('#numeroColetores').html(n_colectores_final.toFixed(0));
    $('#areaColetores').html(area_colectores_final.toFixed(0) + ' m2');
    $('#vAcumulacao').html(new Number(volume_acumulacao_resume).toFixed(0) + ' litros');
    $('#investimentoTotal').html(investimento_resume.toFixed(0) + ' €');
    $('#custosColectores').html(colectores.toFixed(0) + ' €');
    $('#custosEquipamento').html(equipamento.toFixed(0) + ' €');
    $('#custosDepositos').html(depositos_acessorios.toFixed(0) + ' €');
    $('#custosInstalacao').html(instalacao.toFixed(0) + ' €');
    $('#custosOpManutencao').html(op_manutencao.toFixed(0) + ' €');

    if (periodo_retorno < 0) {
        $('#periodoRetorno').html('-');
    } else {
        $('#periodoRetorno').html(periodo_retorno.toFixed(1) + ' anos');
    }

    if (excedente_final_resume > 40 && excedente_final_resume != undefined && excedente_final_resume != '' && n_colectores_final >= 1.5) {
        $('.excedente-note').html(avisos[0].mensagem);
        $('.excedente-note').show();
    } else {
        $('.excedente-note').html('');
        $('.excedente-note').hide();
    }


    return 1;
}

function max(calculos) {

    var max = 0;
    var position = 0;
    for (i = 0; i < calculos.length; i++) {
        if (new Number(calculos[i]) > new Number(max)) {
            max = calculos[i];
            position = i;
        }
    }
    return position;
}

function maxValor(calculos) {

    var max = 0;
    for (i = 0; i < calculos.length; i++) {
        if (new Number(calculos[i]) > new Number(max)) {
            max = calculos[i];
        }
    }
    return max;
}

function arred(valorArrendondar, comoArredondar) {
    var valor = 0;

    if (comoArredondar == (-1)) {
        valor = Math.round(valorArrendondar / 10) * 10;
    } else if (comoArredondar == (-2)) {
        valor = Math.round(valorArrendondar / 100) * 100;
    } else if (comoArredondar == (-3)) {
        valor = Math.round(valorArrendondar / 1000) * 1000;
    } else if (comoArredondar == (-4)) {
        valor = Math.round(valorArrendondar / 10000) * 10000;
    }

    return valor;
}