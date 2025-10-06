const Questionario = require('../models/Questionario')
const Usuario = require('../models/Usuario');

module.exports = {
  // POST /questionario
  async criar(req, res) {
    try {
      const dados = req.body;

      // Campos obrigatórios mínimos para aceitar o questionário
      const camposObrigatorios = [
        "empregado",
        "motivos_para_adotar",
        "quem_vai_sustentar_o_animal",
        "numero_adultos_na_casa",
        "residencia_tipo",
        "responsavel_pelo_animal",
        "responsavel_concorda_com_adocao",
        "usuarioId" // id do usuário já existente
      ];

      const faltando = camposObrigatorios.filter(
        campo => dados[campo] === undefined || dados[campo] === null || dados[campo] === ""
      );

      if (faltando.length > 0) {
        return res.status(400).json({ erro: `Campos obrigatórios ausentes: ${faltando.join(", ")}` });
      }

      // Verifica se o usuário existe
      const usuario = await Usuario.findByPk(dados.usuarioId);
      if (!usuario) {
        return res.status(404).json({ erro: "Usuário não encontrado" });
      }

      // Cria o questionário com todos os campos
      const novoQuestionario = await Questionario.create({
        empregado: dados.empregado,
        quantos_animais_possui: dados.quantos_animais_possui,
        motivos_para_adotar: dados.motivos_para_adotar,
        quem_vai_sustentar_o_animal: dados.quem_vai_sustentar_o_animal,
        numero_adultos_na_casa: dados.numero_adultos_na_casa,
        numero_criancas_na_casa: dados.numero_criancas_na_casa,
        idades_criancas: dados.idades_criancas,
        residencia_tipo: dados.residencia_tipo,
        proprietario_permite_animais: dados.proprietario_permite_animais,
        todos_de_acordo_com_adocao: dados.todos_de_acordo_com_adocao,
        responsavel_pelo_animal: dados.responsavel_pelo_animal,
        responsavel_concorda_com_adocao: dados.responsavel_concorda_com_adocao,
        ha_alergico_ou_pessoas_que_nao_gostam: dados.ha_alergico_ou_pessoas_que_nao_gostam,
        gasto_mensal_estimado: dados.gasto_mensal_estimado,
        valor_disponivel_no_orcamento: dados.valor_disponivel_no_orcamento,
        tipo_alimentacao: dados.tipo_alimentacao,
        local_que_o_animal_vai_ficar: dados.local_que_o_animal_vai_ficar,
        forma_de_permanencia: dados.forma_de_permanencia,
        forma_de_confinamento: dados.forma_de_confinamento,
        tera_brinquedos: dados.tera_brinquedos,
        tera_abrigo: dados.tera_abrigo,
        tera_passeios_sozinho: dados.tera_passeios_sozinho,
        tera_passeios_acompanhado: dados.tera_passeios_acompanhado,
        companhia_outro_animal: dados.companhia_outro_animal,
        companhia_humana_24h: dados.companhia_humana_24h,
        companhia_humana_parcial: dados.companhia_humana_parcial,
        sem_companhia_animal: dados.sem_companhia_animal,
        sem_companhia_humana: dados.sem_companhia_humana,
        o_que_faz_em_viagem: dados.o_que_faz_em_viagem,
        o_que_faz_se_fugir: dados.o_que_faz_se_fugir,
        o_que_faz_se_nao_puder_criar: dados.o_que_faz_se_nao_puder_criar,
        animais_que_ja_criou: dados.animais_que_ja_criou,
        destino_animais_anteriores: dados.destino_animais_anteriores,
        costuma_esterilizar: dados.costuma_esterilizar,
        costuma_vacinar: dados.costuma_vacinar,
        costuma_vermifugar: dados.costuma_vermifugar,
        veterinario_usual: dados.veterinario_usual,
        forma_de_educar: dados.forma_de_educar,
        envia_fotos_e_videos_do_local: dados.envia_fotos_e_videos_do_local,
        aceita_visitas_e_fotos_do_animal: dados.aceita_visitas_e_fotos_do_animal,
        topa_entrar_grupo_adotantes: dados.topa_entrar_grupo_adotantes,
        concorda_com_taxa_adocao: dados.concorda_com_taxa_adocao,
        data_disponivel_para_buscar_animal: dados.data_disponivel_para_buscar_animal,
        tutorId: dados.usuarioId // FK
      });

      return res.status(201).json(novoQuestionario);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: "Erro interno ao criar questionário." });
    }
  }
};