import { PaymentsQuery } from "src/graphql/types"
import { NodeType } from "../common/utils/connectionToNodes"

export type ConsumptionTaxRate = 1.1 | 1.08 | 1

export interface PaymentFormInput {
  paidOnDate: Date
  categoryId: string
  productName: string
  numberOfProduct: number
  consumptionTaxRate: ConsumptionTaxRate
  amount: number | null
}

export type Payment = NodeType<PaymentsQuery["payments"]>
