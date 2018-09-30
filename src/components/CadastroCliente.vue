<template>
        <Card :padding="24" dis-hover>
            <Row class="card-title">
                <Col span="8">
                    <h1>Cadastro de Cliente</h1>
                </Col>
            </Row>
            <Form ref="dadosPessoa" :model="dadosPessoa" label-position="top">
                <Row :gutter="16">
                    <Col :xs="12" :md="8">
                        <FormItem label="Nome">
                            <Input v-model="dadosPessoa.nome" placeholder="Nome" />
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="RG">
                            <Input v-model="dadosPessoa.rg" placeholder="Nome" />
                        </FormItem>
                    </Col>
                    <Col :xs="12" :md="8">
                        <FormItem label="CPF">
                            <Input v-model="dadosPessoa.cpf" placeholder="Nome" />
                        </FormItem>
                    </Col>
                </Row>
                <Row :gutter="16">
                    <Col :xs="12" :md="8">
                        <FormItem label="E-mail">
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
                            <DatePicker type="date" placeholder="00/00/0000" v-model="dadosPessoa.dataDeNascimento"></DatePicker>
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
                                :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                                <Input v-model="item.numero">
                                    <Select v-model="item.tipoDeTelefone" slot="prepend" style="width: 80px">
                                        <Option value="1">Fixo</Option>
                                        <Option value="2">Celular</Option>
                                    </Select>
                                </Input>
                            </FormItem>
                        </Card>
                    </Col>
                    <Col :xs="12" :md="8" :lg="6">
                        <FormItem>
                            <Button type="dashed" long @click="adicionarTelefone" icon="md-add" :style="{height: '133px', fontSize: '22px'}">Adicionar telefone</Button>
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
export default {
  data() {
    return {
      dadosPessoa: {
        nome: "Jackson Luiz",
        cpf: "046.575;171-71",
        rg: "12345678-8",
        email: "jackson@hotmail.com",
        dataDeNascimento: "1990-02-11",
        naturalidade: "Dourados",
        profissao: "Desenvolvedor",
        genero: "2",
        estadoCivil: "1",
        pessoaFisicaTipo: "1",
        telefones: [
          { numero: "(67) 5555-7777", tipoDeTelefone: "3", status: 1 },
          { numero: "(67) 8888-3333", tipoDeTelefone: "1", status: 1 },
          { numero: "(67) 9966-0066", tipoDeTelefone: "2", status: 1 }
        ],
        enderecos: [
          {
            bairro: "Rua Marcelino Pire",
            logradouro: "Centro",
            numero: "1521",
            complemento: "S/C",
            cep: "79822-310",
            tipoDeEndereco: 1,
            cidade: 1518
          }
        ]
      }
    };
  },
  methods: {
    salvarDados(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //const dadosPessoa = JSON.parse(JSON.stringify(this.dadosPessoa));
          const BASE_URL = "//35.198.15.248:8080/api/";
          const URI = "clientes/pf/";
          axios
            .post(`${BASE_URL}${URI}`, this.dadosPessoa)
            .then(response => {
              console.log(response);
              this.$Message.success("Success!");
            })
            .catch(error => {
              console.error(error);
              this.$Message.error("Fail! " + error);
            });
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
    }
  }
};
</script>
