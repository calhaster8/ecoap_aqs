function getCustomizedPerfilMensal(e,a){return e>=0&&e<3?a>=4&&a<9?0==e?1:2==e?1:1==e?perfil_mensal[e].consumo:0:0==e?1:2==e?perfil_mensal[e].consumo:1==e?1:0:new Number($("#perfil-mensal-input"+(a+1)).val())/100}function getCustomizedPerfilSemanal(e){var a=0;if(3==e){var o=0;for(k=1;k<8;k++)o+=new Number($("#perfil-semanal-input"+k).val());a=o/7/100}return a}function totalNecessidadesEnergiaFunction(){var e=new Number($("#perfil-mensal").val()),a=new Number($("#perfil-semanal").val()),o=new Number($("#temp-req").val()),r=new Number($("#distrito").val()),t=$("#consumo-energia").val(),n=$("#sis-prod").val();necessidades_mes=[],totalNecessidadesEnergia=0,total=0;var s=$("#conhece-consumo").val();if(""!=s&&void 0!=s&&0==s&&0==t)for(i=0;i<meses_numero_horas.length;i++)necessidades_mes[i]=new Number($("input[name='consumoAnualTotal']").val()*meses_numero_horas[i].aqs_mensal*tecnologia_atual[n].fator_conversao),totalNecessidadesEnergia+=new Number(necessidades_mes[i]);else if(""!=s&&void 0!=s&&0==s&&1==t)for(i=0;i<meses_numero_horas.length;i++)necessidades_mes[i]=new Number($("input[name='consumosMeses["+i+"]']").val()*tecnologia_atual[n].fator_conversao),totalNecessidadesEnergia+=new Number(necessidades_mes[i]);else if(""!=s&&void 0!=s&&1==s){var l=0;for(j=1;j<rowId+1;j++){var c=new Number($("#tipo-consumo-value"+j).val()),m=$("#tipo-consumo"+j).val();l+=c*consumo_diario_agua[m].valor}for(i=0;i<meses_numero_horas.length;i++)necessidades_mes[i]=l*getCustomizedPerfilMensal(e,i)*(0==a?perfil_semanal[a].valor:1==a?perfil_semanal[a].valor:3==a?new Number(getCustomizedPerfilSemanal(a)/7):1)*meses_numero_horas[i].n_dias*(temperatura_utilizacao-irradiacao_temp_amb_temp_agua[r].mesI[i].valorTempAgua)*fatores_conversao[0],totalNecessidadesEnergia+=necessidades_mes[i]}total=totalNecessidadesEnergia,correcaoOrientacao(),energiaSolarCaptada()}function correcaoOrientacao(){var e=$("#orientacao-solar").val(),a=0,o=0;o=""!=e&&void 0!=e&&e<0?-1*e:e,""!=o&&void 0!=o&&(a=o>70?0:o>0?1.14-.0085*e:1),totalCorrecaoOrientacao=a}function getCorrecaoInclinacao(e,a){for(j=0;j<correcao_inclinacao.length;j++)if(e==correcao_inclinacao[j].latitude)return correcao_inclinacao[j].meses[a].valor}function energiaSolarCaptada(){var e=new Number($("#distrito").val()),a=new Number($("#distrito-latitude").val());for(totalEnergiaArray=[],totalEnergia=0,i=0;i<meses_numero_horas.length;i++)totalEnergiaArray[i]=(rendimento_otico*perdas[1].valor-coeficient_perdas*((temperatura_utilizacao-(irradiacao_temp_amb_temp_agua[e].mesI[i].valorTempAmb+irradiacao_temp_amb_temp_agua[e].mesI[i].valorTempAgua))/(getCorrecaoInclinacao(a,i)*(totalCorrecaoOrientacao*perdas[2].valor*irradiacao_temp_amb_temp_agua[e].mesI[i].valorIrr)*(1e3*fatores_conversao[1]/meses_numero_horas[i].n_horas_sol))))*(getCorrecaoInclinacao(a,i)*(totalCorrecaoOrientacao*perdas[2].valor*irradiacao_temp_amb_temp_agua[e].mesI[i].valorIrr))*(1-perdas[0].valor)*meses_numero_horas[i].n_dias,totalEnergia+=totalEnergiaArray[i];racio(),energiaSolarCaptada2(),energiaSolarUtilizada(),energiaSolarUtilizadaPercent(),energiaBackup(),energiaBackupPercent(),excedenteSolar(),excedenteSolarPerc(),necessidadesEnergeticaskWh(),cenarioI(),cenarioF(),reduction(),1==resume()&&nextStep()}function racio(){totalRacio=new Number(media(necessidades_mes)/media(totalEnergiaArray))}function media(e){var a=0;for(i=0;i<e.length;i++)i>=4&&i<9&&(a+=new Number(e[i]));return a/5}function energiaSolarCaptada2(){var e=""==$("#corrige-coletores").val()||void 0==$("#corrige-coletores").val()?0==new Number(totalRacio/area_coletor_solar)?1:new Number(totalRacio/area_coletor_solar).toFixed(0):$("#corrige-coletores").val(),a=""!=$("#corrige-coletores").val()&&void 0!=$("#corrige-coletores").val()?$("#corrige-coletores").val():e;for(totalEnergiaArray2=[],totalEnergia2=0,i=0;i<meses_numero_horas.length;i++)totalEnergiaArray2[i]=totalEnergiaArray[i]*a*2.25,totalEnergia2+=totalEnergiaArray2[i]}function energiaSolarUtilizada(){for(totalEnergiaSolarUtilizada=[],totalEnergiaSolar=0,i=0;i<meses_numero_horas.length;i++)totalEnergiaArray2[i]>necessidades_mes[i]?totalEnergiaSolarUtilizada[i]=necessidades_mes[i]:totalEnergiaSolarUtilizada[i]=totalEnergiaArray2[i],totalEnergiaSolar+=totalEnergiaSolarUtilizada[i]}function energiaSolarUtilizadaPercent(){for(totalEnergiaSolarUtilizadaPerc=[],totalEnergiaSolarPerc=0,i=0;i<meses_numero_horas.length;i++)totalEnergiaSolarUtilizadaPerc[i]=totalEnergiaSolarUtilizada[i]/necessidades_mes[i];totalEnergiaSolarPerc=totalEnergiaSolar/total}function energiaBackup(){var e=$("#nova-fonte").val();for(totalEnergiaBackupMes=[],totalEnergiaBackup=0,i=0;i<meses_numero_horas.length;i++)necessidades_mes[i]-totalEnergiaArray2[i]<0?totalEnergiaBackupMes[i]=0:totalEnergiaBackupMes[i]=(necessidades_mes[i]-totalEnergiaArray2[i])/tecnologia_futura[e].rendimento,totalEnergiaBackup+=totalEnergiaBackupMes[i]}function energiaBackupPercent(){for(totalEnergiaBackupMesPerc=[],totalEnergiaBackupPerc=0,i=0;i<meses_numero_horas.length;i++)totalEnergiaBackupMesPerc[i]=totalEnergiaBackupMes[i]/necessidades_mes[i];totalEnergiaBackupPerc=totalEnergiaBackup/total}function excedenteSolar(){for(totalExcedenteSolarArray=[],totalExcedenteSolar=0,i=0;i<meses_numero_horas.length;i++)totalExcedenteSolarArray[i]=totalEnergiaArray2[i]-totalEnergiaSolarUtilizada[i],totalExcedenteSolar+=totalExcedenteSolarArray[i]}function excedenteSolarPerc(){for(totalExcedenteSolarArrayPerc=[],totalExcedenteSolarPerc=0,i=0;i<meses_numero_horas.length;i++)totalExcedenteSolarArrayPerc[i]=totalExcedenteSolarArray[i]/totalEnergiaArray2[i];totalExcedenteSolarPerc=totalExcedenteSolar/totalEnergia2}function necessidadesEnergeticaskWh(){necessidades_mes_kWh=[],total_mes_kWh=0;var e=$("#conhece-consumo").val(),a=$("#consumo-energia").val();for(i=0;i<meses_numero_horas.length;i++)necessidades_mes_kWh[i]=0==e&&1==a?$("input[name='consumosMeses["+i+"]']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao:0==e&&0==a?$("input[name='consumoAnualTotal']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao*meses_numero_horas[i].aqs_mensal:necessidades_mes[i]*fatores_conversao[1],total_mes_kWh+=necessidades_mes_kWh[i]}function cenarioI(){var e=$("#sis-prod").val(),a=2==$("#rend").val()?0==e?$("#iRendMan").val():$("#iRendMan").val()/100:$("#rend").val(),o=$("#age").val(),r=tecnologia_atual[$("#sis-prod").val()].custo_unit,t=$("#conhece-consumo").val(),n=$("#consumo-energia").val(),s=0;for(cenarioI_mes=[],cenarioI_custos=[],total_cenarioI_mes=0,total_cenarioI_custos=0,i=0;i<meses_numero_horas.length;i++)s=0==t&&1==n?$("input[name='consumosMeses["+i+"]']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao:0==t&&0==n?$("input[name='consumoAnualTotal']").val()*tecnologia_atual[$("#sis-prod").val()].fator_conversao*meses_numero_horas[i].aqs_mensal:0==a&&tecnologia_atual[e].rendimento[o].nome==idades[o]?necessidades_mes_kWh[i]/tecnologia_atual[e].rendimento[o].valor:necessidades_mes_kWh[i]/a,cenarioI_mes[i]=s,cenarioI_custos[i]=cenarioI_mes[i]*r/tecnologia_atual[e].fator_conversao,total_cenarioI_mes+=cenarioI_mes[i],total_cenarioI_custos+=cenarioI_custos[i];total_cenarioI_custos=total_cenarioI_custos}function cenarioF(){var e=$("#sis-prod").val(),a=2==$("#rend").val()?0==e?$("#iRendMan").val():$("#iRendMan").val()/100:$("#rend").val(),o=$("#nova-fonte").val(),r=$("#age").val(),t=tecnologia_futura[o].custo_unit,n=0;cenarioF_mes=[],total_cenarioF_mes=0,cenarioF_custos=[],total_cenarioF_custos=0;var s=0!=a&&""!=a&&a>0&&(""==r||void 0==r)?a:tecnologia_atual[e].rendimento[r].valor;for(i=0;i<meses_numero_horas.length;i++)n=isNaN(1==$("#acoplar-solar").val()||""==$("#acoplar-solar").val()||void 0==$("#acoplar-solar").val()?cenarioI_mes[i]*s/tecnologia_futura[o].rendimento:totalEnergiaBackupMes[i]*fatores_conversao[1]/tecnologia_futura[o].rendimento)?0:1==$("#acoplar-solar").val()||""==$("#acoplar-solar").val()||void 0==$("#acoplar-solar").val()?cenarioI_mes[i]*s/tecnologia_futura[o].rendimento:totalEnergiaBackupMes[i]*fatores_conversao[1],cenarioF_mes[i]=n,total_cenarioF_mes+=cenarioF_mes[i],cenarioF_custos[i]=cenarioF_mes[i]*t/tecnologia_futura[o].fator_conversao,total_cenarioF_custos+=cenarioF_custos[i];total_cenarioF_custos=total_cenarioF_custos}function reduction(){for(reducao_mes=[],total_reducao_mes=0,reducao_consumos=[],total_reducao_consumos=0,i=0;i<meses_numero_horas.length;i++)reducao_mes[i]=cenarioI_custos[i]-cenarioF_custos[i],total_reducao_mes+=reducao_mes[i],reducao_consumos[i]=cenarioI_mes[i]-cenarioF_mes[i],total_reducao_consumos+=reducao_consumos[i]}function resume(){var e=0,a=0,o=0,r=0,t=0,i=0,n=0,s=0,l=0,c=0,m=0,u=0,_=0,d=0,v=0,g=0,p=0,f=$("#nova-fonte").val(),h=$("#corrige-coletores").val();if(1==$("#acoplar-solar").val()&&""!=$("#acoplar-solar").val()&&void 0!=$("#acoplar-solar").val()?($(".solar-termico-results").attr("style","display:none"),$(".nota-acoplar").html("*O investimento estimado incorpora os custos com equipamentos/tecnologia, com depósitos e/ou acessórios e os respetivos custos de instalação.").show()):($(".solar-termico-results").removeAttr("style"),$(".nota-acoplar").html("*O investimento estimado incorpora os custos com o sistema solar térmico, com equipamentos/tecnologia, com depósitos e/ou acessórios e os respetivos custos de instalação.").show()),e=total_cenarioI_mes,a=total_cenarioI_custos,o=totalEnergiaSolarPerc,r=total_cenarioF_mes,t=total_cenarioF_custos,i=total_cenarioI_custos-total_cenarioF_custos,i<=0&&$("#errorAQS").html("A implementação da medida seleccionada resultará num aumento de custos face à situação actual."),n=i/total_cenarioI_custos,(s=void 0!=h&&""!=h?new Number(h):new Number((totalRacio/area_coletor_solar).toFixed(0)))<avisos[4].valor)return alert(avisos[4].mensagem),0;l=void 0==h||""==h?new Number((s*area_coletor_solar).toFixed(0)):new Number((h*area_coletor_solar).toFixed(0));var E=max(necessidades_mes_kWh);c=arred(necessidades_mes_kWh[0]/fatores_conversao[0]/fatores_conversao[1]/meses_numero_horas[E].n_dias/($("#temp-req").val()-temperatura_media),-2),u=l<10?l*investimento[0].info[0].valor:l>100?l*investimento[0].info[2].valor:investimento[0].info[1].valor*l,_=maxValor(cenarioF_mes)/tecnologia_futura[f].rendimento/meses_numero_horas[max(cenarioF_mes)].n_dias/2*tecnologia_futura[f].investimento;var F=c<500?c*investimento[1].info[0].valor:c>2e3?c*investimento[1].info[2].valor:c*investimento[1].info[1].valor;return d=$("#sis-prod").val()>=5&&$("#sis-prod").val()<8?F:F/2,v=0==$("#acoplar-solar").val()?(u+_+d)*investimento[2].valor_direto:(_+d)*investimento[2].valor_direto,m=0==$("#acoplar-solar").val()&&""!=$("#acoplar-solar").val()&&void 0!=$("#acoplar-solar").val()?u+_+d+v:_+d+v,g=m*investimento[3].valor_direto,p=m/i,$("#consumoCI").html(e.toFixed(0)+" kWh"),$("#custosCI").html(new Number(a).toFixed(0)+" €"),$("#consumosCF").html(r.toFixed(0)+" kWh"),$("#custosCF").html(new Number(t).toFixed(0)+" €"),$("#contributoSolarTermico").html(new Number(100*o).toFixed(0)+"%"),$("#reducaoValor").html(i.toFixed(0)+" €"),$("#reducaoPercent").html(new Number(100*n).toFixed(0)+"%"),$("#numeroColetores").html(s.toFixed(0)),$("#areaColetores").html(l.toFixed(0)+" m2"),$("#vAcumulacao").html(new Number(c).toFixed(0)+" litros"),$("#investimentoTotal").html(m.toFixed(0)+" €"),$("#custosColectores").html(u.toFixed(0)+" €"),$("#custosEquipamento").html(_.toFixed(0)+" €"),$("#custosDepositos").html(d.toFixed(0)+" €"),$("#custosInstalacao").html(v.toFixed(0)+" €"),$("#custosOpManutencao").html(g.toFixed(0)+" €"),$("#periodoRetorno").html(p.toFixed(1)+" anos"),1}function max(e){var a=0,o=0;for(i=0;i<e.length;i++)new Number(e[i])>new Number(a)&&(a=e[i],o=i);return o}function maxValor(e){var a=0;for(i=0;i<e.length;i++)new Number(e[i])>new Number(a)&&(a=e[i]);return a}function arred(e,a){var o=0;return-1==a?o=10*Math.round(e/10):-2==a?o=100*Math.round(e/100):-3==a?o=1e3*Math.round(e/1e3):-4==a&&(o=1e4*Math.round(e/1e4)),o}