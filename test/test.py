
import os
import random

os.system("gcc -o test/mt19937ar_test test/mt19937ar_test.c")

while True:
    seed = random.randint(-2**32, 2**32) 
    print("seed:", seed)
    with open("/tmp/index.js", "w") as f:
        f.write("s = %d;\n" % seed)
        f.write("console = this.console || {};\n")
        f.write("console.log = console.log || print;\n")
    os.system(
        "python3 test/bundle.py test/index.js mersennejs.min.js >> /tmp/index.js")
    os.system(
        "test/mt19937ar_test %d > /tmp/out" % seed)
    res = os.system(
        "node /tmp/index.js | diff - /tmp/out")
    if res: break
    res = os.system(
        "js24 /tmp/index.js | diff - /tmp/out")
    if res: break

