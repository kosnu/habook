import { Node as GeneratedNode } from "../../../graphql/types"

interface Edge<Node extends GeneratedNode> {
  node: Node
}

interface Connection<Node extends GeneratedNode> {
  edges: Array<Edge<Node> | null | undefined>
}

export function connectionToNodes<Node extends GeneratedNode>(
  connection: Connection<Node> | undefined,
): Array<Node> {
  return (
    connection?.edges
      .filter((value): value is NonNullable<typeof value> => value !== null)
      .map((edge) => edge.node) ?? []
  )
}
