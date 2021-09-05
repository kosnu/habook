import { css } from "@emotion/react"
import { Backdrop, CircularProgress } from "@material-ui/core"
import React from "react"
import { theme } from "../../theme"

interface LoadingCircularProps {
  loading: boolean
}

export function LoadingCircular({ loading }: LoadingCircularProps) {
  return (
    <>
      <Backdrop open={loading} css={wrapperBackdropCircularStyle}>
        <CircularProgress size={"4rem"} />
      </Backdrop>
    </>
  )
}

const wrapperBackdropCircularStyle = css`
  && {
    z-index: ${theme.zIndex.drawer + 1};
  }
`
