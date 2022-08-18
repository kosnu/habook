import { usePaymentsQuery } from "~/graphql/types"
import { connectionToNodes } from "~/ui/common/utils/connectionToNodes"

export function usePayments(userId: string) {
  const { data, loading, error, refetch } = usePaymentsQuery({
    variables: { userId: userId, limit: 30 },
  })

  const pageInfo = data?.payments.pageInfo
  const payments = connectionToNodes(data?.payments)

  async function fetchMorePayments() {
    try {
      // TODO: 追加読み込み
    } catch (e) {
      console.error(e)
    }
  }

  return {
    payments: payments,
    loading: loading,
    error: error,
    pageInfo: pageInfo,
    fetchMore: fetchMorePayments,
    refetch: refetch,
  }
}
