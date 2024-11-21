<template>
  <el-card>
    <el-form
      ref="ruleFormRef"
      class="form-class"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item prop="parser_server" label="授权服务器">
        <el-input v-model="formData.parser_server" />
      </el-form-item>

      <el-form-item prop="parser_password" label="授权口令">
        <el-input
          v-model="formData.parser_password"
          type="password"
          clearable
          show-password
        />
      </el-form-item>

      <el-form-item prop="parse_mode" label="解析模式">
        <el-select
          v-model="formData.parse_mode"
          @blur="matchUserAgent"
          @change="matchUserAgent"
        >
          <el-option :value="1" label="V1盘内" />
          <el-option :value="2" label="V2盘外" />
          <el-option :value="3" label="V3开放平台" />
          <el-option :value="4" label="V4开放平台" />
          <el-option :value="5" label="V5企业模式" />
          <el-option :value="6" label="V6下载卷" />
        </el-select>
      </el-form-item>

      <el-form-item prop="user_agent" label="解析UA">
        <el-input v-model="formData.user_agent" />
      </el-form-item>

      <el-form-item prop="proxy_server" label="代理服务器">
        <el-input v-model="formData.proxy_server" />
      </el-form-item>

      <el-form-item prop="proxy_password" label="代理密码">
        <el-input
          v-model="formData.proxy_password"
          type="password"
          clearable
          show-password
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit(ruleFormRef)">
          保存
        </el-button>
        <el-button type="primary" @click="handleTestAuth(ruleFormRef)">
          测试授权
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import {
  getConfig,
  testAuth,
  updateConfig,
  UpdateConfigReq
} from "@/api/admin/config/parse";
import { message } from "@/utils/message.js";
import { onMounted, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const formData = ref<UpdateConfigReq>({
  parser_server: "https://baidu.com/",
  parser_password: "",
  parse_mode: 1,
  user_agent: "",
  proxy_server: "",
  proxy_password: ""
});

const rules: FormRules = {
  parser_server: [
    { required: true, message: "授权服务器不能为空", trigger: "blur" },
    {
      validator: (rule, value: string, callback) => {
        if (value && !/^(https:\/\/|http:\/\/)/.test(value)) {
          callback(new Error("请填写正确的URL"));
        } else if (value.at(-1) !== "/") {
          callback(new Error("URL末尾需要加/"));
        } else {
          callback();
        }
      },
      trigger: "blur"
    }
  ],
  parser_password: [
    { required: true, message: "授权口令不能为空", trigger: "blur" }
  ],
  parse_mode: [
    { required: true, message: "解析模式不能为空", trigger: "blur" }
  ],
  user_agent: [{ required: true, message: "解析UA不能为空", trigger: "blur" }]
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

const handleTestAuth = async (formEl: FormInstance | null) => {
  if (!formEl || !(await formEl.validate())) return;

  await handleSubmit(formEl);

  const res = await testAuth();
  if (res.data.valid) {
    message(`测试通过,有效期至: ${res.data.expires_at}`, { type: "success" });
  } else {
    message(`测试失败,请检查授权服务器或授权口令`, { type: "error" });
  }

  await getConfig();
};

onMounted(getForm);

const matchUserAgent = () => {
  let ua = "";
  switch (formData.value.parse_mode) {
    case 1:
    case 2:
    case 6:
      ua =
        "netdisk;P2SP;3.0.20.63;netdisk;4.36.2;PC;PC-Windows;10.0.19045;UniBaiduYunGuanJia";
      break;
    case 3:
      ua = "pan.baidu.com";
      break;
    case 4:
      ua = "Mozilla/5.0 (94list-laravel;netdisk;svip)";
      break;
    case 5:
      ua = "netdisk;hklist";
      break;
    default:
      ua =
        "netdisk;P2SP;3.0.20.63;netdisk;4.36.2;PC;PC-Windows;10.0.19045;UniBaiduYunGuanJia";
      break;
  }
  formData.value.user_agent = ua;
};
</script>

<style lang="scss" scoped>
.form-class {
  max-width: 600px;
}
</style>
