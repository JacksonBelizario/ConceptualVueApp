<template>
    <Layout class="main" style="height: 100%">
        <Sider :collapsed-width="78" class="side-menu-wrapper" collapsible hide-trigger ref="menulateral"
               v-model="isCollapsed">
            <div :style="isCollapsed ? {'width': '37px'} : {}" class="layout-logo">
                <Icon type="ios-ionitron-outline"/>
                <span v-if="!isCollapsed">Emissor</span>
            </div>
            <Menu :class="menuitemClasses" @on-open-change="openMenu" active-name="1-1" theme="light" width="auto">
                <router-link to="/">
                    <MenuItem name="1-2">
                        <Icon type="ios-navigate"></Icon>
                        <span>Home</span>
                    </MenuItem>
                </router-link>
                <router-link to="/cte/novo">
                    <MenuItem name="1-1">
                        <Icon type="md-document"></Icon>
                        <span>Novo Cte</span>
                    </MenuItem>
                </router-link>
                <router-link to="/login">
                    <MenuItem name="1-3">
                        <Icon type="md-finger-print"></Icon>
                        <span>Login</span>
                    </MenuItem>
                </router-link>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        <span>Cadastros</span>
                    </template>
                    <router-link to="/cadastros/cliente">
                        <MenuItem name="2-1">Cadastro de Clientes</MenuItem>
                    </router-link>
                    <router-link to="/cadastros/clientes">
                        <MenuItem name="2-2">Clientes</MenuItem>
                    </router-link>
                    <router-link to="/cadastros/funcionarios">
                        <MenuItem name="2-2">Funcionários</MenuItem>
                    </router-link>
                    <MenuItem name="2-3">Fornecedores</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        <span>Item 3</span>
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout>
            <Header class="header-con">
                <Header class="header-bar">
                    <a @click="collapsedSider" class="sider-trigger-a" type="text">
                        <Icon :class="rotateIcon" :style="{margin: '0 20px'}" size="24" type="md-menu"/>
                    </a>
                    <div class="custom-content-con">
                        <Menu mode="horizontal" theme="light">
                            <MenuItem name="1">
                                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
                            </MenuItem>
                            <MenuItem name="2">
                                <Dropdown trigger="click">
                                    <a href="javascript:void(0)">
                                        <Icon type="ios-notifications-outline"/>
                                        <Icon :style="{ fontSize: '18px' }" type="md-arrow-dropdown"/>
                                    </a>
                                    <DropdownMenu slot="list" style="width:200px">
                                        <DropdownItem>Pagamento de Boleto</DropdownItem>
                                        <DropdownItem>Chegada de Mercadoria</DropdownItem>
                                        <DropdownItem>Vencimento de Conta</DropdownItem>
                                        <DropdownItem>Nova Viagem</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </MenuItem>
                            <MenuItem name="3">
                                <Icon type="ios-settings"/>
                            </MenuItem>
                        </Menu>
                    </div>
                </Header>
            </Header>
            <Content class="main-content-con">
                <Layout class="main-layout-con">
                    <Content :style="{padding: '24px'}" class="content-wrapper">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    </Layout>
</template>
<script>
    export default {
        data() {
            return {
                isCollapsed: false,
            };
        },
        computed: {
            rotateIcon() {
                return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
            },
            menuitemClasses() {
                return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
            }
        },
        methods: {
            collapsedSider() {
                this.$refs.menulateral.toggleCollapse();
                if (this.isCollapsed)
                    this.$refs.menulateral.$children[0].$children.map(
                        c => (c.opened = false)
                    );
            },
            openMenu() {
                if (this.isCollapsed) this.$refs.menulateral.toggleCollapse();
            }
        },
        mounted() {
            this.$nextTick(() => {
                window.addEventListener('resize', () => {
                    if (window.innerWidth < 1170 && !this.isCollapsed) {
                        this.collapsedSider();
                    }
                });
            })
        },
    };
</script>