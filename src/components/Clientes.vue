<template>
    <Card dis-hover>
        <Row class="card-title">
            <Col span="8">
                <h1>Clientes</h1>
            </Col>
        </Row>
        <Table :columns="clientes.colunas" :data="clientes.dados" border></Table>
    </Card>
</template>


<script>
    const axios = require("axios");
    export default {
        name: "Clientes",
        data() {
            return {
                clientes: {
                    colunas: [
                        {
                            title: "#",
                            key: "id",
                            maxWidth: 50
                        },
                        {
                            title: "Nome",
                            key: "nome",
                            render: (h, params) => {
                                return h("div", [
                                    h("Icon", {
                                        props: {
                                            type: "person"
                                        }
                                    }),
                                    h("strong", params.row.nome)
                                ]);
                            }
                        },
                        {
                            title: "CPF",
                            key: "cpf"
                        },
                        {
                            title: " ",
                            key: "action",
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
                                                    this.$router.push({
                                                        path: `/cadastros/cliente/${parseInt(params.row.id)}`
                                                    });
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
                                        "Apagar"
                                    )
                                ]);
                            }
                        }
                    ],
                    dados: []
                }
            };
        },
        created() {
            this.getClientes();
        },
        methods: {
            async getClientes() {
                const BASE_URL = "//35.198.15.248:8080/api/";
                const URI = "clientes/pf/";
                axios
                    .get(`${BASE_URL}${URI}`)
                    .then(({data: clientes}) => {
                        this.clientes.dados = clientes;
                    })
                    .catch(error => {
                        console.warn(error);
                    });
            }
        }
    };
</script>
