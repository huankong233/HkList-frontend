import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { type MenuProps } from 'tdesign-vue-next'

export const useSelectMenu = (jumpPath: string, defaultValue: string) => {
  const router = useRouter()
  const selectedMenu = ref(defaultValue)
  if (router.currentRoute.value.path.includes(jumpPath)) {
    selectedMenu.value = router.currentRoute.value.path.split(jumpPath).pop()?.slice(1) || defaultValue
  }
  const changeMenu: MenuProps['onChange'] = (value) => {
    value = value.toString()

    if (value.includes('link')) return window.open(value.split('-')[1])
    selectedMenu.value = value
    router.push({ path: `/${jumpPath}/${value}` })
  }
  return [selectedMenu, changeMenu]
}
