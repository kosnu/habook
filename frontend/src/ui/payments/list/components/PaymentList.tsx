import { List, Typography } from "@material-ui/core"
import React from "react"
import { usePaymentsQueryQuery } from "../../../../graphql/types"
import { useLoginUser } from "../../../common/hooks/useLoginUser"
import { PaymentItem } from "./PaymentItem"

export function PaymentList() {
  const { userId } = useLoginUser()

  const { data, loading, error } = usePaymentsQueryQuery({
    variables: { userId: userId, limit: 30 },
  })

  // TODO: データがないときの画面表示を実装する
  if (data === undefined && !loading) return <Typography>Error</Typography>

  if (data === undefined) return <></> // dataのundefinedを除去

  // TODO: エラーが発生したときの実装をする
  if (error) return <Typography>Error</Typography>

  // const pageInfo = data.payments.pageInfo
  const payments = data.payments.edges
    .filter((value): value is NonNullable<typeof value> => !!value)
    .map((edge) => edge.node)

  // TODO: ページネーションをできるようにする
  return (
    <List>
      {payments.map((payment, index) => {
        return <PaymentItem key={index} payment={payment} />
      })}
    </List>
  )
}
