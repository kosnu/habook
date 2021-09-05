import * as Apollo from "@apollo/client"
import { gql } from "@apollo/client"

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Category = Node & {
  __typename?: "Category"
  createdAt: Scalars["String"]
  enable: Scalars["Boolean"]
  id: Scalars["ID"]
  name: Scalars["String"]
  pk: Scalars["Int"]
  updatedAt: Scalars["String"]
  user: User
}

export type CategoryConnection = Connection & {
  __typename?: "CategoryConnection"
  edges: Array<Maybe<CategoryEdge>>
  pageInfo: PageInfo
}

export type CategoryEdge = Edge & {
  __typename?: "CategoryEdge"
  cursor: Scalars["String"]
  node: Category
}

export type Connection = {
  edges: Array<Maybe<Edge>>
  pageInfo: PageInfo
}

export type DeleteCategory = {
  id: Scalars["ID"]
  userId: Scalars["ID"]
}

export type Edge = {
  cursor: Scalars["String"]
  node: Node
}

export type ExpenseHistory = {
  __typename?: "ExpenseHistory"
  createdAt: Scalars["String"]
  expense: Scalars["Int"]
  id: Scalars["ID"]
  pk: Scalars["Int"]
  updatedAt: Scalars["String"]
  user: User
}

export type IncomeHistory = {
  __typename?: "IncomeHistory"
  createdAt: Scalars["String"]
  id: Scalars["ID"]
  income: Scalars["Int"]
  pk: Scalars["Int"]
  updatedAt: Scalars["String"]
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
  updateCategory: Category
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

export type MutationUpdateCategoryArgs = {
  input: UpdateCategory
}

export type NewCategory = {
  name: Scalars["String"]
  userId: Scalars["ID"]
}

export type NewExpenseHistory = {
  expense: Scalars["Int"]
  userId: Scalars["ID"]
}

export type NewIncomeHistory = {
  income: Scalars["Int"]
  userId: Scalars["ID"]
}

export type NewPayment = {
  amount: Scalars["Int"]
  categoryId: Scalars["ID"]
  numberOfProduct: Scalars["Int"]
  paidOn: Scalars["String"]
  productName: Scalars["String"]
  taxIncluded: Scalars["Boolean"]
  userId: Scalars["ID"]
}

export type NewUser = {
  name: Scalars["String"]
}

export type Node = {
  id: Scalars["ID"]
}

export type PageInfo = {
  __typename?: "PageInfo"
  endCursor: Scalars["String"]
  hasNextPage: Scalars["Boolean"]
}

export type PaginationInput = {
  after?: Maybe<Scalars["String"]>
  first?: Maybe<Scalars["Int"]>
}

export type Payment = Node & {
  __typename?: "Payment"
  amount: Scalars["Int"]
  category: Category
  createdAt: Scalars["String"]
  id: Scalars["ID"]
  numberOfProduct: Scalars["Int"]
  paidOn: Scalars["String"]
  pk: Scalars["Int"]
  product: Product
  taxIncluded: Scalars["Boolean"]
  updatedAt: Scalars["String"]
  user: User
}

export type PaymentConnection = Connection & {
  __typename?: "PaymentConnection"
  edges: Array<Maybe<PaymentEdge>>
  pageInfo: PageInfo
}

export type PaymentEdge = Edge & {
  __typename?: "PaymentEdge"
  cursor: Scalars["String"]
  node: Payment
}

export type Product = Node & {
  __typename?: "Product"
  createdAt: Scalars["String"]
  id: Scalars["ID"]
  name: Scalars["String"]
  pk: Scalars["Int"]
  updatedAt: Scalars["String"]
}

export type ProductConnection = Connection & {
  __typename?: "ProductConnection"
  edges: Array<Maybe<ProductEdge>>
  pageInfo: PageInfo
}

export type ProductEdge = Edge & {
  __typename?: "ProductEdge"
  cursor: Scalars["String"]
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
  input?: Maybe<SearchCategories>
  page: PaginationInput
}

export type QueryCategoryArgs = {
  id: Scalars["ID"]
}

export type QueryExpenseHistoryArgs = {
  id: Scalars["ID"]
}

export type QueryIncomeHistoriesArgs = {
  input?: Maybe<SearchIncomeHistory>
}

export type QueryIncomeHistoryArgs = {
  id: Scalars["ID"]
}

export type QueryPaymentArgs = {
  id: Scalars["ID"]
}

export type QueryPaymentsArgs = {
  input?: Maybe<SearchPayments>
  page: PaginationInput
}

export type QueryProductArgs = {
  id: Scalars["ID"]
}

export type QueryProductsArgs = {
  input?: Maybe<SearchProduct>
  page: PaginationInput
}

export type QueryUserArgs = {
  id: Scalars["ID"]
}

export type SearchCategories = {
  enable?: Maybe<Scalars["Boolean"]>
  name?: Maybe<Scalars["String"]>
  userId: Scalars["ID"]
}

export type SearchIncomeHistory = {
  beginningOfPeriod?: Maybe<Scalars["String"]>
  endOfPeriod?: Maybe<Scalars["String"]>
  userId: Scalars["ID"]
}

export type SearchPayments = {
  categoryId?: Maybe<Scalars["ID"]>
  productName?: Maybe<Scalars["String"]>
  userId: Scalars["ID"]
}

export type SearchProduct = {
  productName?: Maybe<Scalars["String"]>
  userId: Scalars["ID"]
}

export type UpdateCategory = {
  id: Scalars["ID"]
  name: Scalars["String"]
  userId: Scalars["ID"]
}

export type User = {
  __typename?: "User"
  createdAt: Scalars["String"]
  enable: Scalars["Boolean"]
  id: Scalars["ID"]
  name: Scalars["String"]
  pk: Scalars["Int"]
  updatedAt: Scalars["String"]
}

export type CategoriesListQueryVariables = Exact<{
  userId: Scalars["ID"]
  enable?: Maybe<Scalars["Boolean"]>
  cursor?: Maybe<Scalars["String"]>
  limit?: Maybe<Scalars["Int"]>
}>

export type CategoriesListQuery = {
  __typename?: "Query"
  categories: {
    __typename?: "CategoryConnection"
    pageInfo: {
      __typename?: "PageInfo"
      endCursor: string
      hasNextPage: boolean
    }
    edges: Array<
      Maybe<{
        __typename?: "CategoryEdge"
        node: {
          __typename: "Category"
          id: string
          name: string
          enable: boolean
        }
      }>
    >
  }
}

export type Categories_CategoryFragment = {
  __typename: "Category"
  id: string
  name: string
  enable: boolean
}

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars["ID"]
  userId: Scalars["ID"]
}>

export type DeleteCategoryMutation = {
  __typename?: "Mutation"
  deleteCategory: {
    __typename: "Category"
    id: string
    name: string
    enable: boolean
  }
}

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars["ID"]
  userId: Scalars["ID"]
  name: Scalars["String"]
}>

export type UpdateCategoryMutation = {
  __typename?: "Mutation"
  updateCategory: {
    __typename: "Category"
    id: string
    name: string
    enable: boolean
  }
}

export type CreateCategoryMutationVariables = Exact<{
  userId: Scalars["ID"]
  categoryName: Scalars["String"]
}>

export type CreateCategoryMutation = {
  __typename?: "Mutation"
  createCategory: { __typename?: "Category"; id: string; name: string }
}

export type Payments_CategoryFragmentFragment = {
  __typename: "Category"
  id: string
  name: string
}

export type Payments_ProductFragmentFragment = {
  __typename: "Product"
  id: string
  name: string
}

export type Payments_PaymentFragmentFragment = {
  __typename: "Payment"
  id: string
  paidOn: string
  taxIncluded: boolean
  amount: number
  numberOfProduct: number
  category: { __typename: "Category"; id: string; name: string }
  product: { __typename: "Product"; id: string; name: string }
}

export type PaymentsQueryQueryVariables = Exact<{
  userId: Scalars["ID"]
  categoryId?: Maybe<Scalars["ID"]>
  productName?: Maybe<Scalars["String"]>
  cursor?: Maybe<Scalars["String"]>
  limit?: Maybe<Scalars["Int"]>
}>

export type PaymentsQueryQuery = {
  __typename?: "Query"
  payments: {
    __typename?: "PaymentConnection"
    pageInfo: {
      __typename?: "PageInfo"
      endCursor: string
      hasNextPage: boolean
    }
    edges: Array<
      Maybe<{
        __typename?: "PaymentEdge"
        node: {
          __typename: "Payment"
          id: string
          paidOn: string
          taxIncluded: boolean
          amount: number
          numberOfProduct: number
          category: { __typename: "Category"; id: string; name: string }
          product: { __typename: "Product"; id: string; name: string }
        }
      }>
    >
  }
}

export type CategoriesQueryVariables = Exact<{
  userId: Scalars["ID"]
  enable?: Maybe<Scalars["Boolean"]>
  cursor?: Maybe<Scalars["String"]>
  limit?: Maybe<Scalars["Int"]>
}>

export type CategoriesQuery = {
  __typename?: "Query"
  categories: {
    __typename?: "CategoryConnection"
    edges: Array<
      Maybe<{
        __typename?: "CategoryEdge"
        cursor: string
        node: {
          __typename: "Category"
          pk: number
          id: string
          name: string
          enable: boolean
          createdAt: string
          updatedAt: string
        }
      }>
    >
  }
}

export type CreatePaymentMutationVariables = Exact<{
  userId: Scalars["ID"]
  categoryId: Scalars["ID"]
  paidOnDate: Scalars["String"]
  taxIncluded: Scalars["Boolean"]
  numberOfProduct: Scalars["Int"]
  amount: Scalars["Int"]
  productName: Scalars["String"]
}>

export type CreatePaymentMutation = {
  __typename?: "Mutation"
  createPayment: {
    __typename?: "Payment"
    id: string
    paidOn: string
    taxIncluded: boolean
    numberOfProduct: number
    amount: number
    category: { __typename?: "Category"; id: string }
    product: { __typename?: "Product"; name: string }
  }
}

export type ProductsQueryVariables = Exact<{
  userId: Scalars["ID"]
  productName?: Maybe<Scalars["String"]>
  cursor?: Maybe<Scalars["String"]>
  limit?: Maybe<Scalars["Int"]>
}>

export type ProductsQuery = {
  __typename?: "Query"
  products: {
    __typename?: "ProductConnection"
    pageInfo: {
      __typename?: "PageInfo"
      endCursor: string
      hasNextPage: boolean
    }
    edges: Array<
      Maybe<{
        __typename?: "ProductEdge"
        cursor: string
        node: { __typename?: "Product"; id: string; name: string }
      }>
    >
  }
}

export const Categories_CategoryFragmentDoc = gql`
  fragment Categories_Category on Category {
    __typename
    id
    name
    enable
  }
`
export const Payments_CategoryFragmentFragmentDoc = gql`
  fragment Payments_CategoryFragment on Category {
    __typename
    id
    name
  }
`
export const Payments_ProductFragmentFragmentDoc = gql`
  fragment Payments_ProductFragment on Product {
    __typename
    id
    name
  }
`
export const Payments_PaymentFragmentFragmentDoc = gql`
  fragment Payments_PaymentFragment on Payment {
    __typename
    id
    category {
      ...Payments_CategoryFragment
    }
    product {
      ...Payments_ProductFragment
    }
    paidOn
    taxIncluded
    amount
    numberOfProduct
  }
  ${Payments_CategoryFragmentFragmentDoc}
  ${Payments_ProductFragmentFragmentDoc}
`
export const CategoriesListDocument = gql`
  query categoriesList(
    $userId: ID!
    $enable: Boolean
    $cursor: String
    $limit: Int
  ) {
    categories(
      input: { userId: $userId, enable: $enable }
      page: { first: $limit, after: $cursor }
    ) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Categories_Category
        }
      }
    }
  }
  ${Categories_CategoryFragmentDoc}
`

/**
 * __useCategoriesListQuery__
 *
 * To run a query within a React component, call `useCategoriesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesListQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      enable: // value for 'enable'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCategoriesListQuery(
  baseOptions: Apollo.QueryHookOptions<
    CategoriesListQuery,
    CategoriesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CategoriesListQuery, CategoriesListQueryVariables>(
    CategoriesListDocument,
    options,
  )
}

export function useCategoriesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesListQuery,
    CategoriesListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CategoriesListQuery, CategoriesListQueryVariables>(
    CategoriesListDocument,
    options,
  )
}

export type CategoriesListQueryHookResult = ReturnType<
  typeof useCategoriesListQuery
>
export type CategoriesListLazyQueryHookResult = ReturnType<
  typeof useCategoriesListLazyQuery
>
export type CategoriesListQueryResult = Apollo.QueryResult<
  CategoriesListQuery,
  CategoriesListQueryVariables
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
export const CreateCategoryDocument = gql`
  mutation createCategory($userId: ID!, $categoryName: String!) {
    createCategory(input: { userId: $userId, name: $categoryName }) {
      id
      name
    }
  }
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
export const PaymentsQueryDocument = gql`
  query paymentsQuery(
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
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Payments_PaymentFragment
        }
      }
    }
  }
  ${Payments_PaymentFragmentFragmentDoc}
`

/**
 * __usePaymentsQueryQuery__
 *
 * To run a query within a React component, call `usePaymentsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `usePaymentsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePaymentsQueryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      categoryId: // value for 'categoryId'
 *      productName: // value for 'productName'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePaymentsQueryQuery(
  baseOptions: Apollo.QueryHookOptions<
    PaymentsQueryQuery,
    PaymentsQueryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<PaymentsQueryQuery, PaymentsQueryQueryVariables>(
    PaymentsQueryDocument,
    options,
  )
}

export function usePaymentsQueryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PaymentsQueryQuery,
    PaymentsQueryQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<PaymentsQueryQuery, PaymentsQueryQueryVariables>(
    PaymentsQueryDocument,
    options,
  )
}

export type PaymentsQueryQueryHookResult = ReturnType<
  typeof usePaymentsQueryQuery
>
export type PaymentsQueryLazyQueryHookResult = ReturnType<
  typeof usePaymentsQueryLazyQuery
>
export type PaymentsQueryQueryResult = Apollo.QueryResult<
  PaymentsQueryQuery,
  PaymentsQueryQueryVariables
>
export const CategoriesDocument = gql`
  query categories(
    $userId: ID!
    $enable: Boolean
    $cursor: String
    $limit: Int
  ) {
    categories(
      input: { userId: $userId, enable: $enable }
      page: { first: $limit, after: $cursor }
    ) {
      edges {
        cursor
        node {
          __typename
          pk
          id
          name
          enable
          createdAt
          updatedAt
        }
      }
    }
  }
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
 *      enable: // value for 'enable'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
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
export const CreatePaymentDocument = gql`
  mutation createPayment(
    $userId: ID!
    $categoryId: ID!
    $paidOnDate: String!
    $taxIncluded: Boolean!
    $numberOfProduct: Int!
    $amount: Int!
    $productName: String!
  ) {
    createPayment(
      input: {
        userId: $userId
        categoryId: $categoryId
        paidOn: $paidOnDate
        taxIncluded: $taxIncluded
        numberOfProduct: $numberOfProduct
        amount: $amount
        productName: $productName
      }
    ) {
      id
      category {
        id
      }
      paidOn
      taxIncluded
      numberOfProduct
      amount
      product {
        name
      }
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
 *      taxIncluded: // value for 'taxIncluded'
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
export const ProductsDocument = gql`
  query products(
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
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          name
        }
      }
    }
  }
`

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      productName: // value for 'productName'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProductsQuery(
  baseOptions: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  )
}

export function useProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProductsQuery,
    ProductsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(
    ProductsDocument,
    options,
  )
}

export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>
export type ProductsLazyQueryHookResult = ReturnType<
  typeof useProductsLazyQuery
>
export type ProductsQueryResult = Apollo.QueryResult<
  ProductsQuery,
  ProductsQueryVariables
>
