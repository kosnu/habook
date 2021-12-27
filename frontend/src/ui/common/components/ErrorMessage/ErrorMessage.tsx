import { Box, Container, Typography } from "@mui/material"
import React from "react"

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <>
      <Container maxWidth={"md"}>
        <Typography variant={"h3"} color={"error"}>
          予期しないエラーが発生しました
        </Typography>
        <Box height={16} />
        <Typography variant={"body1"}>{message}</Typography>
      </Container>
    </>
  )
}
