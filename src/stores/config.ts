import { type GetConfigRes, getConfig as _getConfig } from '@/api/user/parse'
import { useSiteInfo } from '@/utils/use/useSiteInfo.ts'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import packageJson from '@/../package.json'

export const useConfigStore = defineStore('config', () => {
  const config = ref<GetConfigRes>({
    show_announce: false,
    announce: '',
    custom_button: '',
    show_hero: false,
    name: '',
    logo: '/favicon.ico',
    debug: false,
    max_once: 0,
    min_single_filesize: 0,
    max_single_filesize: 0,
    need_password: false,
    have_account: true,
    version: '2.0.0',
    frontend_version: '2.0.0',
  })
  const getConfig = async () => {
    const res = await _getConfig()
    config.value = res.data
    config.value.frontend_version = packageJson.version
    useSiteInfo(res.data.name, res.data.logo)
  }
  return { config, getConfig }
})
