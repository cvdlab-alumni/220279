var d1 = DOMAIN([[1.5,5.5]])([4]);

/* disegna d */

DRAW(d1);

/* aumento le dimensione i nuovi argomenti sono le nuove dimensioni */
var d2 = DOMAIN([[6.5,11.5],[1,3]])([4,2]);
DRAW(d2);
/* aumento dimensioni ancora */
var d3 = DOMAIN([[12.5,17.5],[1,3],[0,1]])([4,2,1]);
DRAW(d3);