<template>
    <div class="layout-cte">
        <Card :padding="24" class="layout-left" dis-hover>
            <Row class="card-title">
                <Col span="8">
                    <h1>Novo Cte</h1>
                </Col>
                <Col class="text-right" span="16">
                    <Select :style="{ maxWidth: '200px'}" class="text-left" size="large" v-model="cte.tipo_cte">
                        <Option :key="item.value" :value="item.value" v-for="item in tipos_cte">{{ item.label }}
                        </Option>
                    </Select>
                    <DatePicker class="ml-1" format="dd/MM/yyyy" placeholder="00/00/0000" size="large" type="date"
                                v-model="cte.data"></DatePicker>
                    <Button class="ml-1" size="large" type="info">
                        <font-awesome-icon icon="user"/>
                        Motorista
                        <Icon :style="{ fontSize: '18px' }" type="md-arrow-dropdown"/>
                    </Button>
                    <Button @click="collapseSeguro = !collapseSeguro" class="ml-1" size="large" type="success">
                        <font-awesome-icon icon="shield-alt"/>
                        Seguro RCTR-C
                        <Icon :style="{ fontSize: '18px' }"
                              :type="!collapseSeguro ? 'md-arrow-dropdown' : 'md-arrow-dropup'"/>
                    </Button>
                </Col>
            </Row>
            <Form :model="cte" label-position="top">
                <div :class="`drawer-seguro ${ collapseSeguro ? 'ativo' : '' }`">
                    <Card dis-hover>
                        <h2>Seguro RCTR-C</h2>
                        <FormItem label="Seguro">
                            <RadioGroup class="tipo-seguro" size="large" type="button" v-model="cte.tipo_seguro">
                                <Radio label="0">Emitente <span class="icon-wrapper"></span>
                                    <Icon type="md-checkmark"/>
                                </Radio>
                                <Radio label="1">Tomador de Serviço <span class="icon-wrapper"></span>
                                    <Icon type="md-checkmark"/>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                        <Carousel :autoplay="false" arrow="never" dots="none">
                            <CarouselItem>
                                <Row :gutter="16" :style="{ height: '200px'}">
                                    <Col span="24">
                                        <FormItem label="Seguro">
                                            <Select size="large" v-model="cte.seguro_emitente">
                                                <Option :value="1">Seguro 1</Option>
                                                <Option :value="2">Seguro 2</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </CarouselItem>
                            <CarouselItem>
                                <Row :gutter="16">
                                    <Col span="8">
                                        <FormItem label="Seguradora">
                                            <Input placeholder="Seguradora" size="large"
                                                   v-model="cte.seguro_emitente_nome"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="Apólice">
                                            <Input placeholder="Apólice" size="large"
                                                   v-model="cte.seguro_emitente_apolice"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="CNPJ Seguradora">
                                            <Input placeholder="CNPJ Seguradora" size="large"
                                                   v-model="cte.seguro_emitente_cnpj"></Input>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </CarouselItem>
                        </Carousel>
                    </Card>
                </div>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="Tomador">
                            <Select size="large" v-model="cte.tipo_tomador">
                                <Option :key="item.value" :value="item.value" v-for="item in tipos_tomador">{{
                                    item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Serviço">
                            <Select size="large" v-model="cte.tipo_servico">
                                <Option :key="item.value" :value="item.value" v-for="item in tipos_servico">{{
                                    item.label }}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="Remetente">
                            <Input placeholder="Digite o nome ou CNPJ" size="large" v-model="cte.remetente"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Destinatário">
                            <Input placeholder="Digite o nome ou CNPJ" size="large" v-model="cte.destinatario"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="Expedidor">
                            <Input placeholder="Digite o nome ou CNPJ" size="large" v-model="cte.expedidor"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Recebedor">
                            <Input placeholder="Digite o nome ou CNPJ" size="large" v-model="cte.recebedor"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <h2>Informações da Viagem</h2>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="Início">
                            <AutoComplete :data="cidades" :filter-method="filtrarCidades" @on-search="buscarCidades"
                                          placeholder="Inicio da Viagem" size="large"
                                          v-model="cte.inicio_viagem"></AutoComplete>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Término">
                            <AutoComplete :data="cidades" :filter-method="filtrarCidades" @on-search="buscarCidades"
                                          placeholder="Término da Viagem" size="large"
                                          v-model="cte.termino_viagem"></AutoComplete>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="CFOPs">
                    <Select :loading="loading2" :remote-method="filtrarCFOPs" filterable remote size="large"
                            v-model="cte.cfop">
                        <Option :key="index" :value="option.value" v-for="(option, index) in cfops_filtro">
                            {{option.label}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="12">
                            <h2>Documentos Fiscais</h2>
                        </Col>
                        <Col :style="{ textAlign: 'right' }" span="12">
                            <Button shape="circle" size="large" type="primary">
                                <font-awesome-icon icon="asterisk"/>
                                Adicionar
                            </Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Table :columns="notas_colunas" :data="notas" border></Table>
                </FormItem>
            </Form>
        </Card>
        <div class="layout-right-fixed">
            <Card class="bg-primary" dis-hover>
                <Row ::gutter="16">
                    <Col span="14">
                        <h2 class="text-success mb-0"><a @click="collapseValores = !collapseValores">{{ valorFrete }}
                            <Icon :style="{ fontSize: '18px' }"
                                  :type="!collapseValores ? 'md-arrow-dropdown' : 'md-arrow-dropup'"/>
                        </a></h2>
                        <p class="text-muted">Valor do Frete</p>
                    </Col>
                    <Col span="10">
                        <h1 class="text-muted text-right mb-4 mt-0">
                            <font-awesome-icon class="icone" icon="truck"/>
                        </h1>
                    </Col>
                </Row>
                <div class="text-center">
                    <Button class="w-100" icon="md-done-all" shape="circle" size="large" type="primary">Salvar</Button>
                </div>
                <div :class="`detalhes-valores ${ collapseValores ? 'ativo' : '' }`">
                    <Form label-position="top">
                        <FormItem class="mt-2 mb-2" label="PPTE">
                            <Input placeholder="0,00" size="large" v-model="cte.valores.ppte"></Input>
                        </FormItem>
                        <FormItem class="mb-2" label="Pedágio">
                            <Input placeholder="0,00" size="large" v-model="cte.valores.pedagio"></Input>
                        </FormItem>
                        <FormItem class="mb-2" label="ICMS">
                            <Input placeholder="0,00" size="large" v-model="cte.valores.icms"></Input>
                        </FormItem>
                        <FormItem class="mb-2" label="Base Cálculo">
                            <Input placeholder="0,00" size="large" v-model="cte.valores.bc"></Input>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import {listaCfops} from "../cfops";

    const accounting = require("accounting");
    export default {
        name: "CteNovo",
        data() {
            return {
                collapseSeguro: false,
                collapseValores: false,
                cte: {
                    tipo_cte: 1,
                    tipo_tomador: 1,
                    tipo_servico: 1,
                    data: new Date(),
                    remetente: "",
                    destinatario: "",
                    expedidor: "",
                    recebedor: "",
                    inicio_viagem: "",
                    termino_viagem: "",
                    cfop: "",
                    tipo_seguro: "0",
                    seguro_emitente: "",
                    seguro_emitente_nome: "",
                    seguro_emitente_apolice: "",
                    seguro_emitente_cnpj: "",
                    valores: {
                        frete: 350,
                        ppte: 0,
                        pedagio: 0,
                        icms: 0,
                        bc: 0
                    }
                },
                notas_colunas: [
                    {
                        title: "Tipo",
                        key: "tipo",
                        render: (h, params) => {
                            return h("div", [
                                h("Icon", {
                                    props: {
                                        type: "ios-paper-outline"
                                    }
                                }),
                                h("strong", params.row.tipo)
                            ]);
                        }
                    },
                    {
                        title: "Info",
                        key: "info"
                    },
                    {
                        title: "Peso (Kg)",
                        key: "peso",
                        align: "right"
                    },
                    {
                        title: "Valor Doc. (R$)",
                        key: "valor",
                        align: "right"
                    },
                    {
                        title: " ",
                        key: "acao",
                        width: 150,
                        align: "center",
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.show(params.index);
                                            }
                                        }
                                    },
                                    "Ver"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error",
                                            size: "small"
                                        },
                                        on: {
                                            click: () => {
                                                this.remove(params.index);
                                            }
                                        }
                                    },
                                    "Remover"
                                )
                            ]);
                        }
                    }
                ],
                notas: [
                    {
                        tipo: "NF-e",
                        info: "9123542634446764",
                        peso: 30,
                        valor: "400,00"
                    },
                    {
                        tipo: "NF-e",
                        info: "2634446664912354",
                        peso: 120,
                        valor: "100,00"
                    },
                    {
                        tipo: "NF-e",
                        info: "4664263449123569",
                        peso: 54,
                        valor: "80,00"
                    },
                    {
                        tipo: "Declaração",
                        info: "6649123542634446",
                        peso: 580,
                        valor: "1250,00"
                    }
                ],
                tipos_cte: [
                    {
                        value: 1,
                        label: "Ct-e Normal"
                    },
                    {
                        value: 2,
                        label: "Ct-e de Complemento de Valores"
                    },
                    {
                        value: 3,
                        label: "Ct-e de Anulação"
                    },
                    {
                        value: 4,
                        label: "Ct-e Substituto"
                    }
                ],
                tipos_tomador: [
                    {
                        value: 1,
                        label: "Remetente"
                    },
                    {
                        value: 2,
                        label: "Destinatário"
                    },
                    {
                        value: 3,
                        label: "Expedidor"
                    },
                    {
                        value: 4,
                        label: "Recebedor"
                    },
                    {
                        value: 5,
                        label: "Outros"
                    }
                ],
                tipos_servico: [
                    {
                        value: 1,
                        label: "Normal"
                    },
                    {
                        value: 2,
                        label: "Subcontratação"
                    },
                    {
                        value: 3,
                        label: "Redespacho"
                    },
                    {
                        value: 4,
                        label: "Redespacho Intermediário"
                    },
                    {
                        value: 5,
                        label: "Serviço Multimodal"
                    }
                ],
                cidades: [],
                cfops_filtro: [],
                loading2: false
            };
        },
        computed: {
            cfops() {
                return listaCfops;
            },
            valorFrete() {
                return accounting.formatMoney(this.cte.valores.frete, "R$ ", 2, ".", ",");
            }
        },
        methods: {
            buscarCidades(nome) {
                this.cidades = ["Dourados", "Campo Grande", "Naviraí"];
            },
            filtrarCidades(value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            filtrarCFOPs(query) {
                if (query !== "") {
                    this.loading2 = true;
                    setTimeout(() => {
                        this.loading2 = false;
                        const list = this.cfops.map(item => {
                            return {
                                value: item.id,
                                label: `(${item.id}) ${item.descricao}`
                            };
                        });
                        this.cfops_filtro = list.filter(
                            item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
                        );
                    }, 200);
                } else {
                    this.cfops_filtro = [];
                }
            }
        }
    };
</script>

<style>
    .form-carousel {
        margin-right: 200px;
    }

    .drawer-seguro {
        height: 0;
        transition: all 0.2s ease-in-out;
        display: block;
        height: 0;
        overflow: hidden;
    }

    .drawer-seguro .ivu-card {
        height: 250px;
    }

    .drawer-seguro.ativo {
        height: 270px;
        margin-bottom: 10px;
    }

    .icon-wrapper {
        margin: 0 8px 0 9px !important;
    }

    .tipo-seguro .ivu-radio-wrapper .ivu-icon {
        display: none;
    }

    .tipo-seguro .ivu-radio-wrapper-checked .ivu-icon-md-checkmark {
        display: inline;
    }

    .tipo-seguro .ivu-radio-wrapper .icon-wrapper {
        display: inline;
    }

    .tipo-seguro .ivu-radio-wrapper-checked .icon-wrapper {
        display: none;
    }

    .layout-cte {
        position: relative;
    }

    .layout-cte .layout-left {
        margin-right: 275px;
    }

    .layout-cte .layout-right-fixed {
        position: fixed;
        top: 88px;
        right: 40px;
        width: 250px;
    }

    .layout-cte .layout-right-fixed .icone {
        font-size: 45px;
    }

    .detalhes-valores {
        height: 0;
        transition: all 0.2s ease-in-out;
        display: block;
        height: 0;
        overflow: hidden;
    }

    .detalhes-valores.ativo {
        height: 270px;
    }
</style>
