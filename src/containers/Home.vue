<template>
  <Layout style="height: 100%" class="main">
    <Sider ref="menulateral" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed" class="side-menu-wrapper">
        <div class="layout-logo" :style="isCollapsed ? {'width': '37px'} : {}" >
            <Icon type="ios-ionitron-outline" />
            <span v-if="!isCollapsed">Emissor</span>
        </div>
        <Menu active-name="1-1" theme="light" width="auto" :class="menuitemClasses" @on-open-change="openMenu">
            <router-link to="/cte/novo">
                <MenuItem name="1-1">
                    <Icon type="ios-navigate"></Icon>
                    <span>Novo Cte</span>
                </MenuItem>
            </router-link>
            <router-link to="/">
                <MenuItem name="1-2">
                    <Icon type="ios-navigate"></Icon>
                    <span>Home</span>
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
                    <MenuItem name="2-2">Lista de Clientes</MenuItem>
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
              <a @click="collapsedSider" class="sider-trigger-a" type="text"><Icon :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24" /></a>
                <div class="custom-content-con">
                    <Menu mode="horizontal" theme="light">
                        <MenuItem name="1">
                            <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                        </MenuItem>
                        <MenuItem name="2">
                          <Dropdown trigger="click">
                            <a href="javascript:void(0)">
                                <Icon type="ios-notifications-outline" />
                                <Icon type="md-arrow-dropdown" :style="{ fontSize: '18px' }" />
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
                            <Icon type="ios-settings" />
                        </MenuItem>
                    </Menu>
                </div>
            </Header>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper" :style="{padding: '24px'}">
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
      isCollapsed: false
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
    openMenu(submenu) {
      if (this.isCollapsed) this.$refs.menulateral.toggleCollapse();
    }
  }
};
</script>