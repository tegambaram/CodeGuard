def calculate(a, b):
    result = a + b
    return result
 
def multiply(a, b):
    result = a * b
    return result
 
def divide(a, b):
    if b == 0:
        return 0
    result = a / b
    return result
 
for i in range(10):
    print(i)
 
numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
    total = total + num
 
print("Total:", total)
 
def is_even(n):
    if n % 2 == 0:
        return True
    return False
 
for i in range(20):
    if is_even(i):
        print(i, "is even")