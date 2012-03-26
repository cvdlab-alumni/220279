/* Ambiente base online
	http://www.dia.uniroma3.it/~cvdlab/plasm.js/
*/


/* CUBOID([dimX,dimY,dimZ]) */
var c = CUBOID([1,1,1]);

/* disegna */
DRAW(c)

/* nascondi oggetto */
HIDE(c)

/* fai riapparire */
SHOW(c);

/* 
	Su tastiera premi c per centrare
	r = reset posizione camera
	x,y,z = allinea camera ad asse x,y,z
	Se esce il wireframe niente accelerazione grafica
*/

// Coloa modello
COLOR([R,G,B]])(modello)

/*
	per creare il dominio da mappare (dominio -> piano ... richiudo piani ottengo cilindro)
	come generare dominio? 
	funzione DOMAIN accetta come primo parametro una lista
	in lista coppie che indicano inizio e fine dell'intervallo
	ritorna una funzione che accetta in input una lista contenente un numero che rappresenta in quanti intervalli lo voglio dividere
*/

var d = DOMAIN([[1,5]])([4]);

/* disegna d */

DRAW(d);

/* aumento le dimensione i nuovi argomenti sono le nuove dimensioni */
var d = DOMAIN([[1.5,5.5],[1,3]])([4,2]);