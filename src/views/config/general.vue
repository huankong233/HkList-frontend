<template>
  <el-card>
    <el-form
      ref="ruleFormRef"
      class="form-class"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item prop="new_admin_password" label="新管理员密码">
        <el-input
          v-model="formData.new_admin_password"
          type="password"
          clearable
          show-password
        />
      </el-form-item>

      <el-form-item prop="parse_password" label="解析密码">
        <el-input
          v-model="formData.parse_password"
          type="password"
          clearable
          show-password
        />
      </el-form-item>

      <el-form-item prop="show_announce" label="显示公告">
        <el-switch v-model="formData.show_announce" />
      </el-form-item>

      <el-form-item prop="announce" label="公告">
        <el-input v-model="formData.announce" type="textarea" :rows="4" />
      </el-form-item>

      <el-form-item prop="custom_button" label="自定义按钮">
        <el-input
          v-model="formData.custom_button"
          type="textarea"
          :rows="5"
          placeholder="按钮名称 | 点击跳转的链接
按钮名称 | 点击跳转的链接
按钮名称 | 点击跳转的链接"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {
  getConfig,
  updateConfig,
  UpdateConfigReq
} from "@/api/admin/config/general";
import { message } from "@/utils/message.js";
import { onMounted, ref } from "vue";

import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const formData = ref<UpdateConfigReq>({
  new_admin_password: "",
  parse_password: "",
  show_announce: false,
  announce: "",
  custom_button: ""
});

const rules: FormRules = {
  new_admin_password: [
    { required: true, message: "管理员密码不能为空", trigger: "blur" }
  ]
};

const getForm = async () => {
  formData.value = { ...(await getConfig()).data, new_admin_password: "" };
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl || !(await formEl.validate())) return;

  await updateConfig(formData.value);
  message("保存成功", { type: "success" });
  await getForm();
};

onMounted(getForm);
</script>

<style lang="scss" scoped>
.form-class {
  max-width: 600px;
}
</style>
