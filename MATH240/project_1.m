format short

%% Problem 0

% no

%% Problem 1

% Part a
fprintf("\nPart a\n");

A = [
    2, 3, 1, 10;
    6, 14, 4, 24;
    -8, -7, -9, -100;
    
]

% Part b
fprintf("\nPart b\n");
A(2, :) = A(2, :) - 3*A(1, :)
A(3, :) = A(3, :) + 4*A(1, :)
A(3, :) = A(3, :) - A(2, :)

% Part c
fprintf("\nPart c\n");
A(3, :) = A(3, :)/-6
A(1, :) = A(1, :)/2
A(2, :) = A(2, :)/5
A(1, :) = A(1, :) - 1.5*A(2, :)
A(2, :) = A(2, :) - 0.2*A(3, :)
A(1, :) = A(1, :) - 0.2*A(3, :)

% Part d
fprintf("\nPart d\n");
fprintf("solution: x1: %.2f, x2: %.2f, x3: %.2f\n", A(1, 4), A(2, 4), A(3, 4));

%% Problem 2

% Part a
fprintf("\nPart a\n");

B = [
    1, 4, 3, -1, 0, 8;
    3, 10, 15, 2, 11, 28;
    2, 6, 12, 6, 20, 14;
    0, 8, -24, -29, -71, 2;
]

% Part b
fprintf("\nPart b\n");
B(2, :) = B(2, :) - 3*B(1, :)
B(3, :) = B(3, :)/2
B(3, :) = B(3, :) - B(1, :)
B(3, :) = B(3, :) - B(2, :)/2
B(4, :) = B(4, :) + 4*B(2, :)
B([3, 4], :) = B([4, 3], :)
B(4, :) = B(4, :) + B(3, :)/6

% Part c
fprintf("\nPart c\n");
B(3, :) = -B(3, :)/9
B(1, :) = B(1, :) + 2*B(2, :)
B(2, :) = -B(2, :)/2
B(1, :) = B(1, :) - 9*B(3, :)
B(2, :) = B(2, :) + (2.5)*B(3, :)

% Part d
fprintf("\nPart d\n");

rref(B)

% Part e
x0_v = [34; -7; 0; -2; 0]
x3_v = [-15; 3; 1; 0; 0]
x5_v = [5; -2; 0; -3; 1]

%% Problem 3

% Part a
fprintf("\nPart a\n");
A = [
    7, 8, -2, 2;
    -6, 0, 6, -6;
    6, -5, 3, 6;
]

rref(A)

% Part b
fprintf("\nPart b\n");
fprintf("solution: x1: %.2f, x2: %.2f, x3: %.2f\n", A(1, 4), A(2, 4), A(3, 4));

% Part c
fprintf("\nPart c\n");
format rat
rref(A)

% Part d
fprintf("\nPart d\n");
fprintf("solution: x1: %.2f, x2: %.2f, x3: %.2f\n", A(1, 4), A(2, 4), A(3, 4));


%% Problem 4
format short

% Part a

% Equation #1: 270*x1 + 51*x2 + 70*x3 = 400
% Equation #2: 10*x1 + 5.4*x2 + 15*x3 = 30
% Equation #3: 2*x1 + 5.2*x2 + 0*x3 = 10
fprintf("\nPart a\n");
A = [
    270, 51, 70, 400;
    10, 5.4, 15, 30;
    2, 5.2, 0, 10;
]

rref(A)

% Part b

% Equation #1: 51*x2 + 70*x3 + 260*x4 = 400
% Equation #2: 5.4*x2 + 5154*x3 + 9*x4 = 30
% Equation #3: 5.2*x2 + 0*x3 + 5*x4 = 10
fprintf("\nPart b\n");
A = [
    51, 70, 260, 400;
    5.4, 15, 9, 30;
    5.2, 0, 5, 10;
]

rref(A)

%% Problem 5

% Part a
fprintf("\nPart a\n");
A = [
    5.2, 16.4, 4.2;
    3.6, 22.2, 3.6;
    9.2, 25.4, 7.2;
]

rref(A)

% Part b
fprintf("\nPart b\n");
fprintf("The given vector is in the span of the other two because there's a free variable\n");

% Part c
fprintf("\nPart c\n");
fprintf("The three vectors are linearly dependent because not all the weights are 0\n");

%% Problem 6

% Part a
fprintf("\nPart a\n");
syms a b

% Part b
fprintf("\nPart b\n");
A = [
    4, -7, a;
    -5, -4, b;
]

rref(A)

% Part c
fprintf("\nPart c\n");
w1 = (4*a)/51 - (7*b)/51
w2 = - (5*a)/51 - (4*b)/51
%% Problem 7

% Part a
fprintf("\nPart a\n");
A = [
    6, -7, 5, 35, -9, 0;
    4, 6, 1, -18, 1, 0;
    1, 5, 4, 0, 7, 0;
    5, 6, -8, -55, 5, 0;
]

rref(A)

% Part b
fprintf("\nPart b\n");
fprintf("The vectors are linearly dependent not every column has a pivot\n")

% Part c
fprintf("\nPart c\n");
1*A(:, 1) + 3*A(:, 2) - 4*A(:, 3) + 1*A(:, 4) + 0*A(:, 5)

% Part d
fprintf("\nPart d\n");
fprintf("Because the number of vectors (5) is greater than the number of entries (4), therefore the set must be linearly dependent\n");

% Part e
fprintf("\nPart e\n");
fprintf("The coefficient matrix has a pivot in every row so this set of vectors spans R^4\n")

