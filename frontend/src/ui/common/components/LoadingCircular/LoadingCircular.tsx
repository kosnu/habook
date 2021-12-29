import { css } from "@emotion/react"
import { Backdrop, CircularProgress } from "@mui/material"
import React from "react"
import { theme } from "src/ui/theme"

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
