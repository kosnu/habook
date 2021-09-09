import React from "react"
import { atomFamily, useRecoilState, useResetRecoilState } from "recoil"

export type AnchorElement = HTMLElement | null

const anchorElementStateFamily = atomFamily<AnchorElement, string>({
  key: "anchor-element-state-family",
  default: null,
})

export function useAnchorElement(key: string) {
  const [state, setState] = useRecoilState(anchorElementStateFamily(key))
  const resetState = useResetRecoilState(anchorElementStateFamily(key))

  function setAnchorElement(event: React.MouseEvent<HTMLButtonElement>) {
    setState(event.currentTarget)
  }

  return {
    anchorEl: state,
    setAnchorElement: setAnchorElement,
    resetAnchorElement: resetState,
  }
}
