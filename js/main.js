$(document).ready(function() {
    buildDistrito();
    buildSistemaProdAQS();
    buildAge();
    getCopRendValues();
    buildConheceConsumo();
    buildConsumoEnergia();
    buildTipoConsumo();
    buildNovaFonte();
    buildOrientacaoSolar();
    buildPerfilMensal();
    buildPerfilSemanal();
    getSistemasProdAQSValues();
    
    $('#temp-req').val(temperatura_utilizacao);
    $('#distrito').change(getDistrictValues);
    $('#sis-prod').change(getSistemasProdAQSValues);
    $('#cop').change(getCopRendValues);
    $('#rend').change(getCopRendValues);
    
    $("#consumo-energia").change(buildConsumos);
    $("#tipo-consumo").change(setNumberOf);
    
    $("#add").click(addRowWaterUsage);
    $("#remove").click(removeRowWaterUsage);
    $("#nova-fonte").change(setNovaFonteData);
    
    $("#acoplar-solar").change(function(){
        if($(this).val()!="" && $(this).val()!=undefined && $(this).val()==0){
            $("#tbl-acoplar-solar").show();            
        }else{
            $("#tbl-acoplar-solar").hide();
            $("#orientacao-sel").val("");      
            $("#orientacao-solar").val("");
        }
    });
    
    $("#orientacao-sel").change(function(){
        if($("#orientacao-sel").val()!="" && $("#orientacao-sel").val()!= undefined && $("#orientacao-sel").val()==5){
            $("#orientacao-solar").removeAttr("disabled");
            $("#orientacao-solar").val("");
        }else if($("#orientacao-sel").val()!="" && $("#orientacao-sel").val()!= undefined && $("#orientacao-sel").val()>=0){            
            $("#orientacao-solar").val(desvios[$("#orientacao-sel").val()].valor);
            $("#orientacao-solar").attr("disabled","disabled");
        }else{
            $("#orientacao-solar").val("");
            $("#orientacao-solar").attr("disabled","disabled");
        }
    });
    
    $("#perfil-mensal").change(function(){
        if($(this).val()!="" && $(this).val()!=undefined && $(this).val()==3){
            $("#def-perfil-mensal").show();            
        }else{
            $("#def-perfil-mensal").hide();
            $('#def-perfil-mensal input').val("");
        }
    });
    
    $("#perfil-semanal").change(function(){
        if($(this).val()!="" && $(this).val()!=undefined && $(this).val()==3){
            $("#def-perfil-semanal").show();            
        }else{
            $("#def-perfil-semanal").hide();
            $('#def-perfil-semanal input').val("");
        }
    });
    
    $("#reanalise-but").click(function(){
        totalNecessidadesEnergiaFunction();
    });
    
    $('#reload-but').click(function(){
        location.reload();
    });
});


function buildDistrito() {
    for(var i = 0; i < irradiacao_temp_amb_temp_agua.length; i++) {
        $('#distrito').append($('<option class="op"></option>').val(i).html(irradiacao_temp_amb_temp_agua[i].distritoI));
    }
}

function getDistrictValues() {
    var id = new Number($("#distrito").val());
    $("#distrito-latitude").attr("value", irradiacao_temp_amb_temp_agua[id].latitude);
}

function buildSistemaProdAQS() {
    for(var i = 0; i < tecnologia_atual.length; i++) {
        $('#sis-prod').append($('<option class="op"></option>').val(i).html(tecnologia_atual[i].nome));
    }
}

function getSistemasProdAQSValues() {
    var id = $("#sis-prod").val();
    
    if (id !="" && id != undefined && id == 0) {
        $("#labelRendimento").html("COP");
        $("#rend").val("");
        $("#labelIRendman").html("Insira o COP");
        $("#rend").val("");
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#iRendMan").val("");
        $("#iRendMan").removeAttr("disabled");
        $('#rend').find("option[value='2']").html("Inserir COP");
    } else if (id != "" && id != undefined && id > 0) {
        $("#labelRendimento").html("Rendimento (%)");
        $("#rend").val("");
        $("#age").val("");
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#iRendMan").val("");
        $("#iRendMan").removeAttr("disabled");
        $('#rend').find("option[value='2']").html("Inserir rendimento");
    } else {
        $("#labelRendimento").html("Rendimento (%) / COP");
        $("#rend").val("");
        $("#age").val("");
        $("#age").hide();
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#iRendMan").val("");
        $("#iRendMan").removeAttr("disabled");
        $('#rend').find("option[value='2']").html("Inserir rendimento");
    }

    if (id!="" && id!= undefined && id >= 0) {
        $('#custo-unit-input').val((tecnologia_atual[id].custo_unit*tecnologia_atual[id].fator_conversao).toFixed(2));
       // $("#custo-unit-input").attr("value", tecnologia_atual[id].custo_unit);
        var begin = $("#custo-unit-label")[0].textContent.indexOf("(");
        var text = $("#custo-unit-label")[0].textContent.substring(0,begin) + " (€/" + tecnologia_atual[id].unidade + ")";
        
        $("#custo-unit-label")[0].textContent = text;
    } 
    getCopRendValues();
}

function getCopRendValues() {
    
    var idLocal = $('#sis-prod').val();
    var selectedRend = $('#rend').val();
    if (selectedRend!="" && selectedRend!=undefined && selectedRend == 2 && idLocal==0 && idLocal!="" && idLocal!=undefined) {
        $('#rend').find("option[value='2']").html("Inserir COP");
        $('#iRendMan').show();
        $('#labelIRendman').hide();
        $('.age').hide();
        $('#age').val("");
    } else if(selectedRend!="" && selectedRend!=undefined && selectedRend == 2 && idLocal>0 && idLocal!="" && idLocal!=undefined){
        $('#rend').find("option[value='2']").html("Inserir rendimento");
        $('#iRendMan').show();
        $('#labelIRendman').hide();
        $('.age').hide();
        $('#age').val("");
    }else if(selectedRend!="" && selectedRend!=undefined && selectedRend == 0) {
        $('#iRendMan').val("");
        $('.age').show();
        $('#age').show();
        $('#age').val("");
        $('#iRendMan').hide();
        $('#labelIRendman').hide();        
    }else{
        $('#iRendMan').hide();
        $('#labelIRendman').hide();
        $('.age').hide();
        $('#age').val("");
    }
}

function buildAge() {
    for(var i = 0; i < tecnologia_atual[i].rendimento.length; i++) {
        $('#age').append($('<option class="op"></option>').val(i).html(tecnologia_atual[i].rendimento[i].nome));
    }
}

function buildConheceConsumo(){
    for(var i = 0; i < conhece_consumo.length; i++) {
        $('#conhece-consumo').append($('<option class="op"></option>').val(i).html(conhece_consumo[i]));
    }
}

function buildConsumoEnergia(){
    for(var i = 0; i < consumo_energia.length; i++) {
        $('#consumo-energia').append($('<option class="op"></option>').val(i).html(consumo_energia[i]));
    }
}

function buildTipoConsumo(){    
     for(var i = 0; i < consumo_diario_agua.length; i++) {
        $('#tipo-consumo').append($('<option class="op"></option>').val(i).html(consumo_diario_agua[i].nome));
    }
}

function setNumberOf(){    
     var parentRow = $(this).parent().parent().find("#desctipoconsumo");
    if($(this).val()== "" || $(this).val()== undefined || $(this).val()<0){
        parentRow.html("");
    }else{
        parentRow.html(consumo_diario_agua[$(this).val()].numero_de);
    }
}

function addRowWaterUsage(){    
    if($('#copy-row').css('display') == 'none'){
        
        $('#copy-row').find("#desctipoconsumo").html("");
        $('#copy-row').find("#tipo-consumo").val("");
        $('#copy-row').find("#tipoconsumoval").val("");
        $('#copy-row').show();
    }else{
        var firstRow = $("#copy-row");
        var copy = firstRow.clone(true);
        //insertBefore("#water-usage tbody>tr:last");
        copy.find("#desctipoconsumo").html("");
        copy.find("#tipo-consumo").val("");
        copy.find("#tipoconsumoval").val("");
        copy.insertBefore("#water-usage tbody>tr:last");
        copy.removeAttr("id");
    }
}

function removeRowWaterUsage(){    
    var parentRow = $(this).parent().parent();
    if(parentRow.attr("id")!="copy-row"){
         var r = confirm("Tem a certeza que pretende remover?");
        //alert(r);
        if (r == true) {
            parentRow.remove();
        }
    }else{
        parentRow.hide();
    }
}

/**
 * this function should build consumos dependent of the selected option in $("#consumo-energia")
 * @returns {undefined}
 */
function buildConsumos(){
    var consumoTipo = $("#consumo-energia").val();
    var tecnologia = $("#sis-prod").val();
    var html ='<table class="table table-bordered"><tbody>';                          
                      
    if(consumoTipo!= "" && consumoTipo!=undefined && consumoTipo == 0){
        //anual
        html += '<tr class="textTR"><td class="in">TOTAL ANUAL (' + tecnologia_atual[tecnologia].unidade + ')</td><td class="in"><input name="consumoAnualTotal" type="number" placeholder="0" class="form-control xInput"/></td></tr>'; 
    }else if(consumoTipo!= "" && consumoTipo!=undefined && consumoTipo == 1){
        //mensal
        html += '<tr class="textTR"><td class="in">MESES</td><td class="in">Unidade (' + tecnologia_atual[tecnologia].unidade + ')</td></tr>'; 
        for(i=0;i<meses_numero_horas.length;i++){
            html += '<tr class="textTR"><td class="in">' + meses_numero_horas[i].mes + '</td><td class="in"><input name="consumosMeses[]" type="number" placeholder="0" class="form-control xInput"/></td></tr>'; 
        }
        html += '<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input type="number" id="total_consumo_somatorio" disabled="disabled" placeholder="0"  class="form-control xInput"/></label></td></tr>';
    }
    
    html += '</tbody></table>';
    
    $("#tabela-consumo").html(html);
    
    $("input[name='consumosMeses[]']").change(function(){
        totalAnualConsumos = 0;
        for(i=0;i<$("input[name='consumosMeses[]']").length;i++){
            totalAnualConsumos += new Number($("input[name='consumosMeses[]']")[i].value);
        }
        $("#total_consumo_somatorio").val(totalAnualConsumos);
    });
}

function buildNovaFonte(){
    for(var i = 0; i < tecnologia_futura.length; i++) {
        $('#nova-fonte').append($('<option class="op"></option>').val(i).html(tecnologia_futura[i].nome));
    }
}

function buildOrientacaoSolar(){
    for(var i = 0; i < desvios.length; i++) {
        $('#orientacao-sel').append($('<option class="op"></option>').val(i).html(desvios[i].nome));
    }
}

function setNovaFonteData(){
    var newFont = $("#nova-fonte").val();
    if(newFont!="" && newFont!=undefined && newFont>=0){
        if(newFont==0){
            $("#rendimento-medidas-label")[0].textContent = "COP";
        }else{
            $("#rendimento-medidas-label")[0].textContent = "Rendimento (%)";
        }
        $("#rendimento-medidas").val(new Number((tecnologia_futura[newFont].rendimento * (newFont==0 ? 1 : 100 )).toFixed(2)));
        $("#custo-unit-medidas").val((tecnologia_futura[newFont].custo_unit*tecnologia_futura[newFont].fator_conversao).toFixed(2));
        
        var begin = $("#custo-unit-medidas-label")[0].textContent.indexOf("(");
        var text = $("#custo-unit-medidas-label")[0].textContent.substring(0,begin) + " (€/" + tecnologia_futura[newFont].unidade + ")";
        $("#custo-unit-medidas-label")[0].textContent = text;
    }
}

function buildPerfilMensal(){
    for(var i = 0; i < perfil_mensal.length; i++) {
        $('#perfil-mensal').append($('<option class="op"></option>').val(i).html(perfil_mensal[i].nome));
    }
}

function buildPerfilSemanal(){
    for(var i = 0; i < perfil_semanal.length; i++) {
        $('#perfil-semanal').append($('<option class="op"></option>').val(i).html(perfil_semanal[i].nome));
    }
}





// BUTTONS STEPS
function nextStep() {
    var id = $('.step:visible').data('id');
    var nextId = $('.step:visible').data('id') + 1;
    if(id<5){
        $('[data-id="' + id + '"]').hide();
        $('[data-id="' + nextId + '"]').show();
    }

    if ($('.anterior:hidden').length > 1) {
        $('.anterior').show();
    }

    if (nextId == 4) {
        $('.perfil-consumo').hide();
        $('.end-step').show();
        $('.but-2').hide();
    }
    
    if (nextId == 5 || nextId == 6) {
        $('.perfil-consumo').hide();
        $('.end-step').show();
        $('.but-2').hide();
        $('#reanalise-but').show();
        $('#reload-but').show();
        $('#analise-but').hide();
    
        if ($("#acoplar-solar").val() == 1 && $("#acoplar-solar").val() != "" && $("#acoplar-solar").val() != undefined) {
            $('.corrige-coletores').hide();
            $('#reanalise-but').hide();
        } else {
            $('.corrige-coletores').show();
            $('#reanalise-but').show();
        }
    }

}

//STEPS
function prevStep() {
    var id = $('.step:visible').data('id');
    var prevId = $('.step:visible').data('id') - 1;

    //CONHECE
    if ($('#conhece-consumo').val() == 0) {
        if (prevId == 4) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.perfil-consumo').hide();
            $('.end-step').show();
            $('.but-2').hide();
            $('#reanalise-but').hide();
            $('#reload-but').hide();
            $('#analise-but').show();

        } else if (prevId == 3) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.perfil-consumo').hide();
            $('.end-step').hide();
            $('.but-2').show();
        } else if (prevId == 2) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="1"]').show();

            $('.perfil-consumo').show();
            $('.end-step').hide();
            $('.but-2').hide();

            
            $('.anterior').hide();
            
        }
        //NAO CONHECE
    } else if ($('#conhece-consumo').val() == 1) {
        if (prevId == 4) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();
            $('#reanalise-but').hide();
            $('#reload-but').hide();
            $('.perfil-consumo').hide();
            $('#analise-but').show();
            $('.end-step').show();
            $('.but-2').hide();
        } else if (prevId == 3) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="2"]').show();

            $('.perfil-consumo').show();
            $('.end-step').hide();
            $('.but-2').hide();
        } else if (prevId == 1) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();

            $('.perfil-consumo').show();
            $('.end-step').hide();
            $('.but-2').hide();

            $('.anterior').hide();
        }
    }

    
}

function perfilConsumo() {
    var id = $('.step:visible').data('id');
    var nextId = $('.step:visible').data('id') + 1;

    if ($('.anterior:hidden').length > 1) {
        $('.anterior').show();
    }

    if ($('#conhece-consumo').val() == 0) {
        $('[data-id="' + id + '"]').hide();
        $('[data-id="3"]').show();

        $('.perfil-consumo').hide();
        $('.end-step').hide();
        $('.but-2').show();

    } else if ($('#conhece-consumo').val() == 1) {
        $('[data-id="' + id + '"]').hide();
        $('[data-id="' + nextId + '"]').show();

        $('.perfil-consumo').show();
        $('.end-step').hide();
        $('.but-2').hide();

        if (nextId == 3) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="3"]').hide();
            $('[data-id="4"]').show();

            $('.perfil-consumo').hide();
            $('.end-step').show();
            $('.but-2').hide();

        } else {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + nextId + '"]').show();
        }
    }

    //ESCONDER ANALISAR ULTIMO STEP
    if (id == 4) {
        $('.end-but').hide();
    }
} 