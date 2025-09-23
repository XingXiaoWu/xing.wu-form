<template>
  <el-form :ref="setFormRef" :model="form" v-bind="$attrs">
    <el-row>
      <template v-for="(item, index) in formItems" :key="index">
        <el-col :span="24 / column">
          <el-form-item v-bind="item">
            <!-- 内容 -->
            <component :is="item.type" v-model="form[item.prop]" v-bind="item.component" :class="[
              // 不包含radio和checkbox
              item.type.indexOf('radio') === -1 && item.type.indexOf('checkbox') === -1
                ? 'xing-wu-form-width100'
                : '',
              ...getClass(item.component)
            ]">
              <template v-if="item.type === 'el-checkbox-group'">
                <el-checkbox v-for="(option, optionIndex) in item.component.options" :key="optionIndex"
                  :label="option[item.component.optionsValueKey]" v-bind="option">
                  {{ option[item.component.optionsLabelKey] }}
                </el-checkbox>
              </template>
              <template v-else-if="item.type === 'el-select'">
                <el-option v-for="(option, optionIndex) in item.component.options" :key="optionIndex"
                  :label="option[item.component.optionsLabelKey]" :value="option[item.component.optionsValueKey]"
                  v-bind="option" />
              </template>
              <template v-else-if="item.type === 'el-radio-group'">
                <el-radio v-for="(option, optionIndex) in item.component.options" :key="optionIndex"
                  :label="option[item.component.optionsLabelKey]" :value="option[item.component.optionsValueKey]"
                  v-bind="option" />
              </template>

              <!-- 前后 -->
              <template #prepend v-if="item.component.prepend">
                {{ item.component.prepend }}
              </template>
              <template #append v-if="item.component.append">
                {{ item.component.append }}
              </template>
            </component>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script>
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "XingWuForm", // vue component name
  props: {
    // 需要写的表单内容
    formItems: {
      type: Array,
      default: () => [],
    },
    // 需要绑定的数据
    modelValue: {
      type: Object,
      default: () => { }
    },
    // 一行几个
    column: {
      type: Number,
      default: 1,
    },
    instance: {
      type: Object,
      default: () => { }
    }
  },
  emits: ['update:modelValue', 'update:instance'],
  setup(props, context) {

    const setFormRef = (el) => {
      context.emit('update:instance', el);
    };

    const form = computed({
      get: () => {
        console.log('props.modelValue =', props.modelValue);
        return props.modelValue;
      },
      set: (val) => {
        context.emit('update:modelValue', val);
      }
    })

    const getClass = computed(() => {
      return (component) => {
        if (component.class) {
          return component.class
        } else {
          return []
        }
      }
    })


    return {
      form,
      setFormRef,
      getClass
    }
  },
});
</script>

<style>
/* 这个前缀理论上不会重名了 */
.xing-wu-form-width100 {
  width: 100%;
}
</style>
