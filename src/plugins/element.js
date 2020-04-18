import Vue from 'vue'
import {
  Tabs,
  TabPane,
  Button,
  Form, FormItem, Input, Checkbox,
  Message,
  Container, Header, Main, Aside, Footer,
  Menu, MenuItem, Submenu,
  Breadcrumb, BreadcrumbItem,
  Card,
  Row, Col,
  Table, TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option
} from 'element-ui'

Vue
  .use(Tabs).use(TabPane)
  .use(Button)
  .use(Form).use(FormItem).use(Input).use(Checkbox)
  .use(Container).use(Header).use(Main).use(Aside).use(Footer)
  .use(Menu).use(MenuItem).use(Submenu)
  .use(Breadcrumb).use(BreadcrumbItem)
  .use(Card)
  .use(Row).use(Col)
  .use(Table).use(TableColumn)
  .use(Switch)
  .use(Tooltip)
  .use(Pagination)
  .use(Dialog)
  .use(Tag)
  .use(Tree)
  .use(Select)
  .use(Option)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
