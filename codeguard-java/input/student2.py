def calculate(x, y):
    result = x + y
    return result
 
def multiply(x, y):
    result = x * y
    return result
 
def divide(x, y):
    if y == 0:
        return 0
    result = x / y
    return result
 
for i in range(10):
    print(i)
 
numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
    total = total + num
 
print("Total:", total)
 
def is_even(number):
    if number % 2 == 0:
        return True
    return False
 
for i in range(20):
    if is_even(i):
        print(i, "is even")
 