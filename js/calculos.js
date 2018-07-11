function getCustomizedPerfilMensal(idPerfilMensal, i){
    
    if(idPerfilMensal>=0 && idPerfilMensal<3){
        //SE($D$8=Info!$B$40;1;SE($D$8=Info!$B$43;Info!$D$40;SE($D$8=Info!$B$42;1;0)))
        // idPerfilMensal==0 ? 1 : (idPerfilMensal==2 ? perfil_mensal[idPerfilMensal].consumo : (idPerfilMensal==1 ? 1 : 0))
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
            necessidades_mes[i] = new Number($("input[name='consumosMeses[]']")[i].value*tecnologia_atual[tecnologiaActual].fator_conversao);
            totalNecessidadesEnergia += new Number(necessidades_mes[i]);
        }
    }else if(conheceConsumos!="" && conheceConsumos!= undefined && conheceConsumos==1){
        var calculos = 0;
        for(j=0;j<$("select[name='tipo-consumo[]']").length;j++){
            var inputValue = new Number($("input[name='tipoconsumoval[]']")[j].value);
            var idLocal = $("select[name='tipo-consumo[]']")[j].value;
            calculos += inputValue * consumo_diario_agua[idLocal].valor;
        }
       for(i=0;i<meses_numero_horas.length; i++){
            necessidades_mes[i] = new Number((calculos *  getCustomizedPerfilMensal(idPerfilMensal, i) * (idPerfilSemanal==0 ? perfil_semanal[idPerfilSemanal].valor : ( idPerfilSemanal==1 ? perfil_semanal[idPerfilSemanal].valor : ( idPerfilSemanal==3 ? new Number(getCustomizedPerfilSemanal(idPerfilSemanal)/7).toFixed(2) : 1 )))*meses_numero_horas[i].n_dias*(temperatura_utilizacao-irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua) * fatores_conversao[0]).toFixed(0));
            totalNecessidadesEnergia += new Number(necessidades_mes[i]);
        }       
    }
    total = totalNecessidadesEnergia;
    
    correcaoOrientacao();
    energiaSolarCaptada();
    
    
//    n_colectores = $("#corrige-coletores").val()=="" ? ((totalRacio/area_coletor_solar).toFixed(0)==0 ? 1 : (totalRacio/area_coletor_solar).toFixed(0)) : $("#corrige-coletores").val();
//    area_colectores = n_colectores*area_coletor_solar;
//    volume_acumulacao_colectores =(area_colectores*volume_acumulacao).toFixed(0);
}

function correcaoOrientacao() {
//=SE(ABS(Medidas!$C$9)>70;0;SE(ABS(Medidas!$C$9)>Info!C59;1,14-0,0085*Medidas!$C$9;1))
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
    
    totalCorrecaoOrientacao = correcaoOrientacao.toFixed(3);

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
        
        totalEnergiaArray[i] = new Number((((rendimento_otico * perdas[1].valor) - (coeficient_perdas * ((temperatura_utilizacao - (irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAmb + irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorTempAgua)) / ((getCorrecaoInclinacao(distritoLatitude, i)) * ((totalCorrecaoOrientacao * perdas[2].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr) * (fatores_conversao[1] * 1000 / meses_numero_horas[i].n_horas_sol))))) * ((getCorrecaoInclinacao(distritoLatitude, i)) * ((totalCorrecaoOrientacao * perdas[2].valor) * irradiacao_temp_amb_temp_agua[idDistrito].mesI[i].valorIrr))) * (1 - perdas[0].valor) * meses_numero_horas[i].n_dias).toFixed(0);
        totalEnergia += new Number(totalEnergiaArray[i]);
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
    resume();
    nextStep();
}

function racio() {
    totalRacio = new Number(media(necessidades_mes)/media(totalEnergiaArray)).toFixed(2);
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
    var colectores_num = ($('#coletores-reanalise').val() == "" || $('#coletores-reanalise').val() == undefined ) ? ( new Number(totalRacio/area_coletor_solar).toFixed(0)==0 ? 1 : new Number(totalRacio/area_coletor_solar).toFixed(0) ) : $('#coletores-reanalise').val();
    var coletores_reanalise = $('#coletores-reanalise').val() != "" && $('#coletores-reanalise').val() != undefined ? $('#coletores-reanalise').val() : new Number(colectores_num).toFixed(0);

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

    totalEnergiaBackupMes = [];
    totalEnergiaBackup = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        if (necessidades_mes[i]-totalEnergiaArray2[i] < 0) {
            totalEnergiaBackupMes[i] = 0;
        } else {
            totalEnergiaBackupMes[i] = necessidades_mes[i] - totalEnergiaArray2[i];
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
        necessidades_mes_kWh[i] = new Number((conheceConsumos==0 && consumoEngergia==1) ? $("input[name='consumosMeses[]']")[i].value*tecnologia_atual[$("#sis-prod").val()].fator_conversao : ( (conheceConsumos==0 && consumoEngergia==0) ? $("input[name='consumoAnualTotal']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao*meses_numero_horas[i].aqs_mensal : necessidades_mes[i]*fatores_conversao[1])).toFixed(0);
        total_mes_kWh += new Number(necessidades_mes_kWh[i]);
    }
    
}


function cenarioI() {
    var inputRendimento = ($("#rend").val()==2) ? $('#iRendMan').val() : $("#rend").val();
    var sist_aqs = $("#sis-prod").val();
    var age = $("#age").val();
    var custosUnit = $("#custo-unit-input").val();
    var conheceConsumos = $("#conhece-consumo").val();
    var consumoEngergia = $("#consumo-energia").val();
    var rendCenarioI=0;
    
    cenarioI_mes = [];
    cenarioI_custos = [];
    total_cenarioI_mes = 0;
    total_cenarioI_custos = 0;
    
    //=SE(E(Dados!$C$12=Info!$C$2;Consumos!$C$2=Info!$C$18);Consumos!C5*PROCV(Dados!$C$5;Info!$B$8:$H$15;7);SE(E(Dados!$C$12=Info!$C$2;Consumos!$C$2=Info!$C$17);Consumos!$C$4*PROCV(Dados!$C$5;Info!$B$8:$H$15;7)*Info!E101;                                                                                                                   C3/SE(Dados!$C$6=Info!$C$4;SE(Dados!$C$7=Info!$D$7;PROCV(Dados!$C$5;Info!$B$8:$H$15;3);SE(Dados!$C$7=Info!$E$7;PROCV(Dados!$C$5;Info!$B$8:$H$15;4);PROCV(Dados!$C$5;Info!$B$8:$H$15;5)));Dados!$C$6)))
    // se (conheceConsumos==0 && consumoEngergia==0) ? $("input[name='consumosMeses[]']")[i].value*tecnologia_atual[$("#sis-prod").val()].fator_conversao : ( (conhece_consumos==0 && consumoEngergia==1) ? $("input[name='consumoAnualTotal']").value*tecnologia_atual[$("#sis-prod").val()].fator_conversao*meses_numero_horas[i].aqs_mensal : (necessidades_mes_kWh[i]/ ( inpuinputRendimento==0) ? ()) 
   
    
    for (i = 0; i < meses_numero_horas.length; i++) {
        
        if(conheceConsumos==0 && consumoEngergia==1){
            rendCenarioI = $("input[name='consumosMeses[]']")[i].value*tecnologia_atual[$("#sis-prod").val()].fator_conversao;
        }else if (conheceConsumos==0 && consumoEngergia==0){
            rendCenarioI = $("input[name='consumoAnualTotal']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao*meses_numero_horas[i].aqs_mensal
        }else if (inputRendimento == 0 && tecnologia_atual[sist_aqs].rendimento[age].nome == idades[age]){
            rendCenarioI = necessidades_mes_kWh[i] / tecnologia_atual[sist_aqs].rendimento[age].valor;        
        }else{
            rendCenarioI = inputRendimento;
        }

        cenarioI_mes[i] = new Number(rendCenarioI).toFixed(0);
        cenarioI_custos[i] = new Number(cenarioI_mes[i] * custosUnit).toFixed(2);
        total_cenarioI_mes += new Number(cenarioI_mes[i]);
        total_cenarioI_custos += new Number(cenarioI_custos[i]);
    }
    total_cenarioI_custos = total_cenarioI_custos.toFixed(2);
}


function cenarioF() {    

    var inputRendimento = new Number(($("#rend").val()==2) ? $('#iRendMan').val() : $("#rend").val() / 100);
    var sist_aqs = $("#sis-prod").val();
    var novaFonte = $("#nova-fonte").val();
    var age = $("#age").val();
    var custosUnit = $("#custo-unit-medidas").val();
    var rendCenarioF = 0;
    cenarioF_mes = [];
    total_cenarioF_mes = 0;
    cenarioF_custos = [];
    total_cenarioF_custos = 0;
    //=SE(OU(Medidas!$C$6=Info!$C$3;Medidas!$C$6="");D3*SE(Dados!$C$7=Info!$D$7;PROCV(Dados!$C$5;Info!$B$8:$H$15;3);SE(Dados!$C$7=Info!$E$7;PROCV(Dados!$C$5;Info!$B$8:$H$15;4);PROCV(Dados!$C$5;Info!$B$8:$H$15;5)))/PROCV(Medidas!$C$2;Info!$B$22:$G$25;3);Cálculos_Solar!H3*Info!$C$73/PROCV(Medidas!$C$2;Info!$B$22:$G$25;3))
    // se  ($("#acoplar-solar").val()==1 || $("#acoplar-solar").val()=="" || $("#acoplar-solar").val()== undefined ) ? cenarioI_mes[i]*tecnologia_atual[sist_aqs].rendimento[age].valor/tecnologia_futura[novaFonte].rendimento : totalEnergiaBackupMes[i]*fatores_conversao[1]/tecnologia_futura[novaFonte].rendimento;
//    if (inputRendimento == 1 && sistemas_prod_aqs[sist_aqs].rendimento[age].nome == idades[age]) {
//        rendCenarioF = tecnologia_atual[sist_aqs].rendimento[age].valor;
//    }else{
//        rendCenarioI = inputRendimento;
//    }
    
    for (i = 0; i < meses_numero_horas.length; i++) {
        rendCenarioF = isNaN((($("#acoplar-solar").val()==1 || $("#acoplar-solar").val()=="" || $("#acoplar-solar").val()== undefined ) ? cenarioI_mes[i]*tecnologia_atual[sist_aqs].rendimento[age].valor/tecnologia_futura[novaFonte].rendimento : totalEnergiaBackupMes[i]*fatores_conversao[1]/tecnologia_futura[novaFonte].rendimento)) ? 0 : ($("#acoplar-solar").val()==1 || $("#acoplar-solar").val()=="" || $("#acoplar-solar").val()== undefined ) ? cenarioI_mes[i]*tecnologia_atual[sist_aqs].rendimento[age].valor/tecnologia_futura[novaFonte].rendimento : totalEnergiaBackupMes[i]*fatores_conversao[1]/tecnologia_futura[novaFonte].rendimento;
        cenarioF_mes[i] = new Number(rendCenarioF).toFixed(0);
        total_cenarioF_mes += new Number(cenarioF_mes[i]);
        cenarioF_custos[i] = new Number(cenarioF_mes[i] * custosUnit).toFixed(2);
        total_cenarioF_custos += new Number(cenarioF_custos[i]);
    }
    total_cenarioF_custos = total_cenarioF_custos.toFixed(2);
    
}

function reduction(){
    reducao_mes = [];
    total_reducao_mes = 0;
    reducao_consumos=[];
    total_reducao_consumos = 0;

    for (i = 0; i < meses_numero_horas.length; i++) {
        reducao_mes[i] = new Number(cenarioI_custos[i]-cenarioF_custos[i]).toFixed(2);
        total_reducao_mes += new Number(reducao_mes[i]);
        reducao_consumos[i] = new Number(cenarioI_mes[i]-cenarioF_mes[i]).toFixed(0);       
        total_reducao_consumos += new Number(reducao_consumos[i]);
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

    var novaFonte = $("#nova-fonte").val();
    var inputColetores = $("#coletores-reanalise").val();
    
    if($("#acoplar-solar").val()==1 && $("#acoplar-solar").val()!="" && $("#acoplar-solar").val()!=undefined){
        $(".solar-termico-results").attr("style","display:none");
    }else{
        $(".solar-termico-results").removeAttr("style");
    }
    consumosCI = total_cenarioI_mes;
    custosCI = total_cenarioI_custos;
    contributoST = totalEnergiaSolarPerc;
    consumosCF = total_cenarioF_mes;
    custosCF = total_cenarioF_custos;
    reducaoEuro = total_cenarioI_custos - total_cenarioF_custos;
    reducaoPercent = reducaoEuro/total_cenarioI_custos;
    //if($("#acoplar-solar").val()==0){
    n_colectores_final = (inputColetores != undefined && inputColetores != "") ? new Number(inputColetores) : new Number(totalRacio / area_coletor_solar).toFixed(0);
    area_colectores_final = (inputColetores == undefined || inputColetores == "") ? new Number(n_colectores_final*area_coletor_solar).toFixed(2) : new Number(inputColetores * area_coletor_solar).toFixed(2);
    
    //ARRED(Resultados!$C$3/Info!$C$72/Info!$C$73/PROCV(MÁXIMO(Resultados!$C$3:$C$14);Resultados!$A$3:$C$14;1)/(Dados!$C$10-Info!$C$52);-2)
    var position = max(necessidades_mes_kWh);
    volume_acumulacao_resume = new Number(necessidades_mes_kWh[0]/fatores_conversao[0]/fatores_conversao[1]/meses_numero_horas[position].n_dias/($("#temp-req").val()-temperatura_media)).toFixed(0);
    
    //=SE(C11<Info!$B$90;Info!$C$90*C11;SE(C11>Info!$B$92;Info!$C$92*C11;Info!$C$91*C11))
    colectores = (area_colectores_final<10) ? area_colectores_final*investimento[0].info[0].valor : ((area_colectores_final>100) ? area_colectores_final*investimento[0].info[2].valor : area_colectores_final*investimento[0].info[1].valor); 
    //}
    //=MÁXIMO(Resultados!$F$3:$F$14)/PROCV(Medidas!$C$2;Info!$B$22:$D$25;3)/PROCV(MÁXIMO(Resultados!$F$3:$F$14);Resultados!$A$3:$F$14;1)/2*PROCV(Medidas!$C$2;Info!$B$22:$E$25;4)1
    equipamento =  maxValor(cenarioF_mes)/tecnologia_futura[novaFonte].rendimento/meses_numero_horas[max(cenarioF_mes)].n_dias/2*tecnologia_futura[novaFonte].investimento;
    //=SE(OU(Dados!$C$5=Info!$B$13;Dados!$C$5=Info!$B$14;Dados!$C$5=Info!$B$15);SE(C15<Info!$B$94;Info!$C$94*C15;SE(C15>Info!$B$96;Info!$C$96*C15;Info!$C$95*C15));SE(C15<Info!$B$94;Info!$C$94*C15;SE(C15>Info!$B$96;Info!$C$96*C15;Info!$C$95*C15))/2)
    var dep_tem = (volume_acumulacao_resume<500 ? volume_acumulacao_resume*investimento[1].info[0].valor : (volume_acumulacao_resume>2000 ? volume_acumulacao_resume*investimento[1].info[2].valor : volume_acumulacao_resume*investimento[1].info[1].valor ) );
    depositos_acessorios = ($("#sis-prod").val()>=5 && $("#sis-prod").val()<8) ? dep_tem : dep_tem/2;
    //=SE(Medidas!$C$6=Info!$C$2;SOMA($C$18:$C$20)*Info!$C$97;SOMA($C$19:$C$20)*Info!$C$97)
    instalacao = ($("#acoplar-solar").val()==0) ?  (colectores + equipamento + depositos_acessorios)*investimento[2].valor_direto : (equipamento + depositos_acessorios)*investimento[2].valor_direto;
    //=SE(Medidas!$C$6=Info!$C$2;SOMA($C$18:$C$21);SOMA($C$19:$C$21))
    investimento_resume = ($("#acoplar-solar").val()==0 && $("#acoplar-solar").val()!="" && $("#acoplar-solar").val()!=undefined) ? (colectores + equipamento + depositos_acessorios + instalacao) : (equipamento + depositos_acessorios + instalacao);
    //=C17*Info!$C$98
    op_manutencao = investimento_resume*investimento[3].valor_direto;
    //=C17/C7
    periodo_retorno = investimento_resume/reducaoEuro;
    
    
     $('#consumoCI').html(consumosCI + ' kWh');
    $('#custosCI').html(new Number(custosCI).toFixed(0) + ' €');
    $('#consumosCF').html(consumosCF + ' kWh');
    $('#custosCF').html(new Number(custosCF).toFixed(0) + ' €');
    $('#contributoSolarTermico').html(new Number(contributoST*100).toFixed(0) + '%');
    $('#reducaoValor').html(reducaoEuro.toFixed(0) + ' €');
    $('#reducaoPercent').html(new Number(reducaoPercent*100).toFixed(0) + '%');
    $('#numeroColetores').html(n_colectores_final + ' Unidades');
    $('#areaColetores').html(area_colectores_final + ' m2');
    $('#vAcumulacao').html(new Number(volume_acumulacao_resume).toFixed(0));
    $('#investimentoTotal').html(investimento_resume.toFixed(0) + ' €');
    $('#custosColectores').html(colectores.toFixed(0) + ' €');
    $('#custosEquipamento').html(equipamento.toFixed(0) + ' €');
    $('#custosDepositos').html(depositos_acessorios.toFixed(0) + ' €');
    $('#custosInstalacao').html(instalacao.toFixed(0) + ' €');
    $('#custosOpManutencao').html(op_manutencao.toFixed(0) + ' €');
    $('#periodoRetorno').html(periodo_retorno.toFixed(1) + ' anos');

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

/*function min(calculos) {
    var min=0;
    for (i = 0; i < calculos.length; i++) {
        if(min==0){
            min = calculos[i];
        }else if (calculos[i] < min) {
            min = calculos[i];
        }
    }
    return min;
}*/