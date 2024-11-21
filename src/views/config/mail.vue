<template>
  <el-card>
    <el-form
      ref="ruleFormRef"
      class="form-class"
      :model="formData"
      :rules="rules"
      label-width="150px"
    >
      <el-form-item prop="mail_switch" label="是否开启邮件服务">
        <el-switch v-model="formData.mail_switch" />
      </el-form-item>

      <el-form-item prop="mail_host" label="SMTP服务器地址">
        <el-input v-model="formData.mail_host" />
      </el-form-item>

      <el-form-item prop="mail_port" label="SMTP服务器端口">
        <el-input-number v-model="formData.mail_port" />
      </el-form-item>

      <el-form-item prop="mail_username" label="SMTP服务器用户名">
        <el-input v-model="formData.mail_username" />
      </el-form-item>

      <el-form-item prop="mail_password" label="SMTP服务器密码">
        <el-input v-model="formData.mail_password" />
      </el-form-item>

      <el-form-item prop="mail_from_address" label="发件人地址">
        <el-input v-model="formData.mail_from_address" />
      </el-form-item>

      <el-form-item prop="mail_from_name" label="发件人名称">
        <el-input v-model="formData.mail_from_name" />
      </el-form-item>

      <el-form-item prop="mail_to_address" label="收件人地址">
        <el-input v-model="formData.mail_to_address" />
      </el-form-item>

      <el-form-item prop="mail_to_name" label="收件人名称">
        <el-input v-model="formData.mail_to_name" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">
          保存
        </el-button>
        <el-button type="primary" @click="handleSendTestMail(ruleFormRef)">
          发送测试邮件
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {
  getConfig,
  sendTestMail,
  updateConfig,
  UpdateConfigReq
} from "@/api/admin/config/mail";
import { message } from "@/utils/message.js";
import { onMounted, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const formData = ref<UpdateConfigReq>({
  mail_switch: false,
  mail_host: "",
  mail_port: 0,
  mail_username: "",
  mail_password: "",
  mail_from_address: "",
  mail_from_name: "",
  mail_to_address: "",
  mail_to_name: ""
});

const rules: FormRules = {
  mail_host: [
    { required: true, message: "SMTP服务器地址不能为空", trigger: "blur" }
  ],
  mail_port: [
    { required: true, message: "SMTP服务器端口能为空", trigger: "blur" }
  ],
  mail_username: [
    { required: true, message: "SMTP服务器用户名不能为空", trigger: "blur" }
  ],
  mail_password: [
    { required: true, message: "SMTP服务器密码不能为空", trigger: "blur" }
  ],
  mail_from_address: [
    { required: true, message: "发件人地址不能为空", trigger: "blur" }
  ],
  mail_from_name: [
    { required: true, message: "发件人名称不能为空", trigger: "blur" }
  ],
  mail_to_address: [
    { required: true, message: "收件人地址不能为空", trigger: "blur" }
  ],
  mail_to_name: [
    { required: true, message: "收件人名称不能为空", trigger: "blur" }
  ]
};

const getForm = async () => {
  formData.value = (await getConfig()).data;
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl || !(await formEl.validate())) return;

  await updateConfig(formData.value);
  message("保存成功", { type: "success" });
  await getForm();
};

const handleSendTestMail = async (formEl: FormInstance | null) => {
  if (!formEl || !(await formEl.validate())) return;

  await handleSubmit(formEl);

  await sendTestMail();
  message(`发送成功, 请查收`, { type: "success" });
  await getConfig();
};

onMounted(getForm);
</script>

<style lang="scss" scoped>
.form-class {
  max-width: 600px;
}
</style>
