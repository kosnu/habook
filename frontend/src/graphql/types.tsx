import { gql } from "@apollo/client"
import * as Apollo from "@apollo/client"
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Category = Node & {
  __typename?: "Category"
  createdAt: Scalars["String"]["output"]
  enable: Scalars["Boolean"]["output"]
  id: Scalars["ID"]["output"]
  name: Scalars["String"]["output"]
  pk: Scalars["Int"]["output"]
  updatedAt: Scalars["String"]["output"]
  user: User
}

export type CategoryConnection = Connection & {
  __typename?: "CategoryConnection"
  edges: Array<Maybe<CategoryEdge>>
  pageInfo: PageInfo
}

export type CategoryEdge = Edge & {
  __typename?: "CategoryEdge"
  cursor: Scalars["String"]["output"]
  node: Category
}

export type Connection = {
  edges: Array<Maybe<Edge>>
  pageInfo: PageInfo
}

export type DeleteCategory = {
  id: Scalars["ID"]["input"]
  userId: Scalars["ID"]["input"]
}

export type DeletePayment = {
  id: Scalars["ID"]["input"]
  userId: Scalars["ID"]["input"]
}

export type Edge = {
  cursor: Scalars["String"]["output"]
  node: Node
}

export type ExpenseHistory = {
  __typename?: "ExpenseHistory"
  createdAt: Scalars["String"]["output"]
  expense: Scalars["Int"]["output"]
  id: Scalars["ID"]["output"]
  pk: Scalars["Int"]["output"]
  updatedAt: Scalars["String"]["output"]
  user: User
}

export type IncomeHistory = {
  __typename?: "IncomeHistory"
  createdAt: Scalars["String"]["output"]
  id: Scalars["ID"]["output"]
  income: Scalars["Int"]["output"]
  pk: Scalars["Int"]["output"]
  updatedAt: Scalars["String"]["output"]
  user: User
}

export type Mutation = {
  __typename?: "Mutation"
  createCategory: Category
  createExpenseHistory: ExpenseHistory
  createIncomeHistory: IncomeHistory
  createPayment: Payment
  createUser: User
  deleteCategory: Category
  deletePayment: Scalars["Boolean"]["output"]
  updateCategory: Category
  updatePayment: Payment
}

export type MutationCreateCategoryArgs = {
  input: NewCategory
}

export type MutationCreateExpenseHistoryArgs = {
  input: NewExpenseHistory
}

export type MutationCreateIncomeHistoryArgs = {
  input: NewIncomeHistory
}

export type MutationCreatePaymentArgs = {
  input: NewPayment
}

export type MutationCreateUserArgs = {
  input: NewUser
}

export type MutationDeleteCategoryArgs = {
  input: DeleteCategory
}

export type MutationDeletePaymentArgs = {
  input: DeletePayment
}

export type MutationUpdateCategoryArgs = {
  input: UpdateCategory
}

export type MutationUpdatePaymentArgs = {
  input: UpdatePayment
}

export type NewCategory = {
  name: Scalars["String"]["input"]
  userId: Scalars["ID"]["input"]
}

export type NewExpenseHistory = {
  expense: Scalars["Int"]["input"]
  userId: Scalars["ID"]["input"]
}

export type NewIncomeHistory = {
  income: Scalars["Int"]["input"]
  userId: Scalars["ID"]["input"]
}

export type NewPayment = {
  amount: Scalars["Int"]["input"]
  categoryId: Scalars["ID"]["input"]
  numberOfProduct: Scalars["Int"]["input"]
  paidOn: Scalars["String"]["input"]
  productName: Scalars["String"]["input"]
  userId: Scalars["ID"]["input"]
}

export type NewUser = {
  name: Scalars["String"]["input"]
}

export type Node = {
  id: Scalars["ID"]["output"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor: Scalars["String"]["output"]
  hasNextPage: Scalars["Boolean"]["output"]
}

export type PaginationInput = {
  after?: InputMaybe<Scalars["String"]["input"]>
  first?: InputMaybe<Scalars["Int"]["input"]>
}

export type Payment = Node & {
  __typename?: "Payment"
  amount: Scalars["Int"]["output"]
  category: Category
  createdAt: Scalars["String"]["output"]
  id: Scalars["ID"]["output"]
  numberOfProduct: Scalars["Int"]["output"]
  paidOn: Scalars["String"]["output"]
  pk: Scalars["Int"]["output"]
  product: Product
  updatedAt: Scalars["String"]["output"]
  user: User
}

export type PaymentConnection = Connection & {
  __typename?: "PaymentConnection"
  edges: Array<Maybe<PaymentEdge>>
  pageInfo: PageInfo
}

export type PaymentEdge = Edge & {
  __typename?: "PaymentEdge"
  cursor: Scalars["String"]["output"]
  node: Payment
}

export type Product = Node & {
  __typename?: "Product"
  createdAt: Scalars["String"]["output"]
  id: Scalars["ID"]["output"]
  name: Scalars["String"]["output"]
  pk: Scalars["Int"]["output"]
  updatedAt: Scalars["String"]["output"]
}

export type ProductConnection = Connection & {
  __typename?: "ProductConnection"
  edges: Array<Maybe<ProductEdge>>
  pageInfo: PageInfo
}

export type ProductEdge = Edge & {
  __typename?: "ProductEdge"
  cursor: Scalars["String"]["output"]
  node: Product
}

export type Query = {
  __typename?: "Query"
  categories: CategoryConnection
  category?: Maybe<Category>
  expenseHistories: Array<ExpenseHistory>
  expenseHistory?: Maybe<ExpenseHistory>
  incomeHistories: Array<IncomeHistory>
  incomeHistory?: Maybe<IncomeHistory>
  payment?: Maybe<Payment>
  payments: PaymentConnection
  product?: Maybe<Product>
  products: ProductConnection
  user?: Maybe<User>
  users: Array<User>
}

export type QueryCategoriesArgs = {
  input?: InputMaybe<SearchCategories>
  page: PaginationInput
}

export type QueryCategoryArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryExpenseHistoryArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryIncomeHistoriesArgs = {
  input?: InputMaybe<SearchIncomeHistory>
}

export type QueryIncomeHistoryArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryPaymentArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryPaymentsArgs = {
  input?: InputMaybe<SearchPayments>
  page: PaginationInput
}

export type QueryProductArgs = {
  id: Scalars["ID"]["input"]
}

export type QueryProductsArgs = {
  input?: InputMaybe<SearchProduct>
  page: PaginationInput
}

export type QueryUserArgs = {
  id: Scalars["ID"]["input"]
}

export type SearchCategories = {
  enable?: InputMaybe<Scalars["Boolean"]["input"]>
  name?: InputMaybe<Scalars["String"]["input"]>
  userId: Scalars["ID"]["input"]
}

export type SearchIncomeHistory = {
  beginningOfPeriod?: InputMaybe<Scalars["String"]["input"]>
  endOfPeriod?: InputMaybe<Scalars["String"]["input"]>
  userId: Scalars["ID"]["input"]
}

export type SearchPayments = {
  categoryId?: InputMaybe<Scalars["ID"]["input"]>
  productName?: InputMaybe<Scalars["String"]["input"]>
  userId: Scalars["ID"]["input"]
}

export type SearchProduct = {
  productName?: InputMaybe<Scalars["String"]["input"]>
  userId: Scalars["ID"]["input"]
}

export type UpdateCategory = {
  id: Scalars["ID"]["input"]
  name: Scalars["String"]["input"]
  userId: Scalars["ID"]["input"]
}

export type UpdatePayment = {
  amount: Scalars["Int"]["input"]
  categoryId: Scalars["ID"]["input"]
  id: Scalars["ID"]["input"]
  numberOfProduct: Scalars["Int"]["input"]
  paidOn: Scalars["String"]["input"]
  userId: Scalars["ID"]["input"]
}

export type User = {
  __typename?: "User"
  createdAt: Scalars["String"]["output"]
  enable: Scalars["Boolean"]["output"]
  id: Scalars["ID"]["output"]
  name: Scalars["String"]["output"]
  pk: Scalars["Int"]["output"]
  updatedAt: Scalars["String"]["output"]
}

export type CategoriesQueryVariables = Exact<{
  userId: Scalars["ID"]["input"]
  cursor?: InputMaybe<Scalars["String"]["input"]>
}>

export type CategoriesQuery = {
  __typename?: "Query"
  categories: {
    __typename?: "CategoryConnection"
    pageInfo: {
      __typename: "PageInfo"
      endCursor: string
      hasNextPage: boolean
    }
    edges: Array<{
      __typename?: "CategoryEdge"
      node: {
        __typename: "Category"
        id: string
        name: string
        enable: boolean
        createdAt: string
      }
    } | null>
  }
}

export type Categories_CategoryFragment = {
  __typename: "Category"
  id: string
  name: string
  enable: boolean
  createdAt: string
}

export type CreateCategoryMutationVariables = Exact<{
  userId: Scalars["ID"]["input"]
  categoryName: Scalars["String"]["input"]
}>

export type CreateCategoryMutation = {
  __typename?: "Mutation"
  createCategory: {
    __typename: "Category"
    id: string
    name: string
    enable: boolean
    createdAt: string
  }
}

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars["ID"]["input"]
  userId: Scalars["ID"]["input"]
}>

export type DeleteCategoryMutation = {
  __typename?: "Mutation"
  deleteCategory: {
    __typename: "Category"
    id: string
    name: string
    enable: boolean
    createdAt: string
  }
}

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars["ID"]["input"]
  userId: Scalars["ID"]["input"]
  name: Scalars["String"]["input"]
}>

export type UpdateCategoryMutation = {
  __typename?: "Mutation"
  updateCategory: {
    __typename: "Category"
    id: string
    name: string
    enable: boolean
    createdAt: string
  }
}

export type PageInfoFragment = {
  __typename: "PageInfo"
  endCursor: string
  hasNextPage: boolean
}

export type CategoriesSelectQueryVariables = Exact<{
  userId: Scalars["ID"]["input"]
  cursor?: InputMaybe<Scalars["String"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type CategoriesSelectQuery = {
  __typename?: "Query"
  categories: {
    __typename?: "CategoryConnection"
    pageInfo: {
      __typename: "PageInfo"
      endCursor: string
      hasNextPage: boolean
    }
    edges: Array<{
      __typename?: "CategoryEdge"
      cursor: string
      node: { __typename: "Category"; id: string; name: string }
    } | null>
  }
}

export type CreatePaymentMutationVariables = Exact<{
  userId: Scalars["ID"]["input"]
  categoryId: Scalars["ID"]["input"]
  paidOnDate: Scalars["String"]["input"]
  numberOfProduct: Scalars["Int"]["input"]
  amount: Scalars["Int"]["input"]
  productName: Scalars["String"]["input"]
}>

export type CreatePaymentMutation = {
  __typename?: "Mutation"
  createPayment: {
    __typename: "Payment"
    id: string
    paidOn: string
    amount: number
    numberOfProduct: number
    createdAt: string
    category: { __typename: "Category"; id: string; name: string }
    product: { __typename: "Product"; id: string; name: string }
  }
}

export type DeletePaymentMutationVariables = Exact<{
  id: Scalars["ID"]["input"]
  userId: Scalars["ID"]["input"]
}>

export type DeletePaymentMutation = {
  __typename?: "Mutation"
  deletePayment: boolean
}

export type PaymentsQueryVariables = Exact<{
  userId: Scalars["ID"]["input"]
  categoryId?: InputMaybe<Scalars["ID"]["input"]>
  productName?: InputMaybe<Scalars["String"]["input"]>
  cursor?: InputMaybe<Scalars["String"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type PaymentsQuery = {
  __typename?: "Query"
  payments: {
    __typename?: "PaymentConnection"
    pageInfo: {
      __typename: "PageInfo"
      endCursor: string
      hasNextPage: boolean
    }
    edges: Array<{
      __typename?: "PaymentEdge"
      node: {
        __typename: "Payment"
        id: string
        paidOn: string
        amount: number
        numberOfProduct: number
        createdAt: string
        category: { __typename: "Category"; id: string; name: string }
        product: { __typename: "Product"; id: string; name: string }
      }
    } | null>
  }
}

export type ProductsAutocompleteQueryVariables = Exact<{
  userId: Scalars["ID"]["input"]
  productName?: InputMaybe<Scalars["String"]["input"]>
  cursor?: InputMaybe<Scalars["String"]["input"]>
  limit?: InputMaybe<Scalars["Int"]["input"]>
}>

export type ProductsAutocompleteQuery = {
  __typename?: "Query"
  products: {
    __typename?: "ProductConnection"
    pageInfo: {
      __typename: "PageInfo"
      endCursor: string
      hasNextPage: boolean
    }
    edges: Array<{
      __typename?: "ProductEdge"
      cursor: string
      node: { __typename: "Product"; id: string; name: string }
    } | null>
  }
}

export type UpdatePaymentMutationVariables = Exact<{
  id: Scalars["ID"]["input"]
  userId: Scalars["ID"]["input"]
  categoryId: Scalars["ID"]["input"]
  paidOnDate: Scalars["String"]["input"]
  numberOfProduct: Scalars["Int"]["input"]
  amount: Scalars["Int"]["input"]
}>

export type UpdatePaymentMutation = {
  __typename?: "Mutation"
  updatePayment: {
    __typename: "Payment"
    id: string
    paidOn: string
    amount: number
    numberOfProduct: number
    createdAt: string
    category: { __typename: "Category"; id: string; name: string }
    product: { __typename: "Product"; id: string; name: string }
  }
}

export const Categories_CategoryFragmentDoc = gql`
  fragment Categories_Category on Category {
    __typename
    id
    name
    enable
    createdAt
  }
`
export const PageInfoFragmentDoc = gql`
  fragment PageInfo on PageInfo {
    __typename
    endCursor
    hasNextPage
  }
`
export const CategoriesDocument = gql`
  query categories($userId: ID!, $cursor: String) {
    categories(
      input: { userId: $userId, enable: true }
      page: { first: 30, after: $cursor }
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          ...Categories_Category
        }
      }
    }
  }
  ${PageInfoFragmentDoc}
  ${Categories_CategoryFragmentDoc}
`

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options,
  )
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    options,
  )
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>
export type CategoriesQueryResult = Apollo.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>
export const CreateCategoryDocument = gql`
  mutation createCategory($userId: ID!, $categoryName: String!) {
    createCategory(input: { userId: $userId, name: $categoryName }) {
      ...Categories_Category
    }
  }
  ${Categories_CategoryFragmentDoc}
`
export type CreateCategoryMutationFn = Apollo.MutationFunction<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      categoryName: // value for 'categoryName'
 *   },
 * });
 */
export function useCreateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<
    CreateCategoryMutation,
    CreateCategoryMutationVariables
  >(CreateCategoryDocument, options)
}
export type CreateCategoryMutationHookResult = ReturnType<
  typeof useCreateCategoryMutation
>
export type CreateCategoryMutationResult =
  Apollo.MutationResult<CreateCategoryMutation>
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<
  CreateCategoryMutation,
  CreateCategoryMutationVariables
>
export const DeleteCategoryDocument = gql`
  mutation deleteCategory($id: ID!, $userId: ID!) {
    deleteCategory(input: { id: $id, userId: $userId }) {
      ...Categories_Category
    }
  }
  ${Categories_CategoryFragmentDoc}
`
export type DeleteCategoryMutationFn = Apollo.MutationFunction<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<
    DeleteCategoryMutation,
    DeleteCategoryMutationVariables
  >(DeleteCategoryDocument, options)
}
export type DeleteCategoryMutationHookResult = ReturnType<
  typeof useDeleteCategoryMutation
>
export type DeleteCategoryMutationResult =
  Apollo.MutationResult<DeleteCategoryMutation>
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<
  DeleteCategoryMutation,
  DeleteCategoryMutationVariables
>
export const UpdateCategoryDocument = gql`
  mutation updateCategory($id: ID!, $userId: ID!, $name: String!) {
    updateCategory(input: { id: $id, userId: $userId, name: $name }) {
      ...Categories_Category
    }
  }
  ${Categories_CategoryFragmentDoc}
`
export type UpdateCategoryMutationFn = Apollo.MutationFunction<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateCategoryMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UpdateCategoryDocument, options)
}
export type UpdateCategoryMutationHookResult = ReturnType<
  typeof useUpdateCategoryMutation
>
export type UpdateCategoryMutationResult =
  Apollo.MutationResult<UpdateCategoryMutation>
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables
>
export const CategoriesSelectDocument = gql`
  query categoriesSelect($userId: ID!, $cursor: String, $limit: Int) {
    categories(
      input: { userId: $userId, enable: true }
      page: { first: $limit, after: $cursor }
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        cursor
        node {
          __typename
          id
          name
        }
      }
    }
  }
  ${PageInfoFragmentDoc}
`

/**
 * __useCategoriesSelectQuery__
 *
 * To run a query within a React component, call `useCategoriesSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesSelectQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCategoriesSelectQuery(
  baseOptions: Apollo.QueryHookOptions<
    CategoriesSelectQuery,
    CategoriesSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<CategoriesSelectQuery, CategoriesSelectQueryVariables>(
    CategoriesSelectDocument,
    options,
  )
}
export function useCategoriesSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesSelectQuery,
    CategoriesSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<
    CategoriesSelectQuery,
    CategoriesSelectQueryVariables
  >(CategoriesSelectDocument, options)
}
export type CategoriesSelectQueryHookResult = ReturnType<
  typeof useCategoriesSelectQuery
>
export type CategoriesSelectLazyQueryHookResult = ReturnType<
  typeof useCategoriesSelectLazyQuery
>
export type CategoriesSelectQueryResult = Apollo.QueryResult<
  CategoriesSelectQuery,
  CategoriesSelectQueryVariables
>
export const CreatePaymentDocument = gql`
  mutation createPayment(
    $userId: ID!
    $categoryId: ID!
    $paidOnDate: String!
    $numberOfProduct: Int!
    $amount: Int!
    $productName: String!
  ) {
    createPayment(
      input: {
        userId: $userId
        categoryId: $categoryId
        paidOn: $paidOnDate
        numberOfProduct: $numberOfProduct
        amount: $amount
        productName: $productName
      }
    ) {
      __typename
      id
      category {
        __typename
        id
        name
      }
      product {
        __typename
        id
        name
      }
      paidOn
      amount
      numberOfProduct
      createdAt
    }
  }
`
export type CreatePaymentMutationFn = Apollo.MutationFunction<
  CreatePaymentMutation,
  CreatePaymentMutationVariables
>

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      categoryId: // value for 'categoryId'
 *      paidOnDate: // value for 'paidOnDate'
 *      numberOfProduct: // value for 'numberOfProduct'
 *      amount: // value for 'amount'
 *      productName: // value for 'productName'
 *   },
 * });
 */
export function useCreatePaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >(CreatePaymentDocument, options)
}
export type CreatePaymentMutationHookResult = ReturnType<
  typeof useCreatePaymentMutation
>
export type CreatePaymentMutationResult =
  Apollo.MutationResult<CreatePaymentMutation>
export type CreatePaymentMutationOptions = Apollo.BaseMutationOptions<
  CreatePaymentMutation,
  CreatePaymentMutationVariables
>
export const DeletePaymentDocument = gql`
  mutation deletePayment($id: ID!, $userId: ID!) {
    deletePayment(input: { id: $id, userId: $userId })
  }
`
export type DeletePaymentMutationFn = Apollo.MutationFunction<
  DeletePaymentMutation,
  DeletePaymentMutationVariables
>

/**
 * __useDeletePaymentMutation__
 *
 * To run a mutation, you first call `useDeletePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePaymentMutation, { data, loading, error }] = useDeletePaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeletePaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePaymentMutation,
    DeletePaymentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<
    DeletePaymentMutation,
    DeletePaymentMutationVariables
  >(DeletePaymentDocument, options)
}
export type DeletePaymentMutationHookResult = ReturnType<
  typeof useDeletePaymentMutation
>
export type DeletePaymentMutationResult =
  Apollo.MutationResult<DeletePaymentMutation>
export type DeletePaymentMutationOptions = Apollo.BaseMutationOptions<
  DeletePaymentMutation,
  DeletePaymentMutationVariables
>
export const PaymentsDocument = gql`
  query payments(
    $userId: ID!
    $categoryId: ID
    $productName: String
    $cursor: String
    $limit: Int
  ) {
    payments(
      input: {
        userId: $userId
        categoryId: $categoryId
        productName: $productName
      }
      page: { first: $limit, after: $cursor }
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          __typename
          id
          category {
            __typename
            id
            name
          }
          product {
            __typename
            id
            name
          }
          paidOn
          amount
          numberOfProduct
          createdAt
        }
      }
    }
  }
  ${PageInfoFragmentDoc}
`

/**
 * __usePaymentsQuery__
 *
 * To run a query within a React component, call `usePaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      categoryId: // value for 'categoryId'
 *      productName: // value for 'productName'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePaymentsQuery(
  baseOptions: Apollo.QueryHookOptions<PaymentsQuery, PaymentsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<PaymentsQuery, PaymentsQueryVariables>(
    PaymentsDocument,
    options,
  )
}
export function usePaymentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaymentsQuery,
    PaymentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<PaymentsQuery, PaymentsQueryVariables>(
    PaymentsDocument,
    options,
  )
}
export type PaymentsQueryHookResult = ReturnType<typeof usePaymentsQuery>
export type PaymentsLazyQueryHookResult = ReturnType<
  typeof usePaymentsLazyQuery
>
export type PaymentsQueryResult = Apollo.QueryResult<
  PaymentsQuery,
  PaymentsQueryVariables
>
export const ProductsAutocompleteDocument = gql`
  query productsAutocomplete(
    $userId: ID!
    $productName: String
    $cursor: String
    $limit: Int
  ) {
    products(
      input: { userId: $userId, productName: $productName }
      page: { first: $limit, after: $cursor }
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        cursor
        node {
          __typename
          id
          name
        }
      }
    }
  }
  ${PageInfoFragmentDoc}
`

/**
 * __useProductsAutocompleteQuery__
 *
 * To run a query within a React component, call `useProductsAutocompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsAutocompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsAutocompleteQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      productName: // value for 'productName'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProductsAutocompleteQuery(
  baseOptions: Apollo.QueryHookOptions<
    ProductsAutocompleteQuery,
    ProductsAutocompleteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useQuery<
    ProductsAutocompleteQuery,
    ProductsAutocompleteQueryVariables
  >(ProductsAutocompleteDocument, options)
}
export function useProductsAutocompleteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsAutocompleteQuery,
    ProductsAutocompleteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useLazyQuery<
    ProductsAutocompleteQuery,
    ProductsAutocompleteQueryVariables
  >(ProductsAutocompleteDocument, options)
}
export type ProductsAutocompleteQueryHookResult = ReturnType<
  typeof useProductsAutocompleteQuery
>
export type ProductsAutocompleteLazyQueryHookResult = ReturnType<
  typeof useProductsAutocompleteLazyQuery
>
export type ProductsAutocompleteQueryResult = Apollo.QueryResult<
  ProductsAutocompleteQuery,
  ProductsAutocompleteQueryVariables
>
export const UpdatePaymentDocument = gql`
  mutation updatePayment(
    $id: ID!
    $userId: ID!
    $categoryId: ID!
    $paidOnDate: String!
    $numberOfProduct: Int!
    $amount: Int!
  ) {
    updatePayment(
      input: {
        id: $id
        userId: $userId
        categoryId: $categoryId
        paidOn: $paidOnDate
        numberOfProduct: $numberOfProduct
        amount: $amount
      }
    ) {
      __typename
      id
      category {
        __typename
        id
        name
      }
      product {
        __typename
        id
        name
      }
      paidOn
      amount
      numberOfProduct
      createdAt
    }
  }
`
export type UpdatePaymentMutationFn = Apollo.MutationFunction<
  UpdatePaymentMutation,
  UpdatePaymentMutationVariables
>

/**
 * __useUpdatePaymentMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentMutation, { data, loading, error }] = useUpdatePaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      userId: // value for 'userId'
 *      categoryId: // value for 'categoryId'
 *      paidOnDate: // value for 'paidOnDate'
 *      numberOfProduct: // value for 'numberOfProduct'
 *      amount: // value for 'amount'
 *   },
 * });
 */
export function useUpdatePaymentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }

  return Apollo.useMutation<
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables
  >(UpdatePaymentDocument, options)
}
export type UpdatePaymentMutationHookResult = ReturnType<
  typeof useUpdatePaymentMutation
>
export type UpdatePaymentMutationResult =
  Apollo.MutationResult<UpdatePaymentMutation>
export type UpdatePaymentMutationOptions = Apollo.BaseMutationOptions<
  UpdatePaymentMutation,
  UpdatePaymentMutationVariables
>
