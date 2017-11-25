
mersennejs
==========

Mersennejs.js is an abbreviated javascript port of the mersenne twister 
PRNG at
http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/MT2002/CODES/mt19937ar.c

Only three of its C functions were translated into javascript: 

1. init\_genrand(seed) which seeds the mersenne twister with a signed
   or unsigned 32-bit number.
2. genrand\_int32() which generates an unsigned 32-bit random number.
3. genrand\_real2() which generates a floating point random number on [0,1).

These functions are exported respectively as seed, rand, and random.
rand is only exported for unit testing purposes.

The library also exports a function named randint(N).  This function
is provided as a convenience and is not in the C code.  It generates an
unsigned number from 0 to N-1 inclusive, with N passed as the first argument.

Compared to most mersenne ports, this library has no constructor and no
methods.  All its PRNG functions are provided as named exports.
The module maintains only one source of state.
So there is no need to worry about the instance object, since there is none.

For example:

    import { random, randint, seed } from 'mersennejs';
    seed(0)  // seed state vector with a 32-bit integer, can be zero
    console.log(random())    // returns floating PRN on [0,1)
    console.log(randint(10)) // return integer PRN on [0,10)

After minimization, the uncompressed size of the library is just 639 bytes.

To test the port, run "make test".  Gcc, node and js24 must all be
installed.


