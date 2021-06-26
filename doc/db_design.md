# DB設計

## 20210627のメモ

まず、必要なテーブルは

* payment
  * id
  * tax_included
  * paid_on
  * number_of_product
  * amount
  * product_id
  * category_id
  * user_id
  * created_at
  * updated_at
* product
  * id
  * name
  * created_at
  * updated_at
* category
  * id
  * name
  * enable
  * user_id
  * created_at
  * updated_at
* user
  * id
  * name
  * enable
  * created_at
  * updated_at
* income_history
  * id
  * income
  * user_id
  * created_at
  * updated_at
* expense_history
  * id
  * expense
  * user_id
  * created_at
  * updated_at
