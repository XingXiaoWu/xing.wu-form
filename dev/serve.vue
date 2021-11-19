
<template>
  <div id="app" class="main">
    <div class="textarea">
      <span>表单几列：</span>
      <el-input-number
        v-model="column"
        :min="1"
        :max="10"
        label="几列"
      ></el-input-number>
      <span>表单json内容：</span>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        :autosize="{ minRows: 40, maxRows: 100 }"
        v-model="textarea"
      />
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button type="primary" @click="formatting"> 1.格式化 </el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="createForm"> 2.生成表单 </el-button>
        </el-col>
      </el-row>
    </div>
    <div class="form">
      <xing-wu-form
        ref="form"
        label-width="80px"
        v-model="formValue"
        :formItems="formItems"
        :column="column"
      />
      <!-- <el-button type="primary" @click="createForm"> 打印当前数据 </el-button> -->
      <!-- <el-button type="primary" @click="createForm"> reset </el-button> -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
// Uncomment import and local "components" registration if library is not registered globally.
// import { XingWuFormSample } from '@/entry.esm';

export default Vue.extend({
  name: "ServeDev",
  data() {
    return {
      textarea: `[{"type":"el-input","label":"姓名：","prop":"name","component":{"placeholder":"请输入234","disabled":true,"class":["test1","test2"]}},{"type":"el-select","label":"姓名2：","prop":"name2","component":{"placeholder":"请选择456","optionsLabelKey":"name","optionsValueKey":"id","listeners":{},"options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox-group","label":"姓名3：","prop":"name3","component":{"placeholder":"请输入456","optionsLabelKey":"name","optionsValueKey":"id","options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox","label":"姓名4：","prop":"name4","component":{"label":"笨比"}}]`,
      column: 1,
      formValue: {
      },
      formItems: [],
    };
  },
  methods: {
    // 格式化
    formatting() {
      let tmp = eval("(" + this.textarea + ")");
      let value = {};
      tmp.forEach((item) => {
        if (item.type === "el-checkbox-group") {
          value[item.prop] = [];
        } else {
          value[item.prop] = null;
        }
      });
      console.log(tmp);
      this.textarea = JSON.stringify(tmp, null, 4);
      this.formValue = value;
    },
    // 生成表单
    createForm() {
      this.formItems = JSON.parse(this.textarea);
    },
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
