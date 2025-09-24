<template>
  <div id="app" class="main">
    <div class="textarea">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-button type="primary" @click="formatting"> 1.格式化 </el-button>
          <!-- <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload> -->
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

<script setup name="ServeDev">
import { defineComponent, reactive, toRefs, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

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

const textarea = ref(`[{"type":"el-input","label":"姓名：","prop":"name","component":{"placeholder":"请输入234","disabled":true,"class":["test1","test2"]}},{"type":"el-select","label":"姓名2：","prop":"name2","component":{"placeholder":"请选择456","optionsLabelKey":"name","optionsValueKey":"id","listeners":{},"options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox-group","label":"姓名3：","prop":"name3","component":{"placeholder":"请输入456","optionsLabelKey":"name","optionsValueKey":"id","options":[{"name":"一年级","id":"123"},{"name":"二年级","id":"456"}]}},{"type":"el-checkbox","label":"姓名4：","prop":"name4","component":{"label":"笨比"}}]`)
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
  // formItems.value = [
  //   {
  //     "type": "el-input",
  //     "label": "姓名：",
  //     "prop": "name",
  //     "component": {
  //       "placeholder": "请输入234",
  //       "disabled": true,
  //       "class": [
  //         "test1",
  //         "test2"
  //       ]
  //     }
  //   },
  //   {
  //     "type": "el-select",
  //     "label": "姓名2：",
  //     "prop": "name2",
  //     "component": {
  //       "placeholder": "请选择456",
  //       "optionsLabelKey": "name",
  //       "optionsValueKey": "id",
  //       onChange: () => {
  //         console.log(123);
  //       },
  //       "options": [
  //         {
  //           "name": "一年级",
  //           "id": "123"
  //         },
  //         {
  //           "name": "二年级",
  //           "id": "456"
  //         }
  //       ]
  //     }
  //   },
  //   {
  //     "type": "el-checkbox-group",
  //     "label": "姓名3：",
  //     "prop": "name3",
  //     "component": {
  //       "placeholder": "请输入456",
  //       "optionsLabelKey": "name",
  //       "optionsValueKey": "id",
  //       "options": [
  //         {
  //           "name": "一年级",
  //           "id": "123"
  //         },
  //         {
  //           "name": "二年级",
  //           "id": "456"
  //         }
  //       ]
  //     }
  //   },
  //   {
  //     "type": "el-checkbox",
  //     "label": "姓名4：",
  //     "prop": "name4",
  //     "component": {
  //       "label": "笨比"
  //     }
  //   }
  // ]
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
