import { atom } from 'recoil'

export const homePageTagState = atom<string>({
  key: 'homePageTagState',
  default: '',
})
