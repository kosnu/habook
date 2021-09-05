import { css } from "@emotion/react"
import { Container, Divider, Grid, Typography } from "@material-ui/core"
import React, { useCallback } from "react"
import { useRecoilValue } from "recoil"
import { useCreateCategoryMutation } from "../../../../graphql/types"
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
import {
  createCategoryParamsSelector,
  useCreateCategory,
} from "../hooks/useCreateCategory"
import { CategoryNameInput } from "./CategoryNameInput"
import { CreateCategoryButton } from "./CreateCategoryButton"

export function NewCategoryTemplate() {
  const { userId } = useLoginUser()
  const { categoryName } = useRecoilValue(createCategoryParamsSelector)
  const { validationMessage, onCategoryNameChange, onCategoryNameValidate } =
    useCreateCategory()
  const [createCategory, { loading }] = useCreateCategoryMutation()
  const { openWarningSnackbar } = useWarningSnackbar()
  const { openSuccessSnackbar } = useSuccessSnackbar()

  const handleSubmitButtonClick = useCallback(async () => {
    onCategoryNameValidate()

    // TODO: パラメータが増えたときのことを考える
    const valid = !!userId && !validationMessage.categoryName

    try {
      if (valid) {
        await createCategory({
          variables: { userId: userId, categoryName: categoryName },
        })
        openSuccessSnackbar("カテゴリーが作成できました")
        onCategoryNameChange("")
      }
    } catch (e) {
      openWarningSnackbar(e.message)
    }
  }, [
    userId,
    categoryName,
    validationMessage,
    createCategory,
    onCategoryNameChange,
    onCategoryNameValidate,
    openSuccessSnackbar,
    openWarningSnackbar,
  ])

  return (
    <>
      <Container css={wrapperStyle} maxWidth={"md"}>
        <Grid container spacing={4} direction={"column"}>
          <Grid item>
            <Typography variant={"h5"}>新しいカテゴリーの作成</Typography>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <CategoryNameInput />
          </Grid>
          <Grid item>
            <Divider variant={"fullWidth"} />
          </Grid>
          <Grid item>
            <CreateCategoryButton onClick={handleSubmitButtonClick} />
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
