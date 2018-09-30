<template>
    <Card dis-hover>
        <Row class="card-title">
            <Col span="8">
                <h1>Clientes</h1>
            </Col>
        </Row>
        <Table border :columns="clientes.colunas" :data="clientes.dados"></Table>
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
            title: "Name",
            key: "name",
            render: (h, params) => {
              return h("div", [
                h("Icon", {
                  props: {
                    type: "person"
                  }
                }),
                h("strong", params.row.name)
              ]);
            }
          },
          {
            title: "Age",
            key: "age"
          },
          {
            title: "Address",
            key: "address"
          },
          {
            title: "Action",
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
                        this.show(params.index);
                      }
                    }
                  },
                  "View"
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
                  "Delete"
                )
              ]);
            }
          }
        ],
        dados: [
          {
            name: "John Brown",
            age: 18,
            address: "New York No. 1 Lake Park"
          },
          {
            name: "Jim Green",
            age: 24,
            address: "London No. 1 Lake Park"
          },
          {
            name: "Joe Black",
            age: 30,
            address: "Sydney No. 1 Lake Park"
          },
          {
            name: "Jon Snow",
            age: 26,
            address: "Ottawa No. 2 Lake Park"
          }
        ]
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
      const response = await axios.get(`${BASE_URL}${URI}`);
      console.log(response);
    }
  }
};
</script>
