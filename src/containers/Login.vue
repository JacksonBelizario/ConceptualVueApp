<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
    }
    .layout .content{
        display: flex;
        padding: 50px;
        justify-content: center;
    }
    .layout .card{
        width: 500px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Content class="content">
                <Card class="card" dis-hover>
                    <Row class="card-title">
                        <Col span="8">
                            <h1>Autenticação</h1>
                        </Col>
                    </Row>
                    <Form ref="login" :model="login" label-position="top" :rules="ruleValidate">
                        <FormItem label="E-mail" prop="email">
                            <Input size="large" v-model="login.email" placeholder="E-mail" />
                        </FormItem>
                        <FormItem label="Senha" prop="password">
                            <Input size="large" v-model="login.password" type="password" placeholder="Senha" />
                        </FormItem>
                        <FormItem prop="rememberme">
                            <Checkbox v-model="login.rememberme" size="large">Lembrar</Checkbox>
                        </FormItem>
                        <FormItem>
                            <Button long size="large" type="primary" @click="logar()">Entrar</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        data: () => ({
            login: {
                email: "",
                password: "",
                rememberme: false
            },
            ruleValidate: {
                email: [
                    { required: true, message: "Informe o e-mail", trigger: "blur" },
                    { type: "email", message: "Informe um email válido", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "Informe a Senha", trigger: "blur" }
                ],
            },
        }),
        methods: {
            logar() {
                console.log('logar');
            }
        }

    }
</script>
