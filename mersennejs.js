/* 
   An abbreviated javascript port of
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/MT2002/CODES/mt19937ar.c
   Supports named exports.  No instances, only one state.  For example:
     import { random, rand, randint, seed } from 'mersennejs';
     seed(s)    // seeds state vector with 32-bit integer, can be zero
     random()   // returns floating PRN on [0,1)    (32-bit resolution)
     randint(N) // returns integer PRN on [0,N)     (32-bit resolution)
     rand()     // returns integer PRN on [0,2**32) (32-bit resolution)
   Copyright (c) 2017 roseengineering
*/
/* 
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)  
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.                          

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote 
        products derived from this software without specific prior written 
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

var N = 624,
    M = 397,
    MATRIX_A = 0x9908b0df,   /* constant vector a */
    UPPER_MASK = 0x80000000, /* most significant w-r bits */
    LOWER_MASK = 0x7fffffff, /* least significant r bits */
    mt = Array(N),           /* the array for the state vector  */
    mti = N+1;               /* mti==N+1 means mt[N] is not initialized */

/* init_genrand(seed) initializes the state vector by using */
/* one unsigned 32-bit integer "seed", which may be zero. */
/* initializes mt[N] with a seed */
function seed(s){
    mt[0] = s;
    for (mti=1; mti<N; mti++) {
        // mt[mti] = (1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti); 
        s = mt[mti-1] ^ (mt[mti-1] >>> 30);
        mt[mti] = ((1812433253 * ((s & 0xffff0000) >> 16)) << 16) + 
                    1812433253 * (s & 0x0000ffff) + mti;
        /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
        /* In the previous versions, MSBs of the seed affect   */
        /* only MSBs of the array mt[].                        */
        /* 2002/01/09 modified by Makoto Matsumoto             */
    }
}

/* generates a random number on [0,0xffffffff]-interval */
function rand(){
    var y, kk, mag01 = [ 0, MATRIX_A ]
    /* mag01[x] = x * MATRIX_A  for x=0,1 */

    if (mti >= N) { /* generate N words at one time */
        if (mti == N+1)   /* if init_genrand() has not been called, */
            seed(5489);   /* a default initial seed is used */

        for (kk=0;kk<N-M;kk++) {
            y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
            mt[kk] = mt[kk+M] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        for (;kk<N-1;kk++) {
            y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
            mt[kk] = mt[kk+(M-N)] ^ (y >>> 1) ^ mag01[y & 0x1];
        }
        y = (mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK);
        mt[N-1] = mt[M-1] ^ (y >>> 1) ^ mag01[y & 0x1];
        mti = 0;
    }
  
    y = mt[mti++];

    /* Tempering */
    y ^= (y >>> 11);
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= (y >>> 18);
    return y >>> 0;
}

function random(){
    return rand() / 4294967296;
}

exports.seed = seed;
exports.rand = rand;
exports.random = random;
exports.randint = function(N){
    return Math.floor(random() * N);
}

