import * as z from "zod"

export const formSchema = z.object({
  categoryId: z.string(),
  categoryName: z
    .string()
    .min(2, "2文字以上の名前を入力してください")
    .max(16, "16文字以下の名前を入力してください"),
})

export type FormSchema = z.infer<typeof formSchema>
