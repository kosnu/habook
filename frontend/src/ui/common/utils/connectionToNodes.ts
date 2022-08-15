import { Node as GeneratedNode } from "../../../graphql/types"

interface Edge<Node extends GeneratedNode> {
  node: Node
}

interface Connection<Node extends GeneratedNode> {
  edges: Array<Edge<Node> | null | undefined>
}

export type NodeType<T extends Connection<GeneratedNode>> = NonNullable<
  T["edges"][number]
>["node"]

export function connectionToNodes<Node extends GeneratedNode>(
  connection: Connection<Node> | undefined,
): Array<Node> {
  return (
    connection?.edges
      .filter((value): value is NonNullable<typeof value> => value !== null)
      .map((edge) => edge.node) ?? []
  )
}
