const express = require('express');
const sequelize = require('../config/database'); 
const QuestionarioModel = require("../models/Questionario").default;
const Questionario = QuestionarioModel(sequelize);
const UsuarioModel = require('../models/Usuario').default; 
const Usuario = UsuarioModel(sequelize); 

module.exports = {
    async criar(req, res) {
        try {
            
            const {
                empregado, quantos_animais_possui, motivos_para_adotar, quem_vai_sustentar_o_animal, numero_adultos_na_casa, numero_criancas_na_casa, idades_criancas,
                residencia_tipo, proprietario_permite_animais, todos_de_acordo_com_adocao, responsavel_pelo_animal, responsavel_concorda_com_adocao,
                ha_alergico_ou_pessoas_que_nao_gostam, gasto_mensal_estimado, valor_disponivel_no_orcamento, tipo_alimentacao, local_que_o_animal_vai_ficar, forma_de_permanencia,
                forma_de_confinamento, tera_brinquedos, tera_abrigo, tera_passeios_sozinho, tera_passeios_acompanhado, companhia_outro_animal, companhia_humana_24h,
                companhia_humana_parcial, sem_companhia_animal, sem_companhia_humana, o_que_faz_em_viagem, o_que_faz_se_fugir, o_que_faz_se_nao_puder_criar, animais_que_ja_criou,
                destino_animais_anteriores, costuma_esterilizar, costuma_vacinar, costuma_vermifugar, veterinario_usual, forma_de_educar, envia_fotos_e_videos_do_local,
                aceita_visitas_e_fotos_do_animal, topa_entrar_grupo_adotantes, concorda_com_taxa_adocao, data_disponivel_para_buscar_animal
            } = req.body;
            
            const faltando = camposObrigatorios.filter(campo => dados[campo] === undefined || dados[campo] === null || dados[campo] === "");
            if (faltando.length > 0) {
            return res.status(400).json({
                erro: `Campos obrigatórios ausentes: ${faltando.join(", ")}`
            });
            }
            
            const novoQuestionario = await Questionario.create({empregado, quantos_animais_possui, motivos_para_adotar, quem_vai_sustentar_o_animal, numero_adultos_na_casa, numero_criancas_na_casa, idades_criancas,
                residencia_tipo, proprietario_permite_animais, todos_de_acordo_com_adocao, responsavel_pelo_animal, responsavel_concorda_com_adocao,
                ha_alergico_ou_pessoas_que_nao_gostam, gasto_mensal_estimado, valor_disponivel_no_orcamento, tipo_alimentacao, local_que_o_animal_vai_ficar, forma_de_permanencia,
                forma_de_confinamento, tera_brinquedos, tera_abrigo, tera_passeios_sozinho, tera_passeios_acompanhado, companhia_outro_animal, companhia_humana_24h,
                companhia_humana_parcial, sem_companhia_animal, sem_companhia_humana, o_que_faz_em_viagem, o_que_faz_se_fugir, o_que_faz_se_nao_puder_criar, animais_que_ja_criou,
                destino_animais_anteriores, costuma_esterilizar, costuma_vacinar, costuma_vermifugar, veterinario_usual, forma_de_educar, envia_fotos_e_videos_do_local,
                aceita_visitas_e_fotos_do_animal, topa_entrar_grupo_adotantes, concorda_com_taxa_adocao, data_disponivel_para_buscar_animal
            });
            res.status(201).json(novoQuestionario)
        } catch (error) {
            return res.status(500).json({error: "Erro interno ao realizar o questionário."})
        }
        
    }

}