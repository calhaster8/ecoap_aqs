$(document).ready(function () {
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

    $('#tipo-consumo' + rowId).change(getTipoConsumo);

    $("#nova-fonte").change(setNovaFonteData);

    $("#acoplar-solar").change(function () {
        if ($(this).val() != "" && $(this).val() != undefined && $(this).val() == 0) {
            $("#tbl-acoplar-solar").show();
        } else {
            $("#tbl-acoplar-solar").hide();
            $("#orientacao-sel").val("");
            $("#orientacao-solar").val("");
        }
    });

    $("#orientacao-sel").change(function () {
        if ($("#orientacao-sel").val() != "" && $("#orientacao-sel").val() != undefined && $("#orientacao-sel").val() == 3) {
            $("#orientacao-solar").removeAttr("disabled");
            $("#orientacao-solar").val("");
        } else if ($("#orientacao-sel").val() != "" && $("#orientacao-sel").val() != undefined && $("#orientacao-sel").val() >= 0) {
            $("#orientacao-solar").val(desvios[$("#orientacao-sel").val()].valor);
            $("#orientacao-solar").attr("disabled", "disabled");
        } else {
            $("#orientacao-solar").val("");
            $("#orientacao-solar").attr("disabled", "disabled");
        }
    });

    $("#perfil-mensal").change(function () {
        if ($(this).val() != "" && $(this).val() != undefined && $(this).val() == 3) {
            $("#def-perfil-mensal").show();
        } else {
            $("#def-perfil-mensal").hide();
            $('#def-perfil-mensal input').val("");
        }
    });

    $("#perfil-semanal").change(function () {
        if ($(this).val() != "" && $(this).val() != undefined && $(this).val() == 3) {
            $("#def-perfil-semanal").show();
        } else {
            $("#def-perfil-semanal").hide();
            $('#def-perfil-semanal input').val("");
        }
    });

    $('#add').on('click', function () {
        rowId++;

        var data = $("#tb tr:eq(1)").clone(true).appendTo("#tb").insertBefore('#add_row');
        data.find("input").val('').attr("id", "tipo-consumo-value" + rowId);
        data.find('select').attr("id", "tipo-consumo" + rowId);
        data.find('td:eq(1)').attr('id', 'tipo-consumo-descricao' + rowId).html('');

        $('#tipo-consumo-value' + rowId).rules("add", {
            required: true,
            min: 1,
            step: 1,
            digits: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                digits: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            }
        });

        $('#tipo-consumo' + rowId).rules("add", {
            required: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            }
        });
    });

    $(document).on('click', '#remove', function () {
        rowId--;

        var trIndex = $(this).closest("tr").index();
        if (trIndex > 1) {
            $(this).closest("tr").remove();
        } else {
            alert("Não pode remover a última coluna.");
        }
    });

    $('#aqs-form').validate({
        rules: {
            distrito: {
                required: true
            },
            'distrito-latitude': {
                required: true
            },
            'sis-prod': {
                required: true
            },
            rend: {
                required: true
            },
            iRendMan: {
                required: function () {

                    if ($("#rend").val() != "" && $("#rend").val() != undefined && $("#rend").val() == 2) {
                        return true;
                    } else {
                        return false;
                    }
                },
                step: 0.1,
                min: 1,
                max: function () {

                    if ($("#sis-prod").val() != "" && $("#sis-prod").val() != undefined && $("#sis-prod").val() == 0) {
                        return 7;
                    } else {
                        return 110;
                    }
                },
                number: true
            },
            age: {
                required: function () {
                    if ($("#rend").val() != "" && $("#rend").val() != undefined && $("#rend").val() == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'custo-unit-input': {
                required: true,
                number: true,
                step: 0.01,
                min: 0.01
            },
            'temp-req': {
                required: true,
                min: 1,
                max: 100,
                number: true,
                step: 1,
            },
            'conhece-consumo': {
                required: true
            },
            'consumo-energia': {
                required: true
            },
            consumoAnualTotal: {
                required: function (element) {
                    if ($('#consumo-energia').val() != "" && $('#consumo-energia').val() != undefined && $('#consumo-energia').val() == 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                number: true
            },
            'tipo-consumo1': {
                required: true
            },
            'tipo-consumo-value1': {
                required: true,
                min: 1,
                step: 1,
                digits: true,
				number: true
            },
            'perfil-mensal': {
                required: true
            },
            'perfil-semanal': {
                required: true
            },
            'tipo-consumo': {
                required: true
            },
            'tipoconsumoval': {
                required: true,
                min: 1,
                step: 1,
                digits: true
            },
            'nova-fonte': {
                required: true
            },
            'rendimento-medidas': {
                required: true,
                number: true,
				step: 0.1,
                min: 1
            },
            'custo-unit-medidas': {
                required: true,
                number: true,
				step: 0.01,
                min: 0.01
            },
            'acoplar-solar': {
                required: true
            },
            'orientacao-sel': {
                required: function (element) {
                    if ($('#acoplar-solar').val() != "" && $('#acoplar-solar').val() != undefined && $('#acoplar-solar').val() == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            'orientacao-solar': {
                required: true,
                min: 0,
                max: 70,
				step: 1,
                number: true,
				digits: true
            },
            'corrige-coletores': {
                min: 1,
                step: 1,
				number: true,
                digits: true
            } 
        },
        messages: {
            distrito: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'distrito-latitude':  {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'sis-prod': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            rend: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            iRendMan: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
                max: function (element) {

                    if ($("#sis-prod").val() != "" && $("#sis-prod").val() != undefined && $("#sis-prod").val() == 0) {
                        return '<label style="font-size: 14px; color: red;">O COP máximo é 7</label>';
                    } else {
                        return '<label style="font-size: 14px; color: red;">O rendimento máximo é 110%</label>';
                    }
                },
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.1</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>'
            },
            age: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'custo-unit-input': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>',
                step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01</label>',
                min: '<label style="font-size: 14px; color: red;">O custo mínimo é de 0.01€</label>'
            },
            'temp-req': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O mínimo é 1 ºC</label>',
                max: '<label style="font-size: 14px; color: red;">O máximo é 100 ºC</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            },
            'conhece-consumo': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'consumo-energia': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            consumoAnualTotal: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza (.) em vez de (,)</label>'
            },
            'tipo-consumo1': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'tipo-consumo-value1': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                digits: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
				number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            },
            'perfil-mensal': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'perfil-semanal': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'nova-fonte': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'rendimento-medidas': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
				min: '<label style="font-size: 14px; color: red;">O valor mínimo é 1</label>',
				step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.1</label>',
				digits: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>'
            },
            'custo-unit-medidas': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>',
				step: '<label style="font-size: 14px; color: red;">O passo de incremento é de 0.01</label>',
                min: '<label style="font-size: 14px; color: red;">O custo mínimo é de 0.01€</label>'
            },
            'acoplar-solar': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'orientacao-sel': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'
            },
            'orientacao-solar': {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                min: '<label style="font-size: 14px; color: red;">O mínimo é 0 º</label>',
                max: '<label style="font-size: 14px; color: red;">O máximo é 70 º</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                digits: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
            },
			 'corrige-coletores': {
                min: '<label style="font-size: 14px; color: red;">O mínimo é 1 coletor</label>',
                step: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
                digits: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>',
				number: '<label style="font-size: 14px; color: red;">Introduza números inteiros</label>'
			}
        }
    });

    $(".seguinte").click(function () {
        var id = $('.step:visible').data('id');
        var nextId = $('.step:visible').data('id') + 1;

        if (id == 3) {
            if ($("#aqs-form").valid()) {
                nextStep();
            }
        } else if (id == 1 || id == 2) {
            if ($("#aqs-form").valid()) {
                perfilConsumo();
            }
        }
    });

    $(".end-but").click(function () {
        if ($("#aqs-form").valid()) {
            totalNecessidadesEnergiaFunction();
        }
    });

    $(".reanalise-but").click(function () {
        if ($("#aqs-form").valid()) {
            totalNecessidadesEnergiaFunction();
        }
    });

    $('#reload-but').click(function () {
        location.reload();
    });
});

function buildDistrito() {
    for (var i = 0; i < irradiacao_temp_amb_temp_agua.length; i++) {
        $('#distrito').append($('<option class="op"></option>').val(i).html(irradiacao_temp_amb_temp_agua[i].distritoI));
    }
}

function getDistrictValues() {
    var id = new Number($("#distrito").val());
    $("#distrito-latitude").attr("value", irradiacao_temp_amb_temp_agua[id].latitude);
}

function buildSistemaProdAQS() {
    for (var i = 0; i < tecnologia_atual.length; i++) {
        $('#sis-prod').append($('<option class="op"></option>').val(i).html(tecnologia_atual[i].nome));
    }
}

function getSistemasProdAQSValues() {
    var id = $("#sis-prod").val();

    if (id != "" && id != undefined && id == 0) {
        $("#labelRendimento").html("COP");
        $("#rend").val("");
        $("#labelIRendman").html("Insira o COP");
        $("#rend").val("");
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#iRendMan").val("");
        $("#iRendMan").removeAttr("disabled");
		$("#iRendMan").attr("placeholder", "0.0");
        $('#rend').find("option[value='2']").html("Inserir COP (Ex: 3.2)");
    } else if (id != "" && id != undefined && id > 0) {
        $("#labelRendimento").html("Rendimento (%)");
        $("#rend").val("");
        $("#age").val("");
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#iRendMan").val("");
        $("#iRendMan").removeAttr("disabled");
		$("#iRendMan").attr("placeholder", "0%");
        $('#rend').find("option[value='2']").html("Inserir rendimento (%)");
    } else {
        $("#labelRendimento").html("Rendimento (%) / COP");
        $("#rend").val("");
        $("#age").val("");
        $("#age").hide();
        $("#labelIRendman").hide();
        $("#iRendMan").hide();
        $("#iRendMan").val("");
        $("#iRendMan").removeAttr("disabled");
        $('#rend').find("option[value='2']").html("Inserir rendimento (%) / COP");
    }

    if (id != "" && id != undefined && id >= 0) {
        $('#custo-unit-input').val((tecnologia_atual[id].custo_unit * tecnologia_atual[id].fator_conversao).toFixed(2));
        var begin = $("#custo-unit-label")[0].textContent.indexOf("(");
        var text = $("#custo-unit-label")[0].textContent.substring(0, begin) + " (€/" + tecnologia_atual[id].unidade + ")";

        $("#custo-unit-label")[0].textContent = text;
    }
    getCopRendValues();
}

function getCopRendValues() {

    var idLocal = $('#sis-prod').val();
    var selectedRend = $('#rend').val();
    if (selectedRend != "" && selectedRend != undefined && selectedRend == 2 && idLocal == 0 && idLocal != "" && idLocal != undefined) {
        $('#rend').find("option[value='2']").html("Inserir COP (Ex: 3.2)");
        $('#iRendMan').show();
        //$('#iRendMan').attr('max', '7');
        $('#labelIRendman').hide();
        $('.age').hide();
        $('#age').val("");
    } else if (selectedRend != "" && selectedRend != undefined && selectedRend == 2 && idLocal > 0 && idLocal != "" && idLocal != undefined) {
        $('#rend').find("option[value='2']").html("Inserir rendimento (%)");
        $('#iRendMan').show();
        //$('#iRendMan').attr('max', '100');
        $('#labelIRendman').hide();
        $('.age').hide();
        $('#age').val("");
    } else if (selectedRend != "" && selectedRend != undefined && selectedRend == 0) {
        $('#iRendMan').val("");
        $('.age').show();
        $('#age').show();
        $('#age').val("");
        $('#iRendMan').hide();
        $('#labelIRendman').hide();
    } else {
        $('#iRendMan').hide();
        $('#labelIRendman').hide();
        $('.age').hide();
        $('#age').val("");
    }
}

function buildAge() {
    for (var i = 0; i < tecnologia_atual[i].rendimento.length; i++) {
        $('#age').append($('<option class="op"></option>').val(i).html(tecnologia_atual[i].rendimento[i].nome));
    }
}

function buildConheceConsumo() {
    for (var i = 0; i < conhece_consumo.length; i++) {
        $('#conhece-consumo').append($('<option class="op"></option>').val(i).html(conhece_consumo[i]));
    }
}

function buildConsumoEnergia() {
    for (var i = 0; i < consumo_energia.length; i++) {
        $('#consumo-energia').append($('<option class="op"></option>').val(i).html(consumo_energia[i]));
    }
}

function buildTipoConsumo() {
    for (var i = 0; i < consumo_diario_agua.length; i++) {
        $('.tipo-consumo').append($('<option class="op"></option>').val(i).html(consumo_diario_agua[i].nome));
    }
}

function getTipoConsumo() {
    var id = new Number($('#tipo-consumo' + rowId).val());
    $('#tipo-consumo-descricao' + rowId).html(consumo_diario_agua[id].numero_de);
}

function buildConsumos() {
    var consumoTipo = $("#consumo-energia").val();
    var tecnologia = $("#sis-prod").val();
    var html = '<table class="table table-bordered"><tbody>';

    if (consumoTipo != "" && consumoTipo != undefined && consumoTipo == 0) {

        html += '<tr class="textTR"><td class="in">TOTAL ANUAL (' + tecnologia_atual[tecnologia].unidade + ')</td><td class="in"><input name="consumoAnualTotal" type="number" placeholder="0" class="form-control xInput"/></td></tr>';
    } else if (consumoTipo != "" && consumoTipo != undefined && consumoTipo == 1) {

        html += '<tr class="textTR"><td class="in">MESES</td><td class="in">Unidade (' + tecnologia_atual[tecnologia].unidade + ')</td></tr>';
        for (i = 0; i < meses_numero_horas.length; i++) {
            html += '<tr class="textTR"><td class="in">' + meses_numero_horas[i].mes + '</td><td class="in"><input name="consumosMeses[' + i + ']" id="consumoMeses[' + i + ']" type="number" placeholder="0" class="form-control xInput"/></td></tr>';
        }
        html += '<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input type="number" id="total_consumo_somatorio" disabled="disabled" placeholder="0"  class="form-control xInput"/></label></td></tr>';
    }

    html += '</tbody></table>';

    $("#tabela-consumo").html(html);

    $('#tabela-consumo').find('td.in').find('input').change(function () {
        totalAnualConsumos = 0;
        for (i = 0; i < meses_numero_horas.length; i++) {
            totalAnualConsumos += new Number($("input[name='consumosMeses[" + i + "]']").val());
        }
        $("#total_consumo_somatorio").val(totalAnualConsumos);
    });

    for (i = 0; i < meses_numero_horas.length; i++) {
        $("input[name='consumosMeses[" + i + "]']").rules('add', {
            required: true,
            number: true,
            messages: {
                required: '<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',
                number: '<label style="font-size: 14px; color: red;">Introduza números com (.) em vez de (,)</label>'
            }
        });
    }
}

function buildNovaFonte() {
    for (var i = 0; i < tecnologia_futura.length; i++) {
        $('#nova-fonte').append($('<option class="op"></option>').val(i).html(tecnologia_futura[i].nome));
    }
}

function buildOrientacaoSolar() {
    for (var i = 0; i < desvios.length; i++) {
        $('#orientacao-sel').append($('<option class="op"></option>').val(i).html(desvios[i].nome));
    }
}

function setNovaFonteData() {
    var newFont = $("#nova-fonte").val();
    if (newFont != "" && newFont != undefined && newFont >= 0) {
        if (newFont == 0) {
            $("#rendimento-medidas-label")[0].textContent = "COP";
        } else {
            $("#rendimento-medidas-label")[0].textContent = "Rendimento (%)";
        }
        $("#rendimento-medidas").val(new Number((tecnologia_futura[newFont].rendimento * (newFont == 0 ? 1 : 100)).toFixed(2)));
        $("#custo-unit-medidas").val((tecnologia_futura[newFont].custo_unit * tecnologia_futura[newFont].fator_conversao).toFixed(2));

        var begin = $("#custo-unit-medidas-label")[0].textContent.indexOf("(");
        var text = $("#custo-unit-medidas-label")[0].textContent.substring(0, begin) + " (€/" + tecnologia_futura[newFont].unidade + ")";
        $("#custo-unit-medidas-label")[0].textContent = text;
    }
}

function buildPerfilMensal() {
    for (var i = 0; i < perfil_mensal.length; i++) {
        $('#perfil-mensal').append($('<option class="op"></option>').val(i).html(perfil_mensal[i].nome));
    }
}

function buildPerfilSemanal() {
    for (var i = 0; i < perfil_semanal.length; i++) {
        $('#perfil-semanal').append($('<option class="op"></option>').val(i).html(perfil_semanal[i].nome));
    }
}

function nextStep() {
    var id = $('.step:visible').data('id');
    var nextId = $('.step:visible').data('id') + 1;
    if (id < 5) {
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
        $('#disclaimer').hide();
    }

    if (nextId == 5 || nextId == 6) {
        $('.perfil-consumo').hide();
        $('.end-step').show();
        $('.but-2').hide();
        $('#reanalise-but').show();
        $('#reload-but').show();
        $('#analise-but').hide();
        $('.print_pdf').show();
        if ($("#acoplar-solar").val() == 1 && $("#acoplar-solar").val() != "" && $("#acoplar-solar").val() != undefined) {
            $('.corrige-coletores').hide();
            $('#reanalise-but').hide();
        } else {
            $('.corrige-coletores').show();
            $('#reanalise-but').show();
        }
        $('#disclaimer').show();
    }
    
    location.hash = "html";
}

function prevStep() {
    var id = $('.step:visible').data('id');
    var prevId = $('.step:visible').data('id') - 1;

    if ($('#conhece-consumo').val() == 0) {
        if (prevId == 4) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();
            $('.print_pdf').hide();
            $('.perfil-consumo').hide();
            $('.end-step').show();
            $('.but-2').hide();
            $('#reanalise-but').hide();
            $("#corrige-coletores").val("");
            $('#reload-but').hide();
            $('#analise-but').show();
            $('#disclaimer').hide();

        } else if (prevId == 3) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();
            $('.print_pdf').hide();
            $('.perfil-consumo').hide();
            $('.end-step').hide();
            $('.but-2').show();
            $('#disclaimer').hide();
        } else if (prevId == 2) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="1"]').show();
            $('.print_pdf').hide();
            $('.perfil-consumo').show();
            $('.end-step').hide();
            $('.but-2').hide();
            $('.anterior').hide();
            $('#disclaimer').hide();
        }

    } else if ($('#conhece-consumo').val() == 1) {
        if (prevId == 4) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();
            $('#reanalise-but').hide();
            $('#reload-but').hide();
            $('.perfil-consumo').hide();
            $("#corrige-coletores").val("");
            $('#analise-but').show();
            $('.end-step').show();
            $('.print_pdf').hide();
            $('.but-2').hide();
            $('#disclaimer').hide();
        } else if (prevId == 3) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="2"]').show();
            $('.print_pdf').hide();
            $('.perfil-consumo').show();
            $('.end-step').hide();
            $('.but-2').hide();
            $('#disclaimer').hide();
        } else if (prevId == 1) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + prevId + '"]').show();
            $('.print_pdf').hide();
            $('.perfil-consumo').show();
            $('.end-step').hide();
            $('.but-2').hide();
            $('.anterior').hide();
            $('#disclaimer').hide();
        }
    }
    
    location.hash = "html";
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
        $('.print_pdf').hide();
        $('.perfil-consumo').hide();
        $('.end-step').hide();
        $('.but-2').show();

    } else if ($('#conhece-consumo').val() == 1) {
        $('[data-id="' + id + '"]').hide();
        $('[data-id="' + nextId + '"]').show();

        $('.perfil-consumo').show();
        $('.print_pdf').hide();
        $('.end-step').hide();
        $('.but-2').hide();

        if (nextId == 3) {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="3"]').hide();
            $('[data-id="4"]').show();
            $('.print_pdf').hide();
            $('.perfil-consumo').hide();
            $('.end-step').show();
            $('.but-2').hide();

        } else {
            $('[data-id="' + id + '"]').hide();
            $('[data-id="' + nextId + '"]').show();
        }
    }

    if (id == 4) {
        $('.end-but').hide();
    }
    
    location.hash = "html";
} 