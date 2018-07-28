function buildDistrito(){for(var e=0;e<irradiacao_temp_amb_temp_agua.length;e++)$("#distrito").append($('<option class="op"></option>').val(e).html(irradiacao_temp_amb_temp_agua[e].distritoI))}function getDistrictValues(){var e=new Number($("#distrito").val());$("#distrito-latitude").attr("value",irradiacao_temp_amb_temp_agua[e].latitude)}function buildSistemaProdAQS(){for(var e=0;e<tecnologia_atual.length;e++)$("#sis-prod").append($('<option class="op"></option>').val(e).html(tecnologia_atual[e].nome))}function getSistemasProdAQSValues(){var e=$("#sis-prod").val();if(""!=e&&void 0!=e&&0==e?($("#labelRendimento").html("COP"),$("#rend").val(""),$("#labelIRendman").html("Insira o COP"),$("#rend").val(""),$("#labelIRendman").hide(),$("#iRendMan").hide(),$("#iRendMan").val(""),$("#iRendMan").removeAttr("disabled"),$("#rend").find("option[value='2']").html("Inserir COP")):""!=e&&void 0!=e&&e>0?($("#labelRendimento").html("Rendimento (%)"),$("#rend").val(""),$("#age").val(""),$("#labelIRendman").hide(),$("#iRendMan").hide(),$("#iRendMan").val(""),$("#iRendMan").removeAttr("disabled"),$("#rend").find("option[value='2']").html("Inserir rendimento")):($("#labelRendimento").html("Rendimento (%) / COP"),$("#rend").val(""),$("#age").val(""),$("#age").hide(),$("#labelIRendman").hide(),$("#iRendMan").hide(),$("#iRendMan").val(""),$("#iRendMan").removeAttr("disabled"),$("#rend").find("option[value='2']").html("Inserir rendimento")),""!=e&&void 0!=e&&e>=0){$("#custo-unit-input").val((tecnologia_atual[e].custo_unit*tecnologia_atual[e].fator_conversao).toFixed(2));var o=$("#custo-unit-label")[0].textContent.indexOf("("),a=$("#custo-unit-label")[0].textContent.substring(0,o)+" (€/"+tecnologia_atual[e].unidade+")";$("#custo-unit-label")[0].textContent=a}getCopRendValues()}function getCopRendValues(){var e=$("#sis-prod").val(),o=$("#rend").val();""!=o&&void 0!=o&&2==o&&0==e&&""!=e&&void 0!=e?($("#rend").find("option[value='2']").html("Inserir COP"),$("#iRendMan").show(),$("#labelIRendman").hide(),$(".age").hide(),$("#age").val("")):""!=o&&void 0!=o&&2==o&&e>0&&""!=e&&void 0!=e?($("#rend").find("option[value='2']").html("Inserir rendimento"),$("#iRendMan").show(),$("#labelIRendman").hide(),$(".age").hide(),$("#age").val("")):""!=o&&void 0!=o&&0==o?($("#iRendMan").val(""),$(".age").show(),$("#age").show(),$("#age").val(""),$("#iRendMan").hide(),$("#labelIRendman").hide()):($("#iRendMan").hide(),$("#labelIRendman").hide(),$(".age").hide(),$("#age").val(""))}function buildAge(){for(var e=0;e<tecnologia_atual[e].rendimento.length;e++)$("#age").append($('<option class="op"></option>').val(e).html(tecnologia_atual[e].rendimento[e].nome))}function buildConheceConsumo(){for(var e=0;e<conhece_consumo.length;e++)$("#conhece-consumo").append($('<option class="op"></option>').val(e).html(conhece_consumo[e]))}function buildConsumoEnergia(){for(var e=0;e<consumo_energia.length;e++)$("#consumo-energia").append($('<option class="op"></option>').val(e).html(consumo_energia[e]))}function buildTipoConsumo(){for(var e=0;e<consumo_diario_agua.length;e++)$(".tipo-consumo").append($('<option class="op"></option>').val(e).html(consumo_diario_agua[e].nome))}function getTipoConsumo(){var e=new Number($("#tipo-consumo"+rowId).val());$("#tipo-consumo-descricao"+rowId).html(consumo_diario_agua[e].numero_de)}function buildConsumos(){var e=$("#consumo-energia").val(),o=$("#sis-prod").val(),a='<table class="table table-bordered"><tbody>';if(""!=e&&void 0!=e&&0==e)a+='<tr class="textTR"><td class="in">TOTAL ANUAL ('+tecnologia_atual[o].unidade+')</td><td class="in"><input name="consumoAnualTotal" type="number" placeholder="0" class="form-control xInput"/></td></tr>';else if(""!=e&&void 0!=e&&1==e){for(a+='<tr class="textTR"><td class="in">MESES</td><td class="in">Unidade ('+tecnologia_atual[o].unidade+")</td></tr>",i=0;i<meses_numero_horas.length;i++)a+='<tr class="textTR"><td class="in">'+meses_numero_horas[i].mes+'</td><td class="in"><input name="consumosMeses['+i+']" id="consumoMeses['+i+']" type="number" placeholder="0" class="form-control xInput"/></td></tr>';a+='<tr class="textTR"><td class="in">TOTAL ANUAL</td><td class="in"><input type="number" id="total_consumo_somatorio" disabled="disabled" placeholder="0"  class="form-control xInput"/></label></td></tr>'}for(a+="</tbody></table>",$("#tabela-consumo").html(a),$("#tabela-consumo").find("td.in").find("input").change(function(){for(totalAnualConsumos=0,i=0;i<meses_numero_horas.length;i++)totalAnualConsumos+=new Number($("input[name='consumosMeses["+i+"]']").val());$("#total_consumo_somatorio").val(totalAnualConsumos)}),i=0;i<meses_numero_horas.length;i++)$("input[name='consumosMeses["+i+"]']").rules("add",{required:!0,messages:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'}})}function buildNovaFonte(){for(var e=0;e<tecnologia_futura.length;e++)$("#nova-fonte").append($('<option class="op"></option>').val(e).html(tecnologia_futura[e].nome))}function buildOrientacaoSolar(){for(var e=0;e<desvios.length;e++)$("#orientacao-sel").append($('<option class="op"></option>').val(e).html(desvios[e].nome))}function setNovaFonteData(){var e=$("#nova-fonte").val();if(""!=e&&void 0!=e&&e>=0){$("#rendimento-medidas-label")[0].textContent=0==e?"COP":"Rendimento (%)",$("#rendimento-medidas").val(new Number((tecnologia_futura[e].rendimento*(0==e?1:100)).toFixed(2))),$("#custo-unit-medidas").val((tecnologia_futura[e].custo_unit*tecnologia_futura[e].fator_conversao).toFixed(2));var o=$("#custo-unit-medidas-label")[0].textContent.indexOf("("),a=$("#custo-unit-medidas-label")[0].textContent.substring(0,o)+" (€/"+tecnologia_futura[e].unidade+")";$("#custo-unit-medidas-label")[0].textContent=a}}function buildPerfilMensal(){for(var e=0;e<perfil_mensal.length;e++)$("#perfil-mensal").append($('<option class="op"></option>').val(e).html(perfil_mensal[e].nome))}function buildPerfilSemanal(){for(var e=0;e<perfil_semanal.length;e++)$("#perfil-semanal").append($('<option class="op"></option>').val(e).html(perfil_semanal[e].nome))}function nextStep(){var e=$(".step:visible").data("id"),o=$(".step:visible").data("id")+1;e<5&&($('[data-id="'+e+'"]').hide(),$('[data-id="'+o+'"]').show()),$(".anterior:hidden").length>1&&$(".anterior").show(),4==o&&($(".perfil-consumo").hide(),$(".end-step").show(),$(".but-2").hide()),5!=o&&6!=o||($(".perfil-consumo").hide(),$(".end-step").show(),$(".but-2").hide(),$("#reanalise-but").show(),$("#reload-but").show(),$("#analise-but").hide(),$(".print_pdf").show(),1==$("#acoplar-solar").val()&&""!=$("#acoplar-solar").val()&&void 0!=$("#acoplar-solar").val()?($(".corrige-coletores").hide(),$("#reanalise-but").hide()):($(".corrige-coletores").show(),$("#reanalise-but").show()))}function prevStep(){var e=$(".step:visible").data("id"),o=$(".step:visible").data("id")-1;0==$("#conhece-consumo").val()?4==o?($('[data-id="'+e+'"]').hide(),$('[data-id="'+o+'"]').show(),$(".perfil-consumo").hide(),$(".end-step").show(),$(".but-2").hide(),$("#reanalise-but").hide(),$("#reload-but").hide(),$("#analise-but").show()):3==o?($('[data-id="'+e+'"]').hide(),$('[data-id="'+o+'"]').show(),$(".print_pdf").hide(),$(".perfil-consumo").hide(),$(".end-step").hide(),$(".but-2").show()):2==o&&($('[data-id="'+e+'"]').hide(),$('[data-id="1"]').show(),$(".perfil-consumo").show(),$(".end-step").hide(),$(".but-2").hide(),$(".anterior").hide()):1==$("#conhece-consumo").val()&&(4==o?($('[data-id="'+e+'"]').hide(),$('[data-id="'+o+'"]').show(),$("#reanalise-but").hide(),$("#reload-but").hide(),$(".perfil-consumo").hide(),$("#analise-but").show(),$(".end-step").show(),$(".but-2").hide()):3==o?($('[data-id="'+e+'"]').hide(),$('[data-id="2"]').show(),$(".print_pdf").hide(),$(".perfil-consumo").show(),$(".end-step").hide(),$(".but-2").hide()):1==o&&($('[data-id="'+e+'"]').hide(),$('[data-id="'+o+'"]').show(),$(".perfil-consumo").show(),$(".end-step").hide(),$(".but-2").hide(),$(".anterior").hide()))}function perfilConsumo(){var e=$(".step:visible").data("id"),o=$(".step:visible").data("id")+1;$(".anterior:hidden").length>1&&$(".anterior").show(),0==$("#conhece-consumo").val()?($('[data-id="'+e+'"]').hide(),$('[data-id="3"]').show(),$(".perfil-consumo").hide(),$(".end-step").hide(),$(".but-2").show()):1==$("#conhece-consumo").val()&&($('[data-id="'+e+'"]').hide(),$('[data-id="'+o+'"]').show(),$(".perfil-consumo").show(),$(".end-step").hide(),$(".but-2").hide(),3==o?($('[data-id="'+e+'"]').hide(),$('[data-id="3"]').hide(),$('[data-id="4"]').show(),$(".perfil-consumo").hide(),$(".end-step").show(),$(".but-2").hide()):($('[data-id="'+e+'"]').hide(),$('[data-id="'+o+'"]').show())),4==e&&$(".end-but").hide()}$(document).ready(function(){buildDistrito(),buildSistemaProdAQS(),buildAge(),getCopRendValues(),buildConheceConsumo(),buildConsumoEnergia(),buildTipoConsumo(),buildNovaFonte(),buildOrientacaoSolar(),buildPerfilMensal(),buildPerfilSemanal(),getSistemasProdAQSValues(),$("#temp-req").val(temperatura_utilizacao),$("#distrito").change(getDistrictValues),$("#sis-prod").change(getSistemasProdAQSValues),$("#cop").change(getCopRendValues),$("#rend").change(getCopRendValues),$("#consumo-energia").change(buildConsumos),$("#tipo-consumo"+rowId).change(getTipoConsumo),$("#nova-fonte").change(setNovaFonteData),$("#acoplar-solar").change(function(){""!=$(this).val()&&void 0!=$(this).val()&&0==$(this).val()?$("#tbl-acoplar-solar").show():($("#tbl-acoplar-solar").hide(),$("#orientacao-sel").val(""),$("#orientacao-solar").val(""))}),$("#orientacao-sel").change(function(){""!=$("#orientacao-sel").val()&&void 0!=$("#orientacao-sel").val()&&5==$("#orientacao-sel").val()?($("#orientacao-solar").removeAttr("disabled"),$("#orientacao-solar").val("")):""!=$("#orientacao-sel").val()&&void 0!=$("#orientacao-sel").val()&&$("#orientacao-sel").val()>=0?($("#orientacao-solar").val(desvios[$("#orientacao-sel").val()].valor),$("#orientacao-solar").attr("disabled","disabled")):($("#orientacao-solar").val(""),$("#orientacao-solar").attr("disabled","disabled"))}),$("#perfil-mensal").change(function(){""!=$(this).val()&&void 0!=$(this).val()&&3==$(this).val()?$("#def-perfil-mensal").show():($("#def-perfil-mensal").hide(),$("#def-perfil-mensal input").val(""))}),$("#perfil-semanal").change(function(){""!=$(this).val()&&void 0!=$(this).val()&&3==$(this).val()?$("#def-perfil-semanal").show():($("#def-perfil-semanal").hide(),$("#def-perfil-semanal input").val(""))}),$("#add").on("click",function(){rowId++;var e=$("#tb tr:eq(1)").clone(!0).appendTo("#tb").insertBefore("#add_row");e.find("input").val("").attr("id","tipo-consumo-value"+rowId),e.find("select").attr("id","tipo-consumo"+rowId),e.find("td:eq(1)").attr("id","tipo-consumo-descricao"+rowId).html(""),$("#tipo-consumo-value"+rowId).rules("add",{required:!0,min:1,step:1,digits:!0,messages:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',min:'<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',step:'<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',digits:'<label style="font-size: 14px; color: red;">Insera números sem casas decimais.Ex: 10</label>'}}),$("#tipo-consumo"+rowId).rules("add",{required:!0,messages:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'}})}),$(document).on("click","#remove",function(){rowId--,$(this).closest("tr").index()>1?$(this).closest("tr").remove():alert("Não pode remover a última coluna.")}),$("#aqs-form").validate({rules:{distrito:{required:!0},"distrito-latitude":{required:!0},"sis-prod":{required:!0},rend:{required:!0},iRendMan:{required:function(e){return""!=$("#rend").val()&&void 0!=$("#rend").val()&&2==$("#rend").val()},step:1,min:0,max:1e3,digits:!0},age:{required:function(e){return""!=$("#rend").val()&&void 0!=$("#rend").val()&&0==$("#rend").val()}},"custo-unit-input":{required:!0,number:!0,step:1e-5,min:1e-5},"temp-req":{required:!0,min:0,max:100,number:!0,step:1},"conhece-consumo":{required:!0},"consumo-energia":{required:!0},consumoAnualTotal:{required:function(e){return""!=$("#consumo-energia").val()&&void 0!=$("#consumo-energia").val()&&0==$("#consumo-energia").val()}},"tipo-consumo1":{required:!0},"tipo-consumo-value1":{required:!0,min:1,step:1,digits:!0},"perfil-mensal":{required:!0},"perfil-semanal":{required:!0},"tipo-consumo":{required:!0},tipoconsumoval:{required:!0,min:1,step:1,digits:!0},"nova-fonte":{required:!0},"rendimento-medidas":{required:!0},"custo-unit-medidas":{required:!0},"acoplar-solar":{required:!0},"orientacao-sel":{required:function(e){return""!=$("#acoplar-solar").val()&&void 0!=$("#acoplar-solar").val()&&0==$("#acoplar-solar").val()}},"orientacao-input":{required:!0,min:0,max:70,digits:!0}},messages:{distrito:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"distrito-latitude":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"sis-prod":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},rend:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},iRendMan:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',min:'<label style="font-size: 14px; color: red;">O rendimento mínimo é 0%.</label>',max:'<label style="font-size: 14px; color: red;">O rendimento máximo é 1000%.</label>',step:'<label style="font-size: 14px; color: red;">o incremento é de 1.</label>',digits:'<label style="font-size: 14px; color: red;">Inserir uma percentagem sem casas decimais. Ex: 10</label>'},age:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"custo-unit-input":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',number:'<label style="font-size: 14px; color: red;">Inserir um número válido. Ex: 0.10</label>',step:'<label style="font-size: 14px; color: red;">o passo de incremento é de 0.00001 .</label>',min:'<label style="font-size: 14px; color: red;">O mínimo é 0.00001 .</label>'},"temp-req":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',min:'<label style="font-size: 14px; color: red;">O mínimo é 1 ºC.</label>',max:'<label style="font-size: 14px; color: red;">O máximo é 100 ºC.</label>',number:'<label style="font-size: 14px; color: red;">Insira um número válido.</label>',step:'<label style="font-size: 14px; color: red;">O passo de incremento é de 1 </label>'},"conhece-consumo":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"consumo-energia":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},consumoAnualTotal:{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"tipo-consumo1":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"tipo-consumo-value1":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',min:'<label style="font-size: 14px; color: red;">O mínimo é 1.</label>',step:'<label style="font-size: 14px; color: red;">O passo de incremento é de 1.</label>',digits:'<label style="font-size: 14px; color: red;">Insera números sem casas decimais.Ex: 10</label>'},"perfil-mensal":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"perfil-semanal":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"nova-fonte":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"rendimento-medidas":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"custo-unit-medidas":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"acoplar-solar":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"orientacao-sel":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>'},"orientacao-input":{required:'<label style="font-size: 14px; color: red;">Este campo é obrigatório.</label>',min:'<label style="font-size: 14px; color: red;">O mínimo é 0 º.</label>',max:'<label style="font-size: 14px; color: red;">O máximo é 70 º.</label>',digits:'<label style="font-size: 14px; color: red;">Insera números sem casas decimais.Ex: 10</label>'}}}),$(".seguinte").click(function(){var e=$(".step:visible").data("id"),o=$(".step:visible").data("id")+1;3==e?$("#aqs-form").valid()&&nextStep():1!=e&&2!=e||$("#aqs-form").valid()&&perfilConsumo()}),$(".end-but").click(function(){$("#aqs-form").valid()&&totalNecessidadesEnergiaFunction()}),$(".reanalise-but").click(function(){$("#aqs-form").valid()&&totalNecessidadesEnergiaFunction()}),$("#reload-but").click(function(){location.reload()})});