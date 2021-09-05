import { atomFamily, useRecoilState } from "recoil"

const boolStateFamily = atomFamily({
  key: "bool-state-family",
  default: false,
})

export function useBool(key: string) {
  const [bool, setBool] = useRecoilState(boolStateFamily(key))

  function changeTrue() {
    setBool(true)
  }

  function changeFalse() {
    setBool(false)
  }

  return {
    bool: bool,
    changeTrue: changeTrue,
    changeFalse: changeFalse,
  }
}
