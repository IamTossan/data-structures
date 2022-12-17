# Versioned content and persistent data structures (DT)

## References

- [understanding-persistent-vector-pt-1](https://hypirion.com/musings/understanding-persistent-vector-pt-1)
- [https://immutable-js.com/](https://immutable-js.com/)

## Use cases

### I want multiple versions of the structure of my content.

This is a good use case for persistent DTs. This is a kind of DT where instead of updating nodes in place, we create new versions of nodes with the modifications and also all the parent nodes all the way to the root while still referencing the nodes that are untouched. That way we can keep multiple versions of a DT at the same time without copying the whole DT on each modification. Root ids could be used as unique identifiers for versions. You can then tag the versions that are relevant to the business and remove the irrelevant nodes with some kind of cleaning process.

### I want to have multiple versions of the structure and also the latest content at the same time

In that case, we can use nested persistent DTs. The leafs would refer to another persistent DT, so you would have a particular version of a structure and you could query the latest versions of the children persistent data strucures. This can be implemented by adding a field to point to target child persistent DT to keep reference across all the versions of a node.

### I want to start from existing content and make my own version of that

Use full persistence DT. Partial persistence has a linear-type of versions, full persistence has tree-like version hierarchy.

### I want to reuse the same content that would be consumed only once with different conditions

You can reference the same content on the leaves and add activation conditions.
