# 开发
## 1.组件内容
见`src`

## 2.开发调试
```zsh
npm run serve
```

`dev`中的`serve.vue`为调试页面

# 使用

```zsh
# 依赖element-ui，且必须引入
# el-form,el-row,el-col,el-form-item,el-checkbox,el-option,el-radio
npm install @xing.wu/form
```
先引入`ElementUI`再引入`XingWuForm`
```js
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import XingWuForm from '@xing.wu/form';
Vue.use(XingWuForm);
Vue.use(ElementUI);
```
示例
```vue

<template>
  <div id="app">
    <xing-wu-form
      ref="form"
      label-width="80px"
      v-model="formValue"
      :formItems="formItems"
      :column="3"
    />
    <el-button type="primary" @click="printForm">打印formValue</el-button>
    <el-button type="primary" @click="clearForm">resetFields</el-button>
    <el-button type="primary" @click="validate">validate</el-button>
  </div>
</template>

<script>
import Vue from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
// import { XingWuFormSample } from '@/entry.esm';

export default Vue.extend({
  name: "ServeDev",
  // components: {
  //  XingWuFormSample,
  // }
  data() {
    return {
      formValue: {
        name: "",
        name2: "456",
        name3: [],
        name4: true,
      },
      formValue2: {
        name: "",
        name2: "456",
        name3: [],
        name4: true,
      },
      formItems: [
        {
          type: "el-input",
          label: "姓名：",
          prop: "name",
          component: {
            placeholder: "请输入234",
            disabled: true,
            class: ["test1","test2"],
          },
        },
        {
          type: "el-select",
          label: "姓名2：",
          prop: "name2",
          component: {
            placeholder: "请选择456",
            optionsLabelKey: "name",
            optionsValueKey: "id",
            listeners: {
              change: () => {
                console.log(123);
              },
            },
            options: [
              {
                name: "一年级",
                id: "123",
              },
              {
                name: "二年级",
                id: "456",
              },
            ],
          },
        },
        {
          type: "el-checkbox-group",
          label: "姓名3：",
          prop: "name3",
          component: {
            placeholder: "请输入456",
            optionsLabelKey: "name",
            optionsValueKey: "id",
            options: [
              {
                name: "一年级",
                id: "123",
              },
              {
                name: "二年级",
                id: "456",
              },
            ],
          },
        },
        {
          type: "el-checkbox",
          label: "姓名4：",
          prop: "name4",
          component: {
            label: "笨比",
          },
        },
      ],
    };
  },
  methods: {
    printForm() {
      console.log(this.formValue);
    },
    clearForm() {
      this.$refs.form.resetFields();
    },
    validate() {
      this.$refs.form.validate((valid) => {
        console.log("校验完毕");
      });
    },
  },
});
</script>

<style scoped>
::v-deep .test1 {
  width: 20%;
}
::v-deep .test2 {
  background-color: red;
}
</style>


```

# `xing-wu-form` 参数

## xing-wu-form-attributes
|参数|说明|类型|可选值|默认值|备注|
| --- | --- | --- | --- | --- | --- |
|v-model|绑定的数值对象|`Object`|-|-|-|
| column | 一行几个item | `Number` | - | 1 | - |
|formItems|用于渲染form-item|`Array<Object>`|-|[]|`Object`内容见下`form-items-object`|
|其他参数|-|-|-|-|见`element-ui`的[form-attributes](https://element.eleme.cn/#/zh-CN/component/form#form-attributes)(右键复制链接到浏览器打开，不要直接点击)|

## form-items-object
|参数|说明|类型|可选值|默认值|备注|
| --- | --- | --- | --- | --- | --- |
|type|需要渲染在`form-item`中的组件|string|`el-input`<br>`el-radio-group`<br>`el-checkbox-group`<br>`el-input-number`<br>`el-select`<br>`el-cascader`<br>`el-switch`<br>`el-slider`<br>`el-time-select`<br>`el-date-picker`<br>`el-rate`<br>等几乎所有`element-ui`常用表单标签|-|如果发现有不支持的联系`hukai`|
|rules|需要校验的规则|`Array<Object>`|-|-|符合`async-validator`即可|
|component|type对应组件的属性|`Object`|-|-|componen内容见下`component`|
|其他可添加属性|-|-|-|-|见`element-ui`的[form-item-attributes](https://element.eleme.cn/#/zh-CN/component/form/#form-item-attributes)(右键复制链接到浏览器打开，不要直接点击)|

# component
|参数|说明|类型|可选值|默认值|备注|
| --- | --- | --- | --- | --- | --- |
| class | 需要给当前组件添加的样式 | `Array<String>` | - | `xing-wu-form-width100` | 非`checkbox`和`radio`组件默认添加样式`.xing-wu-form-width100{width:100%}`. `scoped`添加`::v-deep` |
| listeners | `type`组件的可触发事件 | `Object` | --- | --- | ``` {event:(args)=>{}} ``` |
|options|可选项，或组件本身需要的属性|`Array<Object>`|-|-|当type为<br>`el-select`<br>`el-checkbox-group`<br>`el-radio-group`<br>时，可选项会读取这个属性|
|optionsLabelKey|存在可选项时，可选项label的key|string|-|-|同上|
|optionsValueKey|存在可选项时，可选项value的key|string|-|-|同上|
|其他可添加属性|-|-|-|-|见`type`对应标签的文档|
