
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
