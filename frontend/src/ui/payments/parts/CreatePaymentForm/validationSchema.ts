import * as z from "zod"

export const schema = z.object({
  paidOnDate: z.date({ required_error: "購入日を選択してください" }),
  categoryId: z
    .string({
      required_error: "カテゴリーを選択してください",
      invalid_type_error: "カテゴリーを選択してください",
    })
    .min(1, "カテゴリーを選択してください"),
  productName: z.string().min(1, { message: "商品名を入力してください" }),
  numberOfProduct: z
    .number()
    .min(1, { message: "個数を入力してください" })
    .max(10, { message: "最大数を超えています" }),
  amount: z.number().min(1, "金額を入力してください"),
})
