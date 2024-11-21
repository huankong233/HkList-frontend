<template>
  <el-card>
    <el-form
      ref="ruleFormRef"
      class="form-class"
      :model="formData"
      :rules="rules"
      label-width="250px"
    >
      <el-form-item prop="max_once" label="单次最大解析数量">
        <el-input-number v-model="formData.max_once" :min="0" />
      </el-form-item>

      <el-form-item prop="min_single_filesize" label="最小解析文件大小(GB)">
        <el-input-number v-model="formData.min_single_filesize" :min="0" />
      </el-form-item>

      <el-form-item prop="max_single_filesize" label="最大解析文件大小(GB)">
        <el-input-number v-model="formData.max_single_filesize" :min="0" />
      </el-form-item>

      <el-form-item
        prop="max_download_daily_pre_account"
        label="单个解析账号单日最大可用量(GB)"
      >
        <el-input-number
          v-model="formData.max_download_daily_pre_account"
          :min="0"
        />
      </el-form-item>

      <el-form-item prop="limit_prov" label="分配省份">
        <el-switch v-model="formData.limit_prov" />
      </el-form-item>

      <el-form-item prop="limit_cn" label="仅限中国解析">
        <el-switch v-model="formData.limit_cn" />
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
} from "@/api/admin/config/limit";
import { message } from "@/utils/message.js";
import { onMounted, ref } from "vue";
import { GB } from "@/utils/format";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const formData = ref<UpdateConfigReq>({
  max_once: 0,
  min_single_filesize: 0,
  max_single_filesize: 0,
  max_download_daily_pre_account: 0,
  limit_cn: true,
  limit_prov: true
});

const rules: FormRules = {
  max_once: [
    { required: true, message: "单次最大解析数量不能为空", trigger: "blur" }
  ],
  min_single_filesize: [
    { required: true, message: "最小解析文件大小", trigger: "blur" }
  ],
  max_single_filesize: [
    { required: true, message: "最大解析文件大小", trigger: "blur" }
  ],
  max_download_daily_pre_account: [
    { required: true, message: "单个解析账号单日最大可用量", trigger: "blur" }
  ]
};

const getForm = async () => {
  const config = (await getConfig()).data;
  config.min_single_filesize = config.min_single_filesize / GB;
  config.max_single_filesize = config.max_single_filesize / GB;
  config.max_download_daily_pre_account =
    config.max_download_daily_pre_account / GB;

  formData.value = config;
};

const handleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl || !(await formEl.validate())) return;
  const config = formData.value;

  await updateConfig({
    ...config,
    min_single_filesize: config.min_single_filesize * GB,
    max_single_filesize: config.max_single_filesize * GB,
    max_download_daily_pre_account: config.max_download_daily_pre_account * GB
  });
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
