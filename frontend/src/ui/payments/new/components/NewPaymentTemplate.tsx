import { css } from "@emotion/react"
import { Container, Divider, Grid, Typography } from "@material-ui/core"
import React, { useCallback } from "react"
import { useRecoilValue } from "recoil"
import { useCreatePaymentMutation } from "../../../../graphql/types"
import { LoadingCircular } from "../../../common/components/LoadingCircular"
import {
  SuccessSnackBar,
  useSuccessSnackbar,
} from "../../../common/components/SuccessSnackBar"
import {
  useWarningSnackbar,
  WarningSnackBar,
} from "../../../common/components/WarningSnackBar"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { theme } from "../../../theme"
import { createPaymentParamsSelector } from "../hooks/useCreatePayment"
import { AmountInput } from "./AmountInput"
import { CategorySelect } from "./CategorySelect"
import { CreatePaymentButton } from "./CreatePaymentButton"
import { PaidOnDate } from "./PaidOnDate"
import { ProductNameAutocomplete } from "./ProductNameAutocomplete"

export function NewPaymentTemplate() {
  const { userId } = useLoginUser()
  const params = useRecoilValue(createPaymentParamsSelector)
  const { openWarningSnackbar } = useWarningSnackbar()
  const { openSuccessSnackbar } = useSuccessSnackbar()
  const [createPayment, { loading }] = useCreatePaymentMutation()

  const handleSubmitButtonClick = useCallback(async () => {
    try {
      await createPayment({
        variables: {
          userId: userId,
          ...params,
        },
      })
      openSuccessSnackbar("支払いの入力ができました")
    } catch (e) {
      openWarningSnackbar(e.message)
    }
  }, [params, openWarningSnackbar, userId, createPayment])

  return (
    <>
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Grid container spacing={4} direction={"column"}>
          <Grid item>
            <Typography variant={"h5"}>新しい支払いの作成</Typography>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <PaidOnDate />
          </Grid>
          <Grid item>
            <CategorySelect />
          </Grid>
          <Grid item>
            <ProductNameAutocomplete />
          </Grid>
          <Grid item>
            <AmountInput />
          </Grid>
          <Grid item>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <CreatePaymentButton onClick={handleSubmitButtonClick} />
          </Grid>
        </Grid>
      </Container>
      <SuccessSnackBar />
      <WarningSnackBar />
      <LoadingCircular loading={loading} />
    </>
  )
}

const wrapperStyle = css`
  && {
    padding: ${theme.spacing(3)}px;
  }
`
