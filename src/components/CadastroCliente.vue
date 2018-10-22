<template>
        <Card :padding="24" dis-hover>
            <Row class="card-title">
                <Col span="8">
                    <h1>Cadastro de Cliente</h1>
                </Col>
            </Row>
            <Form ref="dadosPessoa" :model="dadosPessoa" label-position="top" :rules="ruleValidate">
                <Row :gutter="16">
                    <Col :xs="12" :md="8">
                        <FormItem label="Nome" prop="nome">
                            <Input v-model="dadosPessoa.nome" placeholder="Nome" />
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="RG" prop="rg">
                            <Input v-model="dadosPessoa.rg" />
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="CPF" prop="cpf">
                            <the-mask class="ivu-input ivu-input-default" v-model="dadosPessoa.cpf" :mask="['###.###.###-##']" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col :xs="12" :md="8">
                        <FormItem label="E-mail" prop="email">
                            <Input v-model="dadosPessoa.email" placeholder="E-mail" />
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="Gênero">
                            <Select v-model="dadosPessoa.genero">
                                <Option value="1">Mulher</Option>
                                <Option value="2">Homem</Option>
                                <Option value="3">Não Informar</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="Data de Nascimento">
                            <DatePicker type="date" placeholder="00/00/0000" format="dd/MM/yyyy" v-model="dadosPessoa.dataDeNascimento"></DatePicker>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col :xs="12" :md="8">
                        <FormItem label="Naturalidade">
                            <Input v-model="dadosPessoa.naturalidade" placeholder="Naturalidade" />
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="Profissão">
                            <Input v-model="dadosPessoa.profissao" placeholder="Profissão" />
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="Estado Civíl">
                            <Select v-model="dadosPessoa.estadoCivil">
                                <Option value="1">Casado</Option>
                                <Option value="2">Solteiro</Option>
                                <Option value="3">Viúvo(a)</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <h2>Telefones</h2>
                <Row :gutter="16">
                    <Col :xs="12" :md="8" :lg="6"
                        v-for="(item, index) in dadosPessoa.telefones"
                        v-if="item.status"
                        :key="index">
                        <Card dis-hover style="padding-top:20px">
                            <a href="#" slot="extra" @click.prevent="removerTelefone(index)">
                                <Icon size="30" type="ios-close" />
                            </a>
                            <FormItem
                                label="Telefone"
                                :prop="`telefones[${index}].numero`"
                                :rules="{required: true, message: 'Informe o número de telefone', trigger: 'blur'}">
                                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type ivu-input-group ivu-input-group-default ivu-input-group-with-prepend">
                                    <div class="ivu-input-group-prepend" style="">
                                        <Select v-model="item.tipoDeTelefone" style="width: 80px">
                                            <Option :value="1">Fixo</Option>
                                            <Option :value="2">Celular</Option>
                                        </Select>
                                    </div>
                                    <the-mask class="ivu-input ivu-input-default" v-model="item.numero" :mask="['(##) ####-####', '(##) #####-####']" :masked="true" />
                                </div>
                            </FormItem>
                        </Card>
                    </Col>
                    <Col :xs="12" :md="8" :lg="6">
                        <FormItem>
                            <Button type="dashed" long @click="adicionarTelefone" icon="md-add" :style="{height: '133px', fontSize: '22px'}">Adicionar telefone</Button>
                        </FormItem>
                    </Col>
                </Row>
                <h2>Endereços</h2>
                <Row :gutter="16">
                    <Col :xs="24"
                        v-for="(item, index) in dadosPessoa.enderecos"
                        v-if="item.status"
                        :key="index">
                        <Card dis-hover style="padding-top:20px">
                            <a href="#" slot="extra" @click.prevent="removerEndereco(index)">
                                <Icon size="30" type="ios-close" />
                            </a>
                            <Row :gutter="16">
                                <Col :xs="12" :md="8">
                                    <FormItem label="CEP" :prop="`enderecos[${index}].cep`"
                                    :rules="{required: true, message: 'Informe o CEP', min: 9, max: 9, trigger: 'blur'}">
                                        <the-mask class="ivu-input ivu-input-default" v-model="item.cep" :mask="['#####-###']" :masked="true" @input="onCEP(index)" />
                                    </FormItem>
                                </Col>
                                <Col :xs="12" :md="8">
                                    <FormItem label="Rua" :prop="`enderecos[${index}].logradouro`">
                                        <Input v-model="item.logradouro" placeholder="logradouro" />
                                    </FormItem>
                                </Col>
                                <Col :xs="12" :md="8">
                                    <FormItem label="Número" :prop="`enderecos[${index}].numero`">
                                        <Input v-model="item.numero" placeholder="numero" />
                                    </FormItem>
                                </Col>
                                <Col :xs="12" :md="8">
                                    <FormItem label="Bairro" :prop="`enderecos[${index}].bairro`">
                                        <Input v-model="item.bairro" placeholder="Bairro" />
                                    </FormItem>
                                </Col>
                                <Col :xs="12" :md="8">
                                    <FormItem label="Complemento" :prop="`enderecos[${index}].complemento`">
                                        <Input v-model="item.complemento" placeholder="complemento" />
                                    </FormItem>
                                </Col>
                                <Col :xs="12" :md="8">
                                    <FormItem label="Estado">
                                        <Select v-model="item.estado" @input="onEstado(index)">
                                            <Option v-for="estado in estados" :value="estado.id" :key="estado.id">{{estado.sigla}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                                <Col :xs="12" :md="8">
                                    <FormItem label="Cidade">
                                        <Select v-model="item.cidade">
                                            <Option v-for="cidade in cidades" :value="cidade.id" :key="cidade.id">{{cidade.nome}}</Option>
                                        </Select>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :xs="24">
                        <FormItem>
                            <Button type="dashed" long @click="adicionarEndereco" icon="md-add" :style="{height: '50px', fontSize: '22px'}">Adicionar endereço</Button>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem>
                    <Button type="primary" @click="salvarDados('dadosPessoa')">Salvar</Button>
                    <Button @click="limparFormulario('dadosPessoa')" style="margin-left: 8px">Limpar</Button>
                </FormItem>
            </Form>
        </Card>
    </div>
</template>
<script>
const axios = require("axios");
const moment = require("moment");
const {
  tratarErros,
  validadorCPF,
  consultarCEP,
  getEstados,
  getCidades,
  getCidade
} = require("../utils.js");
const StringMask = require("string-mask");

import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
  props: ["id"],
  data() {
    return {
      dadosPessoa: {
        nome: "",
        cpf: "",
        rg: "",
        email: "",
        dataDeNascimento: "",
        naturalidade: "",
        profissao: "",
        genero: "",
        estadoCivil: "",
        pessoaFisicaTipo: "",
        telefones: [{ numero: "", tipoDeTelefone: 0, status: 1 }],
        enderecos: [
          {
            logradouro: "",
            bairro: "",
            numero: "",
            complemento: "",
            cep: "",
            status: 1
          }
        ]
      },
      ruleValidate: {
        nome: [
          { required: true, message: "Informe um nome", trigger: "blur" },
          {
            type: "string",
            min: 3,
            max: 255,
            message: "O nome deve conter entre 3 e 255 caracters",
            trigger: "blur"
          }
        ],
        rg: [
          { required: true, message: "Informe o RG", trigger: "blur" },
          {
            type: "string",
            min: 5,
            max: 30,
            message: "O RG deve conter entre 5 e 30 caracters",
            trigger: "blur"
          }
        ],
        cpf: [
          { required: true, message: "Informe o CPF", trigger: "blur" },
          {
            validator: validadorCPF,
            trigger: "blur",
            message: "Informe um CPF válido"
          }
        ],
        email: [
          //{ required: true, message: 'Informe o email do cliente', trigger: 'blur' },
          { type: "email", message: "Informe um email válido", trigger: "blur" }
        ]
      },
      estados: [],
      cidades: []
    };
  },
  methods: {
    salvarDados(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const BASE_URL = "//35.198.15.248:8080/api/";
          if (this.dadosPessoa.id) {
            const URI = `clientes/pf/${this.dadosPessoa.id}`;
            axios
              .put(`${BASE_URL}${URI}`, this.dadosPessoa)
              .then(({ data }) => {
                this.$Message.success("Success!");
              })
              .catch(({ response }) => {
                const { data } = response;
                tratarErros(this, data);
              });
          } else {
            const URI = "clientes/pf/";
            axios
              .post(`${BASE_URL}${URI}`, this.dadosPessoa)
              .then(({ data }) => {
                this.$Message.success("Success!");
              })
              .catch(({ response }) => {
                const { data } = response;
                tratarErros(this, data);
              });
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    limparFormulario(name) {
      this.$refs[name].resetFields();
    },
    adicionarTelefone() {
      this.dadosPessoa.telefones.push({
        numero: "",
        tipoDeTelefone: 1,
        status: 1
      });
    },
    removerTelefone(index) {
      this.dadosPessoa.telefones[index].status = 0;
    },
    adicionarEndereco() {
      this.dadosPessoa.enderecos.push({
        logradouro: "",
        bairro: "",
        numero: "",
        complemento: "",
        cep: "",
        municipio: null,
        status: 1
      });
    },
    removerEndereco(index) {
      this.dadosPessoa.enderecos[index].status = 0;
    },
    async onCEP(index) {
      const cep = this.dadosPessoa.enderecos[index].cep;
      const res = await consultarCEP(cep);
      /**
       * Caso seja um CEP válido, preenche automaticamente o endereço
       */
      if (res) {
        this.dadosPessoa.enderecos[index].logradouro = res.logradouro;
        this.dadosPessoa.enderecos[index].bairro = res.bairro;
        this.dadosPessoa.enderecos[index].complemento = res.complemento;
        this.dadosPessoa.enderecos[index].cidade = parseInt(res.ibge);
        /**
         * A partir do código do IBGE da cidade consultada pelo CEP
         * Seleciona o estado no Select
         */
        // const cidade = await getCidade(res.ibge);
        // if (cidade) {
        //   const UF = cidade.microrregiao.mesorregiao.UF.id;
        //   this.dadosPessoa.enderecos[index].estado = UF;
        //   this.onEstado(index);
        // }
      }
    },
    /**
     * Carrega os Estados do Brasil
     */
    async carregarEstados() {
      const { estados } = require("../estados.js");
      //const estados = await getEstados();
      console.log("estados", estados);
      if (estados) {
        this.estados = estados;
      }
    },
    /**
     * Carrega as cidades ao selecionar um estado
     */
    async onEstado(index) {
      const UF = this.dadosPessoa.enderecos[index].estado;
      /**
       * Consulta de estados a partir do ID do IBGE
       */
      const cidades = await getCidades(UF);
      if (cidades) {
        console.log("cidades", cidades);
        this.cidades = cidades;
      }
    },
    async getDadosCliente(id) {
      const BASE_URL = "//35.198.15.248:8080/api/";
      const URI = `clientes/pf/${id}`;
      axios
        .get(`${BASE_URL}${URI}`)
        .then(({ data: cliente }) => {
          cliente.dataDeNascimento = new Date(moment(cliente.dataDeNascimento));
          cliente.telefones = cliente.telefones.map(telefone => {
            telefone.tipoDeTelefone = 1;
            telefone.status = 1;
            return telefone;
          });
          cliente.enderecos = cliente.enderecos.map(endereco => {
            endereco.status = 1;
            endereco.estado = endereco.cidade.estado.id;
            endereco.cidade = endereco.cidade.id;
            return endereco;
          });
          console.log(JSON.parse(JSON.stringify(cliente)));
          this.dadosPessoa = cliente;
          this.dadosPessoa.enderecos.map((el, index) => {
            this.onEstado(index);
          });
        })
        .catch(error => {
          console.warn(error);
        });
    }
  },
  created() {
    this.carregarEstados();
    if (this.id) {
      this.getDadosCliente(this.id);
    }
  }
};
</script>
