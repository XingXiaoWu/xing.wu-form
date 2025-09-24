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
先引入`ElementPlus`再引入`XingWuForm`
```js
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import XingWuForm from '@xing.wu/form';
// 如果需要使用图标
import * as Icons from "@element-plus/icons-vue";

const app = createApp(Dev);
app.use(ElementPlus);
// 如果需要使用图标，则需要注册图标组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key]);
});
app.use(XingWuForm);
app.mount('#app');
```
示例
```vue

<template>
  <div id="app" class="main">
    <div class="textarea">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button type="primary" @click="formatting"> 1.格式化 </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="createForm"> 2.生成表单 </el-button>
        </el-col>
      </el-row>
      <span>表单几列：</span>
      <el-input-number v-model="column" :min="1" :max="10" label="几列"></el-input-number>
      <span>表单json内容：</span>
      <el-input type="textarea" :rows="2" placeholder="请输入内容" :autosize="{ minRows: 40, maxRows: 100 }"
        v-model="textarea" />

    </div>
    <div class="form">
      <xing-wu-form v-model:instance="formRef" label-width="80px" v-model="formValue" :formItems="formItems"
        :column="column" />
      <el-button type="primary" @click="printForm"> 打印当前数据 </el-button>
      <el-button type="primary" @click="clearForm"> reset </el-button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'

const imageUrl = ref('')
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const formRef = ref();

const textarea = ref(`[{"type":"el-input","attrs":{"label":"姓名：","prop":"name"},"component":{"placeholder":"请输入234","disabled":true,"class":["test1","test2"]}},{"type":"el-select","attrs":{"label":"姓名2：","prop":"name2"},"component":{"placeholder":"请选择456","optionsLabelKey":"name","optionsValueKey":"id","listeners":{},"options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox-group","attrs":{"label":"姓名3：","prop":"name3"},"component":{"placeholder":"请输入456","optionsLabelKey":"name","optionsValueKey":"id","options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox","attrs":{"label":"姓名4：","prop":"name4"},"component":{"label":"笨比"}}]`)
const column = ref(1)
const formValue = ref({})
const formItems = ref([])

// 格式化
const formatting = () => {
  let tmp = eval("(" + textarea.value + ")");
  let value = {};
  tmp.forEach((item) => {
    if (item.type === "el-checkbox-group") {
      value[item.prop] = [];
    } else {
      value[item.prop] = null;
    }
  });
  console.log(tmp);
  textarea.value = JSON.stringify(tmp, null, 4);
  formValue.value = value;
};

// 生成表单
const createForm = () => {
  // state.formItems = JSON.parse(state.textarea);
  formItems.value = JSON.parse(textarea.value)
};
const printForm = () => {
  console.log('formValue = ', formValue.value);
};
const clearForm = () => {
  console.log(formRef);
  formRef.value.resetFields();
};
const validate = () => {
  formRef.value.validate((valid) => {
    console.log("校验完毕");
  });
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: row;
}

.main .textarea {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.main .form {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

/* ::v-deep .test1 {
  width: 20%;
}
::v-deep .test2 {
  background-color: red;
} */
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
|type|需要渲染在`form-item`中的组件|string|`el-input`<br>`el-radio-group`<br>`el-checkbox-group`<br>`el-input-number`<br>`el-select`<br>`el-cascader`<br>`el-switch`<br>`el-slider`<br>`el-time-select`<br>`el-date-picker`<br>`el-rate`<br>等几乎所有`element-ui`常用表单标签|-|如果发现有不支持的联系`XingXiaoWu`|
|rules|需要校验的规则|`Array<Object>`|-|-|符合`async-validator`即可|
|component|type对应组件的属性|`Object`|-|-|componen内容见下`component`|
|其他可添加属性|-|-|-|-|见`element-ui`的[form-item-attributes](https://element.eleme.cn/#/zh-CN/component/form/#form-item-attributes)(右键复制链接到浏览器打开，不要直接点击)|

# component
|参数|说明|类型|可选值|默认值|备注|
| --- | --- | --- | --- | --- | --- |
| class | 需要给当前组件添加的样式 | `Array<String>` | - | `xing-wu-form-width100` | 非`checkbox`和`radio`组件默认添加样式`.xing-wu-form-width100{width:100%}`. `scoped`添加`::v-deep` |
| ~~listeners~~ 随着vue3升级，已被取消，直接在本级添加`on`前缀的事件名即可 | `type`组件的可触发事件 | `Object` | --- | --- | ``` {event:(args)=>{}} ``` |
|options|可选项，或组件本身需要的属性|`Array<Object>`|-|-|当type为<br>`el-select`<br>`el-checkbox-group`<br>`el-radio-group`<br>时，可选项会读取这个属性|
|optionsLabelKey|存在可选项时，可选项label的key|string|-|-|同上|
|optionsValueKey|存在可选项时，可选项value的key|string|-|-|同上|
|prepend|el-input可用，钱置插槽|string|-|-|同上|
|append|el-input可用，后置插槽|string|-|-|同上|
|其他可添加属性|-|-|-|-|见`type`对应标签的文档|
