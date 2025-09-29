const express = require('express');
const sequelize = require('../config/database'); 
const QuestionarioModel = require("../models/Questionario").default;
const Questionario = QuestionarioModel(sequelize);
const UsuarioModel = require('../models/Usuario').default; 
const Usuario = UsuarioModel(sequelize); 

module.exports = {
    async criar(req, res) {
        try{  
            const {
                nome_completo, senha, email, cidade, estado, idade,
                telefone, instagram, facebook, celular, cpf, endereco, bairro, cep
            } = req.body;

            if (!nome_completo || !senha || !email || !cidade || !estado || !idade || !telefone) {
                return res.status(400).json({ erro: "Todos os campos obrigatórios devem ser preenchidos corretamente." });
            }
            
            const UsuarioExistente = await Usuario.findOne({ where: { email } });
            if (UsuarioExistente) {
                return res.status(400).json({ erro: "Email preenchido já está sendo utilizado." });
            }

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

            const novoUsuario = await Usuario.create({
                nome_completo, senha, email, cidade, estado, idade,
                telefone, celular, cpf, endereco, bairro, cep, instagram, facebook
            });
            res.status(201).json(novoUsuario);
        } catch (error) {
            return res.status(500).json({error: "Erro interno ao cadastrar usuário."})
        }
        res.status(201).json(novoTutor);
    },

    async atualizar(req, res) {
        try {
            const id = req.params.id;
    
            const usuario = await Usuario.findByPk(id)
            const questionario = await Questionario.findByPk(id);
            if (!usuario || !questionario) {
                return res.status(404).json({ error: 'Tutor não encontrado' });
            }
    
            const camposPermitidosUsuario = ['email', 'nome_completo', 'cidade', 'estado'];
            const camposPermitidosQuestionario = ["empregado", "quantos_animais_possui", "motivos_para_adotar", "quem_vai_sustentar_o_animal", "numero_adultos_na_casa", "numero_criancas_na_casa", "idades_criancas", "residencia_tipo",
                "proprietario_permite_animais", "todos_de_acordo_com_adocao", "responsavel_pelo_animal", "responsavel_concorda_com_adocao", "ha_alergico_ou_pessoas_que_nao_gostam", "gasto_mensal_estimado", "valor_disponivel_no_orcamento", "tipo_alimentacao", "local_que_o_animal_vai_ficar", "forma_de_permanencia", "forma_de_confinamento",
                "tera_brinquedos", "tera_abrigo", "tera_passeios_sozinho", "tera_passeios_acompanhado", "companhia_outro_animal", "companhia_humana_24h", "companhia_humana_parcial", "sem_companhia_animal", "sem_companhia_humana", "o_que_faz_em_viagem", "o_que_faz_se_fugir", "o_que_faz_se_nao_puder_criar",
                "animais_que_ja_criou", "destino_animais_anteriores", "costuma_esterilizar", "costuma_vacinar", "costuma_vermifugar", "veterinario_usual", "forma_de_educar",
                "envia_fotos_e_videos_do_local", "aceita_visitas_e_fotos_do_animal", "topa_entrar_grupo_adotantes", "concorda_com_taxa_adocao", "data_disponivel_para_buscar_animal"];
            
            let houveAtualizacao = false;
    
            camposPermitidosUsuario.forEach(campo => {
                if (req.body[campo] !== undefined) {
                    usuario[campo] = req.body[campo];
                    houveAtualizacao = true;
                }
            });
    
            camposPermitidosQuestionario.forEach(campo => {
                if (req.body[campo] !== undefined) {
                    questionario[campo] = req.body[campo];
                    houveAtualizacao = true;
                }
            });
    
            if (!houveAtualizacao) {
                return res.status(400).json({ error: 'Pelo menos um campo deve ser enviado para atualização.' });
            }
    
            await usuario.save();
            await questionario.save();
            res.json({ message: "Dados atualizados com sucesso.", usuario, questionario });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno ao atualizar os dados do tutor." });
        }
    },
    
    async listar(req, res) {
        try {
            const id = req.params.id;

            const usuario = await Usuario.findByPk(id)
            const questionario = await Questionario.findByPk(id);

            if (!usuario || !questionario) {
                return res.status(404).json({ error: 'Tutor não encontrado' });
            }

            res.status(200).json({ usuario, questionario });

        }catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro interno ao buscar os dados do tutor"});
        }
    }
}
        
        
