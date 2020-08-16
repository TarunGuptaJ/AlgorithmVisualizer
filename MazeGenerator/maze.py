# 0 empty, 1 start, 2 end, 3 wall
# index 25 end should come and no walls
import random
# matrix = [[0 for i in range(51)] for j in range(20)]
matrix = []
# grid[1][25] = 2
# grid[10][25] = 2 M2
# grid[16][25] = 2 M3
f = 0
for i in range(20):
    l = []
    for j in range(25):
        a = random.randint(1,101)
        if(a<=30):
            l.append(3)
        else:
            l.append(0)

        temp = l + [0] 
        l.reverse()
        temp+=l
    matrix.append(temp)
    # print(temp)
zero = []
wall = []
for i in range(20):
    for j in range(51):
        if(matrix[i][j] == 3):
            wall.append([i,j])

        if(matrix[i][j] == 0):
            zero.append([i,j])

print(zero)
print("========")
print(wall)
print(len(zero+wall))
