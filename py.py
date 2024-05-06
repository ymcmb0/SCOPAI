def count_edges(adjacency_matrix):
    num_edges = 0
    num_vertices = len(adjacency_matrix)

    # Loop through the upper triangle of the adjacency matrix
    for i in range(num_vertices):
        for j in range(i+1, num_vertices):  # Only consider the upper triangle
            if adjacency_matrix[i][j] != 0:
                num_edges += 1

    return num_edges

# Example adjacency matrix representing a graph with 4 vertices
adjacency_matrix = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
]

print("Number of edges:", count_edges(adjacency_matrix))
