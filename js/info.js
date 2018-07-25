var escolhas = [
    "Não conhece",
    "Sim",
    "Não"
];


var idades = [
    "< 10 anos",
    "> 20 anos",
    "10 a 20 anos"
];

var conhece_consumo = ["Sim","Não"];

var consumo_energia = ["Total anual","Mensal"];

var tecnologia_atual = [
    {
        nome: "Bomba de calor",
        custo_unit: 0.2, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 2.75 //275%
            },
            {
                nome: "> 20 anos",
                valor: 2.00 //200%
            },
            {
                nome: "10 a 20 anos",
                valor: 2.50 //250%
            }
        ],
        unidade: "kWh",
        fator_conversao: 1
    },
    {
        nome: "Caldeira (biomassa)",
        custo_unit: 0.043, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.6 //60%
            },
            {
                nome: "> 20 anos",
                valor: 0.6 //60%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.6 //60%
            }
        ],
        unidade: "kg",
        fator_conversao: 4
    },
    {
        nome: "Caldeira (gás natural)",
        custo_unit: 0.10, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.87 //87%
            },
            {
                nome: "> 20 anos",
                valor: 0.79 //79%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.83 //83%
            }
        ],
        unidade: "m3",
        fator_conversao: 10.53
    },
    {
        nome: "Caldeira (gás propano)",
        custo_unit: 0.12, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.87 //87%
            },
            {
                nome: "> 20 anos",
                valor: 0.79 //79%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.83 //83%
            }
        ],
        unidade: "kg",
        fator_conversao: 12.96
    },
    {
        nome: "Caldeira (gasóleo)",
        custo_unit: 0.12, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.8 //80%
            },
            {
                nome: "> 20 anos",
                valor: 0.72 //72%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.76 //76%
            }
        ],
        unidade: "litro",
        fator_conversao: 10.07
    },
    {
        nome: "Esquentador (gás natural)",
        custo_unit: 0.10, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.85 //85%
            },
            {
                nome: "> 20 anos",
                valor: 0.75 //75%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.8 //80%
            }
        ],
        unidade: "m3",
        fator_conversao: 10.53
    },
    {
        nome: "Esquentador (gás propano)",
        custo_unit: 0.12, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.85 //85%
            },
            {
                nome: "> 20 anos",
                valor: 0.75 //75%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.8 //80%
            }
        ],
        unidade: "kg",
        fator_conversao: 12.96
    },
    {
        nome: "Termoacumulador elétrico",
        custo_unit: 0.20, //euros
        rendimento: [
            {
                nome: "< 10 anos",
                valor: 0.95 //95%
            },
            {
                nome: "> 20 anos",
                valor: 0.85 //85%
            },
            {
                nome: "10 a 20 anos",
                valor: 0.9 //90%
            }
        ],
        unidade: "kWh",
        fator_conversao: 1
    }
];

var tecnologia_futura = [
    {
        nome: "Bomba de calor",
        custo_unit: 0.20, // €/kWh
        rendimento: 3.60, // 360%
        investimento: 500.00, // €/kW
        unidade: "kWh",
        fator_conversao: 1
    },
    {
        nome: "Caldeira (biomassa)",
        custo_unit: 0.043, // €/kWh
        rendimento: 0.9, // 90%
        investimento: 150.00, // €/kW
        unidade: "kg",
        fator_conversao: 4.67
    },
    {
        nome: "Caldeira de condensação (gás natural)",
        custo_unit: 0.10, // €/kWh
        rendimento: 1.10, // 110%
        investimento: 100.00, // €/kW
        unidade: "m3",
        fator_conversao: 10.53
    },
    {
        nome: "Caldeira de condensação (gás propano)",
        custo_unit: 0.12, // €/kWh
        rendimento: 1.10, // 360%
        investimento: 100.00, // €/kW
        unidade: "kg",
        fator_conversao: 12.96
    }
]

var consumos = ["Total Anual", "Mensais"];

var consumo_diario_agua = [
    {
        nome: "Cafetaria",
        valor: 1,
        litros_por: "litro/peq.-almoço",
        numero_de: "n° de pequenos almoços"
    },
    {
        nome: "Campismo",
        valor: 40,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Escola",
        valor: 3,
        litros_por: "litro/aluno",
        numero_de: "n° de alunos"
    },
    {
        nome: "Escritório",
        valor: 3,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Ginásio",
        valor: 25,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Hospital e clínica",
        valor: 55,
        litros_por: "litro/cama",
        numero_de: "n° de camas"
    },
    {
        nome: "Hotel / Residencial",
        valor: 55,
        litros_por: "litro/cama",
        numero_de: "n° de camas"
    },
    {
        nome: "Quartel",
        valor: 20,
        litros_por: "litro/pessoa",
        numero_de: "n° de pessoas"
    },
    {
        nome: "Residência de estudantes",
        valor: 55,
        litros_por: "litro/cama",
        numero_de: "n° de camas"
    },
    {
        nome: "Restaurante / Cantina",
        valor: 10,
        litros_por: "litro/refeição",
        numero_de: "n° de refeições"
    }
];

var perfil_mensal = [
    {
        nome: "Consumo similar em todos os meses do ano",
        latitude: -5,
        consumo: 0.6 //60%
    },
    {
        nome: "Maior consumo no Semeste de Inverno",
        latitude: 15,
        consumo: 0.6 //60%
    },
    {
        nome: "Maior consumo no Semestre de Verão",
        latitude: -15,
        consumo: 0.6 //60%
    },
    {
        nome: "Definir 'perfil'",
        latitude: -5,
        consumo: 0.6 //60%
    }
];

var perfil_semanal = [
    {
        nome: "Consumo predominantemente durante o fim de semana",
        valor: 0.3, //30%
        consumo: 0.8 //80%
    },
    {
        nome: "Consumo durante os dias úteis",
        valor: 0.75, //75%
        consumo: 0.8 //80%
    },
    {
        nome: "Consumo similar em todos os dias",
        valor: 0, //0%
        consumo: 0.8 //80%
    },
    {
        nome: "Definir 'perfil'",
        valor: 0, //0%
        consumo: 0.8 //80%
    }
];

var temperatura_utilizacao = 50; //°C

var temperatura_media = 12; //°C

var desvios = [
    {
        nome: "Desvio de Sul +/- 10°",
        valor: 10
    },
    {
        nome: "Desvio de Sul +/- 20°",
        valor: 20
    },
//    {
//        nome: "Este",
//        valor: "!"
//    },
//    {
//        nome: "Oeste",
//        valor: "!"
//    },
    {
        nome: "Sul",
        valor: 0
    }
//    {
//        nome: "Outra orientação (desvio de Sul)",
//        valor: "preencher"
//    }
];


var area_coletor_solar = 2.25; //m²

var rendimento_otico = 0.75; //75%


var coeficient_perdas = 4.2; //N/S

var perdas = [
    {
        nome: "Perdas gerais",
        valor: 0.15 //%
    },
    {
        nome: "Perdas por sujidade",
        valor: 0.94
    },
    {
        nome: "Perdas por regulação",
        valor: 0.94
    }
];

var volume_acumulacao = 65; //l/m²

var fatores_conversao = [
    0.0041855, //kcal --> MJ
    0.2777 //MJ --> kWh
];

var avisos = [
    {
        nome: "Aviso de produção excedentária",
        valor: 0.4, //40%
        mensagem: "Demasiada energia excedentária no Verão. Considere reduzir o n.º de colectores solares de modo a não ter muita energia excedentária ou salvaguarde a instalação de sistemas de proteção e/ou o escoamento da energia excedente."
    },
    {
        nome: "Aviso de projeto",
        valor: 20, //20m²
        mensagem: "OBS: requer projeto de execução (Portaria 701-H/2008) e sistema de monitorização com registo de produção."
    },
    {
        nome: "Aviso de orientação",
        valor: 20, //20°
        mensagem: "Desvio superior a 20º relativamente a Sul influencia a rentabilidade energética do sistema solar."
    },
    {
        nome: "Aviso de inclinação",
        valor: 15, //15°
        mensagem: "Um desvio superior em 15º relativamente ao ângulo considerado ideal poderá influenciar a rentabilidade energética do sistema solar."
    }
];

var investimento = [
    {
        nome: "Coletores",
        info: [
            {
                tipo: "até 10 m²",
                valor: 250, //250.00€
                unidade: "€/m²"
            },
            {
                tipo: "10 a 100 m²",
                valor: 200, //200.00€
                unidade: "€/m²"
            },
            {
                tipo: "mais de 100 m²",
                valor: 150, //150.00€
                unidade: "€/m²"
            }
        ]
    },
    {
        nome: "Acumulação",
        info: [
            {
                tipo: "até 500 litros",
                valor: 5, //5.00€
                unidade: "€/litro"
            },
            {
                tipo: "500 a 2000 litros",
                valor: 4, //4.00€
                unidade: "€/litro"
            },
            {
                tipo: "mais de 2000 litros",
                valor: 3, //3.00€
                unidade: "€/litro"
            }
        ]
    },
    {
        nome: "Instalação",
        valor_direto: 0.2 //20%
    },
    {
        nome: "Manutenção",
        valor_direto: 0.05 //5%
    }
];

var meses_numero_horas = [
    {
        mes: "Janeiro",
        n_dias: 31,
        n_horas_sol: 8.0,
        aqs_mensal: 0.092 // 9.2%
    },
    {
        mes: "Fevereiro",
        n_dias: 28,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Março",
        n_dias: 31,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Abril",
        n_dias: 30,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Maio",
        n_dias: 31,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Junho",
        n_dias: 30,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Julho",
        n_dias: 31,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Agosto",
        n_dias: 31,
        n_horas_sol: 9.5,
        aqs_mensal: 0.078 // 7.8%
    },
    {
        mes: "Setembro",
        n_dias: 30,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Outubro",
        n_dias: 31,
        n_horas_sol: 9.0,
        aqs_mensal: 0.082 // 8.2%
    },
    {
        mes: "Novembro",
        n_dias: 30,
        n_horas_sol: 8.0,
        aqs_mensal: 0.092 // 9.2%
    },
    {
        mes: "Dezembro",
        n_dias: 31,
        n_horas_sol: 7.5,
        aqs_mensal: 0.098 // 9.8%
    }
];

var irradiacao_temp_amb_temp_agua = [
    {
        //dados em MJ/m²
        distritoI: "Açores",
        latitude: 38,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 6.3,
                valorTempAmb: 13.4,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.7,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1
            },
            {
                nomeI: "Março",
                valorIrr: 11.9,
                valorTempAmb: 13.4,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Abril",
                valorIrr: 15.4,
                valorTempAmb: 14.1,
                valorTempAgua: 15.1
            },
            {
                nomeI: "Maio",
                valorIrr: 18.6,
                valorTempAmb: 15.7,
                valorTempAgua: 15.5
            },
            {
                nomeI: "Junho",
                valorIrr: 19.0,
                valorTempAmb: 17.6,
                valorTempAgua: 16.5
            },
            {
                nomeI: "Julho",
                valorIrr: 21.1,
                valorTempAmb: 19.7,
                valorTempAgua: 17.5
            },
            {
                nomeI: "Agosto",
                valorIrr: 19.1,
                valorTempAmb: 20.8,
                valorTempAgua: 18.0
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.2,
                valorTempAmb: 19.8,
                valorTempAgua: 17.4
            },
            {
                nomeI: "Outubro",
                valorIrr: 10.8,
                valorTempAmb: 18.0,
                valorTempAgua: 16.9
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.1,
                valorTempAmb: 15.8,
                valorTempAgua: 15.4
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.5,
                valorTempAmb: 14.4,
                valorTempAgua: 14.9
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Aveiro",
        latitude: 40,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 6.2,
                valorTempAmb: 8.7,
                valorTempAgua: 10.9
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.1,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1
            },
            {
                nomeI: "Março",
                valorIrr: 12.2,
                valorTempAmb: 13.4,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Abril",
                valorIrr: 17.6,
                valorTempAmb: 14.1,
                valorTempAgua: 15.1
            },
            {
                nomeI: "Maio",
                valorIrr: 20.7,
                valorTempAmb: 15.7,
                valorTempAgua: 15.5
            },
            {
                nomeI: "Junho",
                valorIrr: 22.1,
                valorTempAmb: 17.6,
                valorTempAgua: 16.5
            },
            {
                nomeI: "Julho",
                valorIrr: 23.9,
                valorTempAmb: 19.7,
                valorTempAgua: 17.5
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.7,
                valorTempAmb: 20.8,
                valorTempAgua: 18.0
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.8,
                valorTempAmb: 19.8,
                valorTempAgua: 17.4
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.4,
                valorTempAmb: 18.0,
                valorTempAgua: 16.9
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.6,
                valorTempAmb: 15.8,
                valorTempAgua: 15.4
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.9,
                valorTempAmb: 14.4,
                valorTempAgua: 14.9
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Beja",
        latitude: 38,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 8.1,
                valorTempAmb: 9.9,
                valorTempAgua: 12.2
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.9,
                valorTempAmb: 10.7,
                valorTempAgua: 13.8
            },
            {
                nomeI: "Março",
                valorIrr: 14.6,
                valorTempAmb: 12.2,
                valorTempAgua: 14.2
            },
            {
                nomeI: "Abril",
                valorIrr: 19.4,
                valorTempAmb: 14.2,
                valorTempAgua: 15.2
            },
            {
                nomeI: "Maio",
                valorIrr: 24.1,
                valorTempAmb: 17.6,
                valorTempAgua: 17.7
            },
            {
                nomeI: "Junho",
                valorIrr: 26.0,
                valorTempAmb: 21.2,
                valorTempAgua: 18.7
            },
            {
                nomeI: "Julho",
                valorIrr: 27.7,
                valorTempAmb: 24.7,
                valorTempAgua: 20.2
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.0,
                valorTempAmb: 24.6,
                valorTempAgua: 20.1
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.8,
                valorTempAmb: 22.5,
                valorTempAgua: 19.1
            },
            {
                nomeI: "Outubro",
                valorIrr: 13.1,
                valorTempAmb: 18.2,
                valorTempAgua: 17.1
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.2,
                valorTempAmb: 13.2,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.4,
                valorTempAmb: 10.2,
                valorTempAgua: 13.1
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Braga",
        latitude: 41,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 7.7,
                valorTempAgua: 10.3
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.7,
                valorTempAmb: 8.5,
                valorTempAgua: 10.8

            },
            {
                nomeI: "Março",
                valorIrr: 12.3,
                valorTempAmb: 10.3,
                valorTempAgua: 11.8
            },
            {
                nomeI: "Abril",
                valorIrr: 17.2,
                valorTempAmb: 12.1,
                valorTempAgua: 11.8
            },
            {
                nomeI: "Maio",
                valorIrr: 20.3,
                valorTempAmb: 15.0,
                valorTempAgua: 14.3
            },
            {
                nomeI: "Junho",
                valorIrr: 22.6,
                valorTempAmb: 18.2,
                valorTempAgua: 15.8
            },
            {
                nomeI: "Julho",
                valorIrr: 24.2,
                valorTempAmb: 20.5,
                valorTempAgua: 16.8
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.7,
                valorTempAmb: 20.2,
                valorTempAgua: 16.7
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.6,
                valorTempAmb: 18.5,
                valorTempAgua: 15.7
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.0,
                valorTempAmb: 15.1,
                valorTempAgua: 14.2
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.2,
                valorTempAmb: 10.3,
                valorTempAgua: 11.7
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.5,
                valorTempAmb: 7.9,
                valorTempAgua: 10.2
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Bragança",
        latitude: 41,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 5.0,
                valorTempAgua: 8.8
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.1,
                valorTempAmb: 6.3,
                valorTempAgua: 9.3
            },
            {
                nomeI: "Março",
                valorIrr: 13.2,
                valorTempAmb: 8.8,
                valorTempAgua: 10.2
            },
            {
                nomeI: "Abril",
                valorIrr: 17.1,
                valorTempAmb: 10.8,
                valorTempAgua: 11.2
            },
            {
                nomeI: "Maio",
                valorIrr: 20.9,
                valorTempAmb: 14.4,
                valorTempAgua: 13.2
            },
            {
                nomeI: "Junho",
                valorIrr: 24.2,
                valorTempAmb: 18.1,
                valorTempAgua: 15.2
            },
            {
                nomeI: "Julho",
                valorIrr: 25.6,
                valorTempAmb: 21.1,
                valorTempAgua: 16.7
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.9,
                valorTempAmb: 20.7,
                valorTempAgua: 16.1
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.3,
                valorTempAmb: 17.9,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Outubro",
                valorIrr: 10.9,
                valorTempAmb: 13.3,
                valorTempAgua: 12.6
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.1,
                valorTempAmb: 8.4,
                valorTempAgua: 10.1
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.1,
                valorTempAmb: 5.5,
                valorTempAgua: 8.5
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Castelo Branco",
        latitude: 40,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 7.1,
                valorTempAmb: 7.7,
                valorTempAgua: 10.8
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.9,
                valorTempAmb: 8.5,
                valorTempAgua: 11.3
            },
            {
                nomeI: "Março",
                valorIrr: 13.6,
                valorTempAmb: 10.4,
                valorTempAgua: 12.3
            },
            {
                nomeI: "Abril",
                valorIrr: 18.5,
                valorTempAmb: 12.2,
                valorTempAgua: 13.2
            },
            {
                nomeI: "Maio",
                valorIrr: 22.4,
                valorTempAmb: 16.0,
                valorTempAgua: 15.2
            },
            {
                nomeI: "Junho",
                valorIrr: 25.0,
                valorTempAmb: 20.0,
                valorTempAgua: 17.2
            },
            {
                nomeI: "Julho",
                valorIrr: 27.0,
                valorTempAmb: 23.1,
                valorTempAgua: 18.7
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.4,
                valorTempAmb: 22.7,
                valorTempAgua: 18.2
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.4,
                valorTempAmb: 20.3,
                valorTempAgua: 17.2
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.3,
                valorTempAmb: 15.4,
                valorTempAgua: 14.7
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.3,
                valorTempAmb: 10.8,
                valorTempAgua: 12.1
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.5,
                valorTempAmb: 8.0,
                valorTempAgua: 11.1
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Coimbra",
        latitude: 40,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 6.5,
                valorTempAmb: 8.9,
                valorTempAgua: 11.2
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.5,
                valorTempAmb: 9.5,
                valorTempAgua: 11.7
            },
            {
                nomeI: "Março",
                valorIrr: 12.6,
                valorTempAmb: 10.5,
                valorTempAgua: 12.2
            },
            {
                nomeI: "Abril",
                valorIrr: 18.0,
                valorTempAmb: 12.2,
                valorTempAgua: 13.1
            },
            {
                nomeI: "Maio",
                valorIrr: 21.3,
                valorTempAmb: 15.5,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Junho",
                valorIrr: 23.0,
                valorTempAmb: 18.5,
                valorTempAgua: 16.1
            },
            {
                nomeI: "Julho",
                valorIrr: 24.7,
                valorTempAmb: 21.0,
                valorTempAgua: 17.6
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.6,
                valorTempAmb: 21.0,
                valorTempAgua: 17.6
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.4,
                valorTempAmb: 19.5,
                valorTempAgua: 16.6
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.8,
                valorTempAmb: 16.0,
                valorTempAgua: 15.1
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.9,
                valorTempAmb: 11.5,
                valorTempAgua: 12.5
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.2,
                valorTempAmb: 9.0,
                valorTempAgua: 11.5
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Évora",
        latitude: 39,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 7.9,
                valorTempAmb: 9.5,
                valorTempAgua: 12.5
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.8,
                valorTempAmb: 10.3,
                valorTempAgua: 13.0
            },
            {
                nomeI: "Março",
                valorIrr: 14.6,
                valorTempAmb: 12.0,
                valorTempAgua: 14.0
            },
            {
                nomeI: "Abril",
                valorIrr: 19.2,
                valorTempAmb: 13.9,
                valorTempAgua: 14.5
            },
            {
                nomeI: "Maio",
                valorIrr: 23.8,
                valorTempAmb: 17.2,
                valorTempAgua: 16.5
            },
            {
                nomeI: "Junho",
                valorIrr: 26.3,
                valorTempAmb: 20.8,
                valorTempAgua: 18.0
            },
            {
                nomeI: "Julho",
                valorIrr: 27.9,
                valorTempAmb: 23.9,
                valorTempAgua: 19.4
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.2,
                valorTempAmb: 23.9,
                valorTempAgua: 18.4
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.6,
                valorTempAmb: 21.9,
                valorTempAgua: 18.3
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.9,
                valorTempAmb: 17.5,
                valorTempAgua: 16.3
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.0,
                valorTempAmb: 12.8,
                valorTempAgua: 13.8
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.2,
                valorTempAmb: 9.8,
                valorTempAgua: 12.3
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Faro",
        latitude: 38,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 8.0,
                valorTempAmb: 12.0,
                valorTempAgua: 14.7
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.7,
                valorTempAmb: 12.5,
                valorTempAgua: 14.7
            },
            {
                nomeI: "Março",
                valorIrr: 14.2,
                valorTempAmb: 13.6,
                valorTempAgua: 15.2
            },
            {
                nomeI: "Abril",
                valorIrr: 19.7,
                valorTempAmb: 15.7,
                valorTempAgua: 16.2
            },
            {
                nomeI: "Maio",
                valorIrr: 24.0,
                valorTempAmb: 18.4,
                valorTempAgua: 17.6
            },
            {
                nomeI: "Junho",
                valorIrr: 26.7,
                valorTempAmb: 21.2,
                valorTempAgua: 19.1
            },
            {
                nomeI: "Julho",
                valorIrr: 27.6,
                valorTempAmb: 23.9,
                valorTempAgua: 20.7
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.6,
                valorTempAmb: 24.0,
                valorTempAgua: 20.6
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.6,
                valorTempAmb: 22.0,
                valorTempAgua: 19.6
            },
            {
                nomeI: "Outubro",
                valorIrr: 13.3,
                valorTempAmb: 18.8,
                valorTempAgua: 17.6
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.4,
                valorTempAmb: 14.9,
                valorTempAgua: 15.6
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.8,
                valorTempAmb: 12.5,
                valorTempAgua: 14.5
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Guarda",
        latitude: 40,
        mesI:  [
            {
                nomeI: "Janeiro",
                valorIrr: 7.9,
                valorTempAmb: 4.7,
                valorTempAgua: 7.8
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.8,
                valorTempAmb: 5.4,
                valorTempAgua: 8.3
            },
            {
                nomeI: "Março",
                valorIrr: 14.6,
                valorTempAmb: 7.5,
                valorTempAgua: 9.3
            },
            {
                nomeI: "Abril",
                valorIrr: 19.2,
                valorTempAmb: 9.4,
                valorTempAgua: 10.3
            },
            {
                nomeI: "Maio",
                valorIrr: 23.8,
                valorTempAmb: 13.0,
                valorTempAgua: 12.3
            },
            {
                nomeI: "Junho",
                valorIrr: 26.3,
                valorTempAmb: 16.9,
                valorTempAgua: 13.7
            },
            {
                nomeI: "Julho",
                valorIrr: 27.9,
                valorTempAmb: 20.4,
                valorTempAgua: 15.7
            },
            {
                nomeI: "Agosto",
                valorIrr: 25.2,
                valorTempAmb: 20.0,
                valorTempAgua: 15.7
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.6,
                valorTempAmb: 17.6,
                valorTempAgua: 14.2
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.9,
                valorTempAmb: 12.9,
                valorTempAgua: 11.7
            },
            {
                nomeI: "Novembro",
                valorIrr: 9.0,
                valorTempAmb: 7.8,
                valorTempAgua: 9.1
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.2,
                valorTempAmb: 5.1,
                valorTempAgua: 8.1
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Leiria",
        latitude: 40,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.8,
                valorTempAmb: 10.1,
                valorTempAgua: 12.7
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.8,
                valorTempAmb: 10.8,
                valorTempAgua: 12.7
            },
            {
                nomeI: "Março",
                valorIrr: 13.0,
                valorTempAmb: 12.2,
                valorTempAgua: 13.6
            },
            {
                nomeI: "Abril",
                valorIrr: 18.2,
                valorTempAmb: 14.0,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Maio",
                valorIrr: 21.8,
                valorTempAmb: 16.4,
                valorTempAgua: 15.6
            },
            {
                nomeI: "Junho",
                valorIrr: 23.5,
                valorTempAmb: 19.0,
                valorTempAgua: 17.1
            },
            {
                nomeI: "Julho",
                valorIrr: 24.6,
                valorTempAmb: 21.0,
                valorTempAgua: 18.1
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.6,
                valorTempAmb: 21.1,
                valorTempAgua: 18.1
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.7,
                valorTempAmb: 20.0,
                valorTempAgua: 17.6
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.0,
                valorTempAmb: 17.2,
                valorTempAgua: 16.1
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.2,
                valorTempAmb: 12.7,
                valorTempAgua: 13.6
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.5,
                valorTempAmb: 10.0,
                valorTempAgua: 12.6
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Lisboa",
        latitude: 39,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.3,
                valorTempAmb: 11.0,
                valorTempAgua: 13.8
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.3,
                valorTempAmb: 11.9,
                valorTempAgua: 13.7
            },
            {
                nomeI: "Março",
                valorIrr: 13.7,
                valorTempAmb: 13.2,
                valorTempAgua: 14.7
            },
            {
                nomeI: "Abril",
                valorIrr: 18.8,
                valorTempAmb: 15.0,
                valorTempAgua: 15.7
            },
            {
                nomeI: "Maio",
                valorIrr: 23.0,
                valorTempAmb: 17.3,
                valorTempAgua: 16.7
            },
            {
                nomeI: "Junho",
                valorIrr: 24.9,
                valorTempAmb: 20.1,
                valorTempAgua: 18.2
            },
            {
                nomeI: "Julho",
                valorIrr: 26.5,
                valorTempAmb: 22.3,
                valorTempAgua: 19.2
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.4,
                valorTempAmb: 22.5,
                valorTempAgua: 19.2
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.7,
                valorTempAmb: 21.3,
                valorTempAgua: 18.6
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.5,
                valorTempAmb: 18.1,
                valorTempAgua: 17.1
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.7,
                valorTempAmb: 14.0,
                valorTempAgua: 15.1
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.0,
                valorTempAmb: 11.4,
                valorTempAgua: 13.6
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Madeira",
        latitude: 32,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 9.4,
                valorTempAmb: 15.8,
                valorTempAgua: 16.6
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 11.0,
                valorTempAmb: 15.6,
                valorTempAgua: 16.6
            },
            {
                nomeI: "Março",
                valorIrr: 17.0,
                valorTempAmb: 15.9,
                valorTempAgua: 16.6
            },
            {
                nomeI: "Abril",
                valorIrr: 18.9,
                valorTempAmb: 16.3,
                valorTempAgua: 17.1
            },
            {
                nomeI: "Maio",
                valorIrr: 21.3,
                valorTempAmb: 17.6,
                valorTempAgua: 17.5
            },
            {
                nomeI: "Junho",
                valorIrr: 21.4,
                valorTempAmb: 19.3,
                valorTempAgua: 18.5
            },
            {
                nomeI: "Julho",
                valorIrr: 22.3,
                valorTempAmb: 20.9,
                valorTempAgua: 19.0
            },
            {
                nomeI: "Agosto",
                valorIrr: 20.9,
                valorTempAmb: 21.9,
                valorTempAgua: 19.5
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.8,
                valorTempAmb: 21.7,
                valorTempAgua: 19.4
            },
            {
                nomeI: "Outubro",
                valorIrr: 14.0,
                valorTempAmb: 21.5,
                valorTempAgua: 18.9
            },
            {
                nomeI: "Novembro",
                valorIrr: 10.0,
                valorTempAmb: 18.3,
                valorTempAgua: 17.9
            },
            {
                nomeI: "Dezembro",
                valorIrr: 8.1,
                valorTempAmb: 16.4,
                valorTempAgua: 16.9
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Portalegre",
        latitude: 39,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.6,
                valorTempAmb: 8.2,
                valorTempAgua: 11.4
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.4,
                valorTempAmb: 8.9,
                valorTempAgua: 11.4
            },
            {
                nomeI: "Março",
                valorIrr: 14.4,
                valorTempAmb: 10.6,
                valorTempAgua: 12.4
            },
            {
                nomeI: "Abril",
                valorIrr: 18.9,
                valorTempAmb: 12.7,
                valorTempAgua: 13.3
            },
            {
                nomeI: "Maio",
                valorIrr: 23.2,
                valorTempAmb: 16.2,
                valorTempAgua: 15.3
            },
            {
                nomeI: "Junho",
                valorIrr: 25.8,
                valorTempAmb: 19.9,
                valorTempAgua: 16.8
            },
            {
                nomeI: "Julho",
                valorIrr: 25.8,
                valorTempAmb: 23.0,
                valorTempAgua: 18.8
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.8,
                valorTempAmb: 22.6,
                valorTempAgua: 18.2
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.1,
                valorTempAmb: 20.4,
                valorTempAgua: 17.3
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.7,
                valorTempAmb: 15.8,
                valorTempAgua: 14.7
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.7,
                valorTempAmb: 11.4,
                valorTempAgua: 12.7
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.8,
                valorTempAmb: 8.5,
                valorTempAgua: 11.2
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Porto",
        latitude: 41,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.0,
                valorTempAmb: 8.1,
                valorTempAgua: 10.8
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.8,
                valorTempAmb: 8.7,
                valorTempAgua: 10.8
            },
            {
                nomeI: "Março",
                valorIrr: 12.2,
                valorTempAmb: 10.4,
                valorTempAgua: 11.8
            },
            {
                nomeI: "Abril",
                valorIrr: 17.3,
                valorTempAmb: 12.1,
                valorTempAgua: 12.8
            },
            {
                nomeI: "Maio",
                valorIrr: 20.3,
                valorTempAmb: 14.8,
                valorTempAgua: 13.7
            },
            {
                nomeI: "Junho",
                valorIrr: 22.3,
                valorTempAmb: 17.7,
                valorTempAgua: 15.2
            },
            {
                nomeI: "Julho",
                valorIrr: 24.1,
                valorTempAmb: 19.8,
                valorTempAgua: 16.2
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.6,
                valorTempAmb: 19.5,
                valorTempAgua: 16.1
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.5,
                valorTempAmb: 18.2,
                valorTempAgua: 15.6
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.0,
                valorTempAmb: 15.1,
                valorTempAgua: 14.1
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.3,
                valorTempAmb: 10.7,
                valorTempAgua: 11.6
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.6,
                valorTempAmb: 8.3,
                valorTempAgua: 10.6
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Santarém",
        latitude: 39,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.2,
                valorTempAmb: 10.7,
                valorTempAgua: 13.1
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.2,
                valorTempAmb: 11.7,
                valorTempAgua: 13.6
            },
            {
                nomeI: "Março",
                valorIrr: 13.5,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1
            },
            {
                nomeI: "Abril",
                valorIrr: 18.6,
                valorTempAmb: 14.7,
                valorTempAgua: 15.1
            },
            {
                nomeI: "Maio",
                valorIrr: 22.6,
                valorTempAmb: 17.4,
                valorTempAgua: 16.5
            },
            {
                nomeI: "Junho",
                valorIrr: 25.2,
                valorTempAmb: 19.8,
                valorTempAgua: 18.0
            },
            {
                nomeI: "Julho",
                valorIrr: 27.0,
                valorTempAmb: 22.4,
                valorTempAgua: 19.0
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.8,
                valorTempAmb: 22.6,
                valorTempAgua: 19.5
            },
            {
                nomeI: "Setembro",
                valorIrr: 17.5,
                valorTempAmb: 21.2,
                valorTempAgua: 18.5
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.4,
                valorTempAmb: 18.0,
                valorTempAgua: 16.4
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.5,
                valorTempAmb: 13.6,
                valorTempAgua: 14.4
            },
            {
                nomeI: "Dezembro",
                valorIrr: 6.8,
                valorTempAmb: 10.8,
                valorTempAgua: 12.9
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Setúbal",
        latitude: 39,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 7.4,
                valorTempAmb: 10.7,
                valorTempAgua: 13.1
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 10.4,
                valorTempAmb: 11.7,
                valorTempAgua: 13.6
            },
            {
                nomeI: "Março",
                valorIrr: 13.8,
                valorTempAmb: 12.9,
                valorTempAgua: 14.1
            },
            {
                nomeI: "Abril",
                valorIrr: 19.0,
                valorTempAmb: 14.7,
                valorTempAgua: 15.5
            },
            {
                nomeI: "Maio",
                valorIrr: 23.3,
                valorTempAmb: 17.4,
                valorTempAgua: 16.5
            },
            {
                nomeI: "Junho",
                valorIrr: 26.0,
                valorTempAmb: 19.8,
                valorTempAgua: 17.5
            },
            {
                nomeI: "Julho",
                valorIrr: 27.3,
                valorTempAmb: 22.4,
                valorTempAgua: 19.0
            },
            {
                nomeI: "Agosto",
                valorIrr: 24.9,
                valorTempAmb: 22.6,
                valorTempAgua: 19.0
            },
            {
                nomeI: "Setembro",
                valorIrr: 18.0,
                valorTempAmb: 21.2,
                valorTempAgua: 18.5
            },
            {
                nomeI: "Outubro",
                valorIrr: 12.7,
                valorTempAmb: 18.0,
                valorTempAgua: 17.0
            },
            {
                nomeI: "Novembro",
                valorIrr: 8.8,
                valorTempAmb: 13.6,
                valorTempAgua: 14.4
            },
            {
                nomeI: "Dezembro",
                valorIrr: 7.1,
                valorTempAmb: 10.8,
                valorTempAgua: 12.9
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Viana do Castelo",
        latitude: 41,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 9.6,
                valorTempAgua: 11.8
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.5,
                valorTempAmb: 10.3,
                valorTempAgua: 12.3
            },
            {
                nomeI: "Março",
                valorIrr: 12.6,
                valorTempAmb: 12.3,
                valorTempAgua: 12.8
            },
            {
                nomeI: "Abril",
                valorIrr: 17.0,
                valorTempAmb: 13.2,
                valorTempAgua: 13.8
            },
            {
                nomeI: "Maio",
                valorIrr: 19.9,
                valorTempAmb: 15.4,
                valorTempAgua: 14.8
            },
            {
                nomeI: "Junho",
                valorIrr: 22.8,
                valorTempAmb: 18.6,
                valorTempAgua: 16.2
            },
            {
                nomeI: "Julho",
                valorIrr: 23.6,
                valorTempAmb: 20.6,
                valorTempAgua: 17.2
            },
            {
                nomeI: "Agosto",
                valorIrr: 21.2,
                valorTempAmb: 20.2,
                valorTempAgua: 17.2
            },
            {
                nomeI: "Setembro",
                valorIrr: 15.3,
                valorTempAmb: 19.0,
                valorTempAgua: 16.7
            },
            {
                nomeI: "Outubro",
                valorIrr: 10.7,
                valorTempAmb: 15.9,
                valorTempAgua: 14.7
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.0,
                valorTempAmb: 12.1,
                valorTempAgua: 13.2
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.3,
                valorTempAmb: 10.0,
                valorTempAgua: 12.2
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Vila Real",
        latitude: 41,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 5.9,
                valorTempAmb: 6.9,
                valorTempAgua: 9.9
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 8.9,
                valorTempAmb: 8.0,
                valorTempAgua: 10.9
            },
            {
                nomeI: "Março",
                valorIrr: 12.4,
                valorTempAmb: 10.2,
                valorTempAgua: 11.9
            },
            {
                nomeI: "Abril",
                valorIrr: 17.4,
                valorTempAmb: 12.4,
                valorTempAgua: 12.9
            },
            {
                nomeI: "Maio",
                valorIrr: 20.7,
                valorTempAmb: 15.6,
                valorTempAgua: 14.4
            },
            {
                nomeI: "Junho",
                valorIrr: 23.3,
                valorTempAmb: 19.3,
                valorTempAgua: 16.4
            },
            {
                nomeI: "Julho",
                valorIrr: 24.6,
                valorTempAmb: 22.0,
                valorTempAgua: 17.9
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.2,
                valorTempAmb: 21.6,
                valorTempAgua: 17.3
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.0,
                valorTempAmb: 19.3,
                valorTempAgua: 16.3
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.1,
                valorTempAmb: 14.9,
                valorTempAgua: 13.8
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.3,
                valorTempAmb: 9.8,
                valorTempAgua: 11.3
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.5,
                valorTempAmb: 7.1,
                valorTempAgua: 10.3
            }
        ]
    },
    {
        //dados em MJ/m²
        distritoI: "Viseu",
        latitude: 40,
        mesI: [
            {
                nomeI: "Janeiro",
                valorIrr: 6.3,
                valorTempAmb: 5.9,
                valorTempAgua: 8.6
            },
            {
                nomeI: "Fevereiro",
                valorIrr: 9.2,
                valorTempAmb: 6.5,
                valorTempAgua: 9.1
            },
            {
                nomeI: "Março",
                valorIrr: 12.5,
                valorTempAmb: 8.3,
                valorTempAgua: 10.1
            },
            {
                nomeI: "Abril",
                valorIrr: 17.8,
                valorTempAmb: 10.2,
                valorTempAgua: 11.1
            },
            {
                nomeI: "Maio",
                valorIrr: 21.1,
                valorTempAmb: 13.4,
                valorTempAgua: 12.6
            },
            {
                nomeI: "Junho",
                valorIrr: 23.1,
                valorTempAmb: 17.0,
                valorTempAgua: 14.6
            },
            {
                nomeI: "Julho",
                valorIrr: 25.4,
                valorTempAmb: 20.3,
                valorTempAgua: 16.1
            },
            {
                nomeI: "Agosto",
                valorIrr: 22.9,
                valorTempAmb: 20.1,
                valorTempAgua: 16.1
            },
            {
                nomeI: "Setembro",
                valorIrr: 16.2,
                valorTempAmb: 17.9,
                valorTempAgua: 14.5
            },
            {
                nomeI: "Outubro",
                valorIrr: 11.5,
                valorTempAmb: 13.8,
                valorTempAgua: 12.5
            },
            {
                nomeI: "Novembro",
                valorIrr: 7.6,
                valorTempAmb: 8.6,
                valorTempAgua: 10.0
            },
            {
                nomeI: "Dezembro",
                valorIrr: 5.9,
                valorTempAmb: 6.2,
                valorTempAgua: 9.0
            }
        ]
    }
];

var correcao_inclinacao = [
    {
        latitude: 32,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.26
            },
            {
                nome: "Fevereiro",
                valor: 1.19
            },
            {
                nome: "Março",
                valor: 1.10
            },
            {
                nome: "Abril",
                valor: 1.01
            },
            {
                nome: "Maio",
                valor: 0.95
            },
            {
                nome: "Junho",
                valor: 0.92
            },
            {
                nome: "Julho",
                valor: 0.95
            },
            {
                nome: "Agosto",
                valor: 1.02
            },
            {
                nome: "Setembro",
                valor: 1.13
            },
            {
                nome: "Outubro",
                valor: 1.24
            },
            {
                nome: "Novembro",
                valor: 1.32
            },
            {
                nome: "Dezembro",
                valor: 1.31
            }
        ]
    },
    {
        latitude: 38,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.34
            },
            {
                nome: "Fevereiro",
                valor: 1.25
            },
            {
                nome: "Março",
                valor: 1.15
            },
            {
                nome: "Abril",
                valor: 1.04
            },
            {
                nome: "Maio",
                valor: 0.96
            },
            {
                nome: "Junho",
                valor: 0.94
            },
            {
                nome: "Julho",
                valor: 0.97
            },
            {
                nome: "Agosto",
                valor: 1.05
            },
            {
                nome: "Setembro",
                valor: 1.19
            },
            {
                nome: "Outubro",
                valor: 1.34
            },
            {
                nome: "Novembro",
                valor: 1.43
            },
            {
                nome: "Dezembro",
                valor: 1.42
            }
        ]
    },
    {
        latitude: 39,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.35
            },
            {
                nome: "Fevereiro",
                valor: 1.27
            },
            {
                nome: "Março",
                valor: 1.16
            },
            {
                nome: "Abril",
                valor: 1.05
            },
            {
                nome: "Maio",
                valor: 0.97
            },
            {
                nome: "Junho",
                valor: 0.94
            },
            {
                nome: "Julho",
                valor: 0.98
            },
            {
                nome: "Agosto",
                valor: 1.06
            },
            {
                nome: "Setembro",
                valor: 1.20
            },
            {
                nome: "Outubro",
                valor: 1.35
            },
            {
                nome: "Novembro",
                valor: 1.45
            },
            {
                nome: "Dezembro",
                valor: 1.43
            }
        ]
    },
    {
        latitude: 40,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.37
            },
            {
                nome: "Fevereiro",
                valor: 1.28
            },
            {
                nome: "Março",
                valor: 1.17
            },
            {
                nome: "Abril",
                valor: 1.06
            },
            {
                nome: "Maio",
                valor: 0.98
            },
            {
                nome: "Junho",
                valor: 0.95
            },
            {
                nome: "Julho",
                valor: 0.98
            },
            {
                nome: "Agosto",
                valor: 1.07
            },
            {
                nome: "Setembro",
                valor: 1.21
            },
            {
                nome: "Outubro",
                valor: 1.37
            },
            {
                nome: "Novembro",
                valor: 1.47
            },
            {
                nome: "Dezembro",
                valor: 1.45
            }
        ]
    },
    {
        latitude: 41,
        meses: [
            {
                nome: "Janeiro",
                valor: 1.38
            },
            {
                nome: "Fevereiro",
                valor: 1.29
            },
            {
                nome: "Março",
                valor: 1.18
            },
            {
                nome: "Abril",
                valor: 1.07
            },
            {
                nome: "Maio",
                valor: 0.99
            },
            {
                nome: "Junho",
                valor: 0.96
            },
            {
                nome: "Julho",
                valor: 0.99
            },
            {
                nome: "Agosto",
                valor: 1.08
            },
            {
                nome: "Setembro",
                valor: 1.22
            },
            {
                nome: "Outubro",
                valor: 1.38
            },
            {
                nome: "Novembro",
                valor: 1.49
            },
            {
                nome: "Dezembro",
                valor: 1.47
            }
        ]
    }
];