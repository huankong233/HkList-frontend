import { isMobile as _isMobile } from '@/utils/isMobile.ts'
import { MessagePlugin } from 'tdesign-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useMobile = () => {
  const isColScreen = ref(window.orientation == 0 || window.orientation == 180)
  const isMobile = ref(_isMobile())
  const router = useRouter()

  const resize = (showMessage = true) => {
    isColScreen.value = window.orientation == 0 || window.orientation == 180
    isMobile.value = _isMobile()
    if (!showMessage) return
    if (isColScreen.value) {
      if (router.currentRoute.value.fullPath.includes('admin')) {
        MessagePlugin.error('后台管理请务必使用横屏!')
      } else {
        MessagePlugin.info('推荐横屏使用')
      }
    }
  }

  window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', () => resize(true), false)
  window.addEventListener('resize', () => resize(false), false)
  resize()

  router.afterEach((_, prev) => {
    if (isColScreen.value && prev.fullPath.includes('user')) MessagePlugin.error('后台管理请务必使用横屏!')
  })

  return [isColScreen, isMobile]
}
