<template>
  <el-form ref="xingwuForm" :model="formValue" v-bind="$attrs">
    <el-row>
      <template v-for="(item, index) in formItems">
        <el-col :span="24 / column" :key="index">
          <el-form-item v-bind="item">
            <!-- 内容 -->
            <component
              :is="item.type"
              v-model="formValue[item.prop]"
              v-bind="item.component"
              v-on="item.component.listeners"
              :class="[
              // 不包含radio和checkbox
                item.type.indexOf('radio') === -1 && item.type.indexOf('checkbox') === -1
                  ? 'xing-wu-form-width100'
                  : '',
                ...item.component.class,
              ]"
            >
              <template v-if="item.type === 'el-checkbox-group'">
                <el-checkbox
                  v-for="(option, optionIndex) in item.component.options"
                  :key="optionIndex"
                  :label="option[item.component.optionsValueKey]"
                  v-bind="option"
                >
                  {{ option[item.component.optionsLabelKey] }}
                </el-checkbox>
              </template>
              <template v-else-if="item.type === 'el-select'">
                <el-option
                  v-for="(option, optionIndex) in item.component.options"
                  :key="optionIndex"
                  :label="option[item.component.optionsLabelKey]"
                  :value="option[item.component.optionsValueKey]"
                  v-bind="option"
                />
              </template>
              <template v-else-if="item.type === 'el-radio-group'">
                <el-radio
                  v-for="(option, optionIndex) in item.component.options"
                  :key="optionIndex"
                  :label="option[item.component.optionsValueKey]"
                  v-bind="option"
                />
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
export default /*#__PURE__*/ {
  name: "XingWuForm", // vue component name
  props: {
    // 需要写的表单内容
    formItems: {
      type: Array,
      default: () => [],
    },
    // 需要绑定的数据
    formValue: {
      type: Object,
      default: () => {},
    },
    // 一行几个
    column: {
      type: Number,
      default: 1,
    },
  },
  model: {
    prop: "formValue",
    event: "updateformValue",
  },
  methods: {
    validate(callback = () => {}) {
      this.$refs.xingwuForm.validate(callback);
    },
    validateField(props, callback = (errorMessage = "") => {}) {
      this.$refs.xingwuForm.validateField(callback);
    },
    resetFields() {
      this.$refs.xingwuForm.resetFields();
    },
    clearValidate(props) {
      this.$refs.xingwuForm.clearValidate(props);
    },
  },
};
</script>

<style>
/* 这个前缀理论上不会重名了 */
.xing-wu-form-width100 {
  width: 100%;
}
</style>
