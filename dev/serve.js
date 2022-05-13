import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Dev from './serve.vue';

import XingWuForm from '@/entry.esm';


const app = createApp(Dev);
app.use(ElementPlus);
app.use(XingWuForm);

app.mount('#app');
