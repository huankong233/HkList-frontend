import { defineStore } from 'pinia'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref, onMounted } from 'vue'

export interface Aria2Config {
  host: string
  token: string
  dir: string
}

export const useAria2Store = defineStore('aria2Store', () => {
  const aria2ConfigDialogVisible = ref(false)
  const aria2ConfigForm = ref<Aria2Config>({
    host: 'ws://localhost:16800/jsonrpc',
    token: 'JTRWUYMehm2w',
    dir: '',
  })

  onMounted(() => {
    const aria2Config = localStorage.getItem('aria2Config')
    if (aria2Config) aria2ConfigForm.value = JSON.parse(aria2Config)
  })

  const showAria2Config = () => (aria2ConfigDialogVisible.value = true)
  const hideAria2Config = () => (aria2ConfigDialogVisible.value = false)
  const saveAria2Config = () => localStorage.setItem('aria2Config', JSON.stringify(aria2ConfigForm.value))

  let wsConnection: WebSocket | null = null
  const connectAria2 = (): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      if (wsConnection) {
        wsConnection.close()
        wsConnection = null
      }

      try {
        wsConnection = new WebSocket(aria2ConfigForm.value.host)
        wsConnection.onopen = () => resolve(wsConnection as WebSocket)
        wsConnection.onerror = (error) => {
          MessagePlugin.error('链接到Aria2下载器出错')
          reject(error)
        }
      } catch (error) {
        MessagePlugin.error('链接到Aria2下载器出错')
        reject(error)
      }
    })
  }

  const requestAria2 = async <T>(method: string, params: (string | object)[] = []): Promise<T> => {
    if (!wsConnection || wsConnection.readyState !== WebSocket.OPEN) {
      wsConnection = await connectAria2()
    }

    return new Promise((resolve, reject) => {
      wsConnection = wsConnection as WebSocket

      const requestId = 'HkList' + Date.now().toString()
      const request = {
        jsonrpc: '2.0',
        method,
        id: requestId,
        params: [`token:${aria2ConfigForm.value.token}`, ...params],
      }

      wsConnection.onmessage = (event) => {
        const response = JSON.parse(event.data)
        if (response.id === requestId) {
          if (response.error) {
            reject(response.error)
          } else {
            resolve(response.result)
          }
        }
      }

      wsConnection.send(JSON.stringify(request))
    })
  }

  const getAria2Version = async () => {
    try {
      await requestAria2<{ verion: string; enabledFeatures: string[] }>('aria2.getVersion')
      MessagePlugin.success('测试连接成功')
    } catch (error) {
      MessagePlugin.success('测试连接失败')
      console.log(error)
    }
  }

  const addAria2Url = async (url: string, filename: string, ua: string, threadCount: number) => {
    try {
      await requestAria2('aria2.addUri', [
        [url],
        {
          out: filename,
          dir: aria2ConfigForm.value.dir === '' ? null : aria2ConfigForm.value.dir,
          header: [`User-Agent: ${ua}`],
          split: threadCount.toString(),
        },
      ])
      MessagePlugin.success('发送成功')
    } catch (error) {
      MessagePlugin.success('发送失败')
      console.log(error)
    }
  }

  return {
    aria2ConfigDialogVisible,
    showAria2Config,
    hideAria2Config,
    aria2ConfigForm,
    saveAria2Config,

    getAria2Version,
    addAria2Url,
  }
})
