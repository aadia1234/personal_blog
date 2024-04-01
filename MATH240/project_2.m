format short

syms t x
%% Problem 1

% Part a
fprintf("\nPart a\n");

R_x = [
    cos(x) -sin(x);
    sin(x), cos(x);
];

v = [
    5; 
    -5;
]

A = double(subs(R_x, x, pi/9))
v_rotated = A*v

% Part b
fprintf("\nPart b\n");
B = double(subs(R_x, x, pi/11));
A * B
B * A

fprintf("Thus AB = BA\n");

% Part c
fprintf("\nPart c\n")
fprintf("The result from part b shows that the order of rotation doesn't matter for rotational transformations\n")

% Part d
fprintf("\nPart d\n");
format rat
C = A * B
t = acos(C(1, 1))
t/pi

% Part e
fprintf("\nPart e\n");
format short
inv(A)
double(subs(R_x, x, -pi/9))

fprintf("Therefore R_theta = R_-theta\n")

% Part f
fprintf("\nPart f\n");
L0 = [
    1, 0;
    0, -1;
]
L_x = R_x * L0 * subs(R_x, x, -x)
L1 = double(subs(L_x, x, pi/9))

% Part g
fprintf("\nPart g\n");
L1L0 = L1 * L0
L0L1 = L0 * L1

fprintf("Thus L1L0 is not equivalent to L0L1\n");

%Part h
fprintf("\nPart h\n");
format rat

acos(L1L0(1, 1)) / pi
%% Problem 2

A = [
    3, 4, 9;
    5, 8, 5;
    6, 7, 3;
]

% Part a
fprintf("\nPart a\n");
M = [A eye(3)]
M_red = rref(M)
A_inv_1 = M_red(:, 4:6)

% Part b
fprintf("\nPart b\n");
A_inv_2 = inv(A)

fprintf("The inverse matrix from part and b are the same\n");
%% Problem 3

% Part a
fprintf("\nPart a\n");

A = [
    5, 0, 0, 0;
    13, 2, 0, 0;
    -6, 4, -1, 0;
    10, 0, 3, -2;
]

B = [
    -1, -1, 1, 1;
    2, 0, 1, 3;
    2, -1, 1, 2;
    1, 0, 3, 3;
]

A_det = det(A)
B_det = det(B)

% Part b
fprintf("\nPart b\n")

fprintf("The first row only has one non zero entry, so the cofactors computed by the first row will be 0 except for the non-zero element. This makes the computation of the determinant significantly easier\n");

% Part c
fprintf("\nPart c\n");

C = A*B
C_det = det(C)

% Part d
fprintf("\nPart d\n");
fprintf("Since C = AB, det(C) = det(A)*det(B)\n");
%% Problem 4

A = [
    -1, 3, 9, -2;
    1, -3, -2, 0;
    0, 0, -4, -1;
    2, -8, -1, 7;
]

% Part a
fprintf("\nPart a\n");

A_det = det(A)

% Part b
fprintf("\nPart b\n");

B_det_1 = -det(A)
C_det_1 = 5*det(A)
D_det_1 = det(A)

% Part c
fprintf("\nPart c\n");

B = A;
B([2, 4], :) = B([4, 2], :)
C = A;
C(2, :) = 5*C(2, :)
D = A;
D(1, :) = 6*D(4, :) + D(1, :)

% part d
fprintf("\nPart d\n");

B_det_2 = det(B)
C_det_2 = det(C)
D_det_2 = det(D)

fprintf("The determinants found in part b are the same as the ones computed in part d\n");
%% Problem 5

% Part a
fprintf("\nPart a\n");

syms a b c d

A = [
    a, b;
    c, d;
]
% Part b
fprintf("\nPart b\n");

A_inv = inv(A)

% Part c
fprintf("\nPart c\n");

syms e f g h i

B = [
    a, b, c;
    d, e, f;
    g, h, i;
]

B_inv = inv(B)

% Part d
fprintf("\nPart d\n");

B_inv_simplified = B_inv * det(B)