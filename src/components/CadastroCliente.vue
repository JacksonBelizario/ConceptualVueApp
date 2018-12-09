<template>
    <Card :padding="24" dis-hover>
        <Row class="card-title">
            <Col span="8">
                <h1>Cadastro de Cliente</h1>
            </Col>
        </Row>
        <Form :model="dadosPessoa" :rules="ruleValidate" label-position="top" ref="dadosPessoa">
            <Row :gutter="16">
                <Col :md="8" :xs="12">
                    <FormItem label="Nome" prop="nome">
                        <Input placeholder="Nome" v-model="dadosPessoa.nome"/>
                    </FormItem>
                </Col>
                <Col :md="8" :xs="12">
                    <FormItem label="RG" prop="rg">
                        <Input v-model="dadosPessoa.rg"/>
                    </FormItem>
                </Col>
                <Col :md="8" :xs="12">
                    <FormItem label="CPF" prop="cpf">
                        <the-mask :mask="['###.###.###-##']" class="ivu-input ivu-input-default"
                                  v-model="dadosPessoa.cpf"/>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col :md="8" :xs="12">
                    <FormItem label="E-mail" prop="email">
                        <Input placeholder="E-mail" v-model="dadosPessoa.email"/>
                    </FormItem>
                </Col>
                <Col :md="8" :xs="12">
                    <FormItem label="Gênero">
                        <Select v-model="dadosPessoa.genero">
                            <Option value="1">Mulher</Option>
                            <Option value="2">Homem</Option>
                            <Option value="3">Não Informar</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :md="8" :xs="12">
                    <FormItem label="Data de Nascimento">
                        <DatePicker format="dd/MM/yyyy" placeholder="00/00/0000" type="date"
                                    v-model="dadosPessoa.dataDeNascimento"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row :gutter="16">
                <Col :md="8" :xs="12">
                    <FormItem label="Naturalidade">
                        <Input placeholder="Naturalidade" v-model="dadosPessoa.naturalidade"/>
                    </FormItem>
                </Col>
                <Col :md="8" :xs="12">
                    <FormItem label="Profissão">
                        <Input placeholder="Profissão" v-model="dadosPessoa.profissao"/>
                    </FormItem>
                </Col>
                <Col :md="8" :xs="12">
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
                <Col :key="index" :lg="6" :md="8"
                     :xs="12"
                     v-for="(item, index) in dadosPessoa.telefones"
                     v-if="item.status">
                    <Card dis-hover style="padding-top:20px">
                        <a @click.prevent="removerTelefone(index)" href="#" slot="extra">
                            <Icon size="30" type="ios-close"/>
                        </a>
                        <FormItem
                                :prop="`telefones[${index}].numero`"
                                :rules="{required: true, message: 'Informe o número de telefone', trigger: 'blur'}"
                                label="Telefone">
                            <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type ivu-input-group ivu-input-group-default ivu-input-group-with-prepend">
                                <div class="ivu-input-group-prepend" style="">
                                    <Select style="width: 80px" v-model="item.tipoDeTelefone">
                                        <Option :value="1">Fixo</Option>
                                        <Option :value="2">Celular</Option>
                                    </Select>
                                </div>
                                <the-mask :mask="['(##) ####-####', '(##) #####-####']" :masked="true"
                                          class="ivu-input ivu-input-default" v-model="item.numero"/>
                            </div>
                        </FormItem>
                    </Card>
                </Col>
                <Col :lg="6" :md="8" :xs="12">
                    <FormItem>
                        <Button :style="{height: '133px', fontSize: '22px'}" @click="adicionarTelefone" icon="md-add" long
                                type="dashed">Adicionar telefone
                        </Button>
                    </FormItem>
                </Col>
            </Row>
            <h2>Endereços</h2>
            <Row :gutter="16">
                <Col :key="index"
                     :xs="24"
                     v-for="(item, index) in dadosPessoa.enderecos"
                     v-if="item.status">
                    <Card dis-hover style="padding-top:20px">
                        <a @click.prevent="removerEndereco(index)" href="#" slot="extra">
                            <Icon size="30" type="ios-close"/>
                        </a>
                        <Row :gutter="16">
                            <Col :md="8" :xs="12">
                                <FormItem :prop="`enderecos[${index}].cep`" :rules="{required: true, message: 'Informe o CEP', min: 9, max: 9, trigger: 'blur'}"
                                          label="CEP">
                                    <the-mask :mask="['#####-###']" :masked="true"
                                              @input="onCEP(index)" class="ivu-input ivu-input-default" v-model="item.cep"/>
                                </FormItem>
                            </Col>
                            <Col :md="8" :xs="12">
                                <FormItem :prop="`enderecos[${index}].logradouro`" label="Rua">
                                    <Input placeholder="logradouro" v-model="item.logradouro"/>
                                </FormItem>
                            </Col>
                            <Col :md="8" :xs="12">
                                <FormItem :prop="`enderecos[${index}].numero`" label="Número">
                                    <Input placeholder="numero" v-model="item.numero"/>
                                </FormItem>
                            </Col>
                            <Col :md="8" :xs="12">
                                <FormItem :prop="`enderecos[${index}].bairro`" label="Bairro">
                                    <Input placeholder="Bairro" v-model="item.bairro"/>
                                </FormItem>
                            </Col>
                            <Col :md="8" :xs="12">
                                <FormItem :prop="`enderecos[${index}].complemento`" label="Complemento">
                                    <Input placeholder="complemento" v-model="item.complemento"/>
                                </FormItem>
                            </Col>
                            <Col :md="8" :xs="12">
                                <FormItem label="Estado">
                                    <Select @input="onEstado(index)" v-model="item.estado">
                                        <Option :key="estado.id" :value="estado.id" v-for="estado in estados">
                                            {{estado.sigla}}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col :md="8" :xs="12">
                                <FormItem label="Cidade">
                                    <Select v-model="item.cidade">
                                        <Option :key="cidade.id" :value="cidade.id" v-for="cidade in cidades">
                                            {{cidade.nome}}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col :xs="24">
                    <FormItem>
                        <Button :style="{height: '50px', fontSize: '22px'}" @click="adicionarEndereco" icon="md-add" long
                                type="dashed">Adicionar endereço
                        </Button>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Button @click="salvarDados('dadosPessoa')" type="primary">Salvar</Button>
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

    import {TheMask} from "vue-the-mask";

    export default {
        components: {TheMask},
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
                    telefones: [{numero: "", tipoDeTelefone: 0, status: 1}],
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
                        {required: true, message: "Informe um nome", trigger: "blur"},
                        {
                            type: "string",
                            min: 3,
                            max: 255,
                            message: "O nome deve conter entre 3 e 255 caracters",
                            trigger: "blur"
                        }
                    ],
                    rg: [
                        {required: true, message: "Informe o RG", trigger: "blur"},
                        {
                            type: "string",
                            min: 5,
                            max: 30,
                            message: "O RG deve conter entre 5 e 30 caracters",
                            trigger: "blur"
                        }
                    ],
                    cpf: [
                        {required: true, message: "Informe o CPF", trigger: "blur"},
                        {
                            validator: validadorCPF,
                            trigger: "blur",
                            message: "Informe um CPF válido"
                        }
                    ],
                    email: [
                        //{ required: true, message: 'Informe o email do cliente', trigger: 'blur' },
                        {type: "email", message: "Informe um email válido", trigger: "blur"}
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
                                .then(({data}) => {
                                    this.$Message.success("Success!");
                                })
                                .catch(({response}) => {
                                    const {data} = response;
                                    tratarErros(this, data);
                                });
                        } else {
                            const URI = "clientes/pf/";
                            axios
                                .post(`${BASE_URL}${URI}`, this.dadosPessoa)
                                .then(({data}) => {
                                    this.$Message.success("Success!");
                                })
                                .catch(({response}) => {
                                    const {data} = response;
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
                const {estados} = require("../estados.js");
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
                    .then(({data: cliente}) => {
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
