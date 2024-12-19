import { type GetConfigRes, getConfig as _getConfig } from '@/api/user/parse'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const config = ref<GetConfigRes & { is_ssl: boolean }>({
    show_announce: false,
    announce: '',
    custom_button: '',
    name: '',
    logo: '/favicon.ico',
    debug: false,
    max_once: 0,
    min_single_filesize: 0,
    max_single_filesize: 0,
    need_password: false,
    have_account: true,
    is_ssl: true,
  })
  const getConfig = async () => {
    const res = await _getConfig()
    config.value = {
      ...res.data,
      is_ssl: location.protocol === 'https:',
    }
  }
  return { config, getConfig }
})
