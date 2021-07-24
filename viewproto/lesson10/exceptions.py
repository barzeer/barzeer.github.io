import csv

def main():
    exceptions = [
        TypeError("type error"),
        ValueError("value error"),
        ZeroDivisionError("zero div error"),
        ArithmeticError("arithmetic error"),
        IndexError("index error"),
        KeyError("key error"),
        LookupError("lookup error"),
        FileNotFoundError("file not found error"),
        PermissionError("permission error"),
        OSError("OS error"),
        csv.Error("csv error"),
        RuntimeError("runtime error"),
        NameError("name error"),
        SyntaxError("syntax error"),
        Exception("exception")
    ]

    for ex in exceptions:
        print(ex.__class__.__name__, type(ex).__name__, ex)
        for base in ex.__class__.__bases__:
            print("   ", base.__name__)


main()
