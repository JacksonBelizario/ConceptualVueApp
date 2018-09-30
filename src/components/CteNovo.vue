<template>
    <div class="layout-cte">
        <Card :padding="24" dis-hover class="layout-left">
            <Row class="card-title">
                <Col span="8">
                    <h1>Novo Cte</h1>
                </Col>
                <Col span="16" class="text-right">
                    <Select class="text-left" size="large" v-model="cte.tipo_cte" :style="{ maxWidth: '200px'}">
                        <Option v-for="item in tipos_cte" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <DatePicker class="ml-1" size="large" type="date" placeholder="00/00/0000" v-model="cte.data" format="dd/MM/yyyy"></DatePicker>
                    <Button class="ml-1" size="large" type="info"><font-awesome-icon icon="user" /> Motorista <Icon type="md-arrow-dropdown" :style="{ fontSize: '18px' }" /></Button>
                    <Button class="ml-1" size="large" type="success" @click="collapseSeguro = !collapseSeguro"><font-awesome-icon icon="shield-alt" /> Seguro RCTR-C <Icon :type="!collapseSeguro ? 'md-arrow-dropdown' : 'md-arrow-dropup'" :style="{ fontSize: '18px' }" /></Button>
                </Col>
            </Row>
            <Form :model="cte" label-position="top">
                <div :class="`drawer-seguro ${ collapseSeguro ? 'ativo' : '' }`">
                    <Card dis-hover>
                        <h2>Seguro RCTR-C</h2>
                        <FormItem label="Seguro">
                            <RadioGroup v-model="cte.tipo_seguro" type="button" size="large" class="tipo-seguro">
                                <Radio label="0">Emitente <span class="icon-wrapper"></span><Icon type="md-checkmark" /></Radio>
                                <Radio label="1">Tomador de Serviço <span class="icon-wrapper"></span><Icon type="md-checkmark" /></Radio>
                            </RadioGroup>
                        </FormItem>
                        <Carousel :autoplay="false" dots="none" arrow="never">
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
                                            <Input size="large" v-model="cte.seguro_emitente_nome" placeholder="Seguradora"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="Apólice">
                                            <Input size="large" v-model="cte.seguro_emitente_apolice" placeholder="Apólice"></Input>
                                        </FormItem>
                                    </Col>
                                    <Col span="8">
                                        <FormItem label="CNPJ Seguradora">
                                            <Input size="large" v-model="cte.seguro_emitente_cnpj" placeholder="CNPJ Seguradora"></Input>
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
                            <Option v-for="item in tipos_tomador" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Serviço">
                            <Select size="large" v-model="cte.tipo_servico">
                                <Option v-for="item in tipos_servico" :value="item.value" :key="item.value">{{ item.label }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="Remetente">
                            <Input size="large" v-model="cte.remetente" placeholder="Digite o nome ou CNPJ"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Destinatário">
                            <Input size="large" v-model="cte.destinatario" placeholder="Digite o nome ou CNPJ"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="Expedidor">
                            <Input size="large" v-model="cte.expedidor" placeholder="Digite o nome ou CNPJ"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Recebedor">
                            <Input size="large" v-model="cte.recebedor" placeholder="Digite o nome ou CNPJ"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <h2>Informações da Viagem</h2>
                <Row :gutter="16">
                    <Col span="12">
                        <FormItem label="Início">
                            <AutoComplete size="large" v-model="cte.inicio_viagem" :data="cidades" @on-search="buscarCidades" :filter-method="filtrarCidades" placeholder="Inicio da Viagem"></AutoComplete>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="Término">
                            <AutoComplete size="large" v-model="cte.termino_viagem" :data="cidades" @on-search="buscarCidades" :filter-method="filtrarCidades" placeholder="Término da Viagem"></AutoComplete>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem label="CFOPs">
                    <Select size="large" v-model="cte.cfop" filterable remote :remote-method="filtrarCFOPs" :loading="loading2">
                        <Option v-for="(option, index) in cfops_filtro" :value="option.value" :key="index">{{option.label}}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="12">
                            <h2>Documentos Fiscais</h2>
                        </Col>
                        <Col span="12" :style="{ textAlign: 'right' }">
                            <Button size="large" type="primary" shape="circle"><font-awesome-icon icon="asterisk" /> Adicionar</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Table border :columns="notas_colunas" :data="notas"></Table>
                </FormItem>
            </Form>
        </Card>
        <div class="layout-right-fixed">
            <Card dis-hover class="bg-primary">
                <Row ::gutter="16">
                    <Col span="14">
                        <h2 class="text-success mb-0"><a @click="collapseValores = !collapseValores">{{ valorFrete }} <Icon :type="!collapseValores ? 'md-arrow-dropdown' : 'md-arrow-dropup'" :style="{ fontSize: '18px' }" /></a></h2>
                        <p class="text-muted">Valor do Frete</p>
                    </Col>
                    <Col span="10">
                        <h1 class="text-muted text-right mb-4 mt-0">
                            <font-awesome-icon icon="truck" class="icone" />
                        </h1>
                    </Col>
                </Row>
                <div class="text-center">
                    <Button size="large" type="primary" shape="circle" icon="md-done-all"class="w-100">Salvar</Button>
                </div>
                <div :class="`detalhes-valores ${ collapseValores ? 'ativo' : '' }`">
                    <Form label-position="top">
                        <FormItem label="PPTE" class="mt-2 mb-2">
                            <Input size="large" v-model="cte.valores.ppte" placeholder="0,00"></Input>
                        </FormItem>
                        <FormItem label="Pedágio" class="mb-2">
                            <Input size="large" v-model="cte.valores.pedagio" placeholder="0,00"></Input>
                        </FormItem>
                        <FormItem label="ICMS" class="mb-2">
                            <Input size="large" v-model="cte.valores.icms" placeholder="0,00"></Input>
                        </FormItem>
                        <FormItem label="Base Cálculo" class="mb-2">
                            <Input size="large" v-model="cte.valores.bc" placeholder="0,00"></Input>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import { listaCfops } from "../cfops";
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
