const express = require('express');
const questionario = express();
 
questionario.use(express.json());
 
let questionarios = [];
 
questionario.post ('./questionarios', (req, res) =>{
    try {
        const novoQuestionario = {
            empregado: req.body.empregado,
            quantos_animais_possui: req.body.quantos_animais_possui,
            motivos_para_adotar: req.body.motivos_para_adotar,
            quem_vai_sustentar_o_animal: req.body.quem_vai_sustentar_o_animal,
            numeros_adultos_na_casa: req.body.numeros_adultos_na_casa,
            numero_criancas_na_casa: req.body.numero_criancas_na_casa,
            idades_criancas: req.body.idades_criancas,
            residencia_tipo: req.body.residencia_tipo,
            proprietario_permite_animais: req.body.proprietario_permite_animais,
            todos_de_acordo_com_adocao: req.body.todos_de_acordo_com_adocao,
            responsavel_pelo_animal: req.body.responsavel_pelo_animal,
            responsavel_concorda_com_adocao: req.body.responsavel_concorda_com_adocao,
            ha_alergico_ou_pessoas_que_nao_gostam: req.body.ha_alergico_ou_pessoas_que_nao_gostam,
            gasto_mensal_estimado: req.body.gasto_mensal_estimado,
            valor_disponivel_no_orcamento: req.body.valor_disponivel_no_orcamento,
            tipo_alimentacao: req.body.tipo_alimentacao,
            local_que_o_animal_vai_ficar: req.body.local_que_o_animal_vai_ficar,
            forma_de_permanencia: req.body.forma_de_permanencia,
            forma_de_confinamento: req.body.forma_de_confinamento,
            tera_brinquedos: req.body.tera_brinquedos,
            tera_passeios_acompanhado: req.body.tera_passeios_acompanhado,
            tera_passeios_sozinho: req.body.tera_passeios_sozinho,
            companhia_outro_animal: req.body.companhia_outro_animal,
            companhia_humana_24h: req.body.companhia_humana_24h,
            companhia_humana_parcial: req.body.companhia_humana_parcial,
            sem_companhia_humana: req.body.sem_companhia_humana,
            sem_companhia_animal: req.body.sem_companhia_animal,
            o_que_faz_em_viagem: req.body.o_que_faz_em_viagem,
            o_que_faz_se_fugir: req.body.o_que_faz_se_fugir,
            o_que_faz_se_nao_puder_criar: req.body.o_que_faz_se_nao_puder_criar,
            animais_que_ja_criou: req.body.animais_que_ja_criou,
            destino_animais_anteriores: req.body.destino_animais_anteriores,
            costuma_esterilizar: req.body.costuma_esterilizar,
            costuma_vacinar: req.body.costuma_vacinar,
            costuma_vermifugar: req.body.costuma_vermifugar,
            veterinario_usual: req.body.veterinario_usual,
            forma_de_educar: req.body.forma_de_educar,
            envia_fotos_e_videos_do_local: req.body.envia_fotos_e_videos_do_local,
            aceita_visitas_e_fotos_do_animal: req.body.aceita_visitas_e_fotos_do_animal,
            topa_entrar_grupo_adotantes: req.body.topa_entrar_grupo_adotantes,
            concorda_com_taxa_adocao: req.body.concorda_com_taxa_adocao,
            data_disponivel_para_buscar_animal: req.body.data_disponivel_para_buscar_animal,
            createdAt: new Date(),
            updatedAt: new Date()
        };
 
        questionarios.push(novoQuestionario);
        res.status(201).json(novoQuestionario);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar questionário", erro: error.message });
    }
});