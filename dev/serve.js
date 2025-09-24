import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Dev from './serve.vue';
import * as Icons from "@element-plus/icons-vue";

import XingWuForm from '@/entry.esm';


const app = createApp(Dev);
app.use(ElementPlus);
// 全局注册
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
  

app.use(XingWuForm);

app.mount('#app');
