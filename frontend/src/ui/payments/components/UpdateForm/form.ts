import * as z from "zod"

export const formSchema = z.object({
  paymentId: z.string(),
  paidOnDate: z.date({
    required_error: "購入日を選択してください",
    invalid_type_error: "購入日を入力してください",
  }),
  categoryId: z
    .string({
      required_error: "カテゴリーを選択してください",
      invalid_type_error: "カテゴリーを選択してください",
    })
    .min(1, "カテゴリーを選択してください"),
  productName: z.string().min(1, { message: "商品名を入力してください" }),
  numberOfProduct: z.number().min(1, { message: "個数を入力してください" }),
  amount: z
    .number({
      required_error: "金額を入力してください",
      invalid_type_error: "金額を入力してください",
    })
    .nonnegative("0円以上を入力してください"),
})

export type FormSchema = z.infer<typeof formSchema>
