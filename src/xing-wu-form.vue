<template>
  <el-form :ref="setFormRef" :model="form" v-bind="mergeProps($attrs, props)">
    <el-row>
      <template v-for="(item, index) in formItems" :key="index">
        <el-col :span="24 / props.column">
          <el-form-item v-bind="mergeProps(item.attrs)">
            <!-- 内容 -->
            <component :is="item.type" v-model="form[item.attrs.prop]" v-bind="item.component">
              <template v-if="item.component.options">
                <component :is="item.type == 'el-select' ? 'el-option' : (item.type.replace('-group', ''))"
                  v-for="(option, optionIndex) in item.component.options" :key="optionIndex"
                  :label="option[item.component.optionsLabelKey || 'label']"
                  :value="option[item.component.optionsValueKey || 'value'] || ''" v-bind="option">
                </component>
              </template>

              <template v-if="item.type == 'el-upload'">
                <img v-if="form[item.attrs.prop]" :src="form[item.attrs.prop]" class="xing-avatar" />
                <el-icon v-else class="xing-avatar-uploader-icon">
                  <component :is="item.component.icon" />
                </el-icon>
              </template>

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

<script setup name="XingWuForm">
// 三段
// el-form
// el-form-item
// item内组件
// item内组件可能存在次级组件

import { computed, mergeProps, defineComponent, onMounted, ref, watch } from "vue";
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
  formItems: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: Object,
    default: () => { }
  },
  column: {
    type: Number,
    default: 1,
  },
  instance: {
    type: Object,
    default: () => { }
  }
})

const emit = defineEmits(['update:modelValue', 'update:instance'])

const setFormRef = (el) => {
  emit('update:instance', el);
};

const form = computed({
  get: () => {
    console.log('props.modelValue =', props.modelValue);
    return props.modelValue;
  },
  set: (val) => {
    emit('update:modelValue', val);
  }
})

// const getClass = computed(() => {
//   return (component) => {
//     if (component.class) {
//       return component.class
//     } else {
//       return []
//     }
//   }
// })

</script>

<style>
/* 这个前缀理论上不会重名了 */
/* .xing-wu-form-width100 {
  width: 100%;
} */

.xing-avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.xing-avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
