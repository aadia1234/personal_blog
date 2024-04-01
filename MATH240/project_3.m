format rat

%% Problem 1
v1 = [-6; 4; -9; 4]
v2 = [8; -3; 7; -3]
v3 = [-9; 5; -8; 3]
x = [4; 7; -8; 3]

A = [v1, v2, v3]
rref(A)

fprintf("Since H = span B, and B is linearly independent since there is a pivot in every column, therefore B is a basis for H\n");

rref([A, x])

fprintf("Since rref produces a consistent solution, x is in H (Span B)\n");

x_B = [3; 5; 2; 0]
%% Problem 2

format short

% Part a
fprintf("\nPart a\n");

A = [
    cos(0), 0, 0, 0;
    0, cos(0.1), 0, 0;
    0, 0, cos(0.2)^2, 0;
    0, 0, 0, cos(0.3)^3;
]

% Part b
fprintf("\nPart b\n");

rref(A)
det(A)

% Part c
fprintf("\nPart c\n");

fprintf("Because the determinant is non zero and rref(A) is row equivalent to an identity matrix, that means A is invertible\n");

% Part d
fprintf("\nPart d\n");

B = [
    cos(0), 0, 0, 0;
    0, cos(0.2), 0, 0;
    0, 0, cos(0.5)^2, 0;
    0, 0, 0, cos(1)^3;
]

det(B)

% Part e
fprintf("\nPart e\n");


%% Problem 3

format rat

%% Problem 4

A = [
    0, 3, 1, 8, 1;
    9, -12, 4, 11, 2;
    3, -5, 1, 1, 1;
    6, -4, 4, 18, 0;
]

% Part a
fprintf("\nPart a\n");

rref(A)

% Part b
fprintf("\nPart b\n");

fprintf("dim(Nul A) = 2, dim(Col A) = 3\n");


%% Problem 5

%% Problem 6
