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
      <el-button type="primary" @click="printForm"> 打印当前数据 </el-button>
      <el-button type="primary" @click="clearForm"> reset </el-button>
      
      <xing-wu-form v-model:instance="formRef" label-width="80px" v-model="formValue" :formItems="formItems"
        :column="column" />

    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { XingWuFormSample } from '@/entry.esm';

export default defineComponent({
  name: "ServeDev",
  setup() {

    const formRef = ref();

    const state = reactive({
      textarea: `[{"type":"el-input", "attrs": {"label":"姓名：","prop":"name"},"component":{"placeholder":"请输入234","disabled":true,"class":["test1","test2"]}},{"type":"el-select", "attrs": {"label":"姓名2：","prop":"name2"},"component":{"placeholder":"请选择456","optionsLabelKey":"name","optionsValueKey":"id","listeners":{},"options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox-group", "attrs": {"label":"姓名3：","prop":"name3"},"component":{"placeholder":"请输入456","optionsLabelKey":"name","optionsValueKey":"id","options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox", "attrs": {"label":"姓名4：","prop":"name4"},"component":{"label":"笨比"}}]`,
      column: 1,
      formValue: {},
      formItems: [],
    })

    // 格式化
    const formatting = () => {
      let tmp = eval("(" + state.textarea + ")");
      let value = {};
      tmp.forEach((item) => {
        if (item.type === "el-checkbox-group") {
          value[item.attrs.prop] = [];
        } else {
          value[item.attrs.prop] = null;
        }
      });
      console.log(tmp);
      state.textarea = JSON.stringify(tmp, null, 4);
      state.formValue = value;
    };

    // 生成表单
    const createForm = () => {
      state.formItems = JSON.parse(state.textarea);
      // state.formItems = state.textarea
    };
    const printForm = () => {
      console.log('state.formValue = ', state.formValue);
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

    return {
      ...toRefs(state),
      formRef,
      formatting,
      createForm,
      printForm,
      clearForm,
      validate,
    }
  },
});
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

/* ::v-deep .test1 {
  width: 20%;
}
::v-deep .test2 {
  background-color: red;
} */
</style>
