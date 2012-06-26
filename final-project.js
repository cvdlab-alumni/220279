var PointUtils = function() {};

PointUtils.ruotaPunti = function(pointList, angolo, asse) {
    if (asse === 0) {
      var alfa = angolo;
      return pointList.map( function(pt) { 
		return [ pt[0], pt[1]*COS(alfa) + (-1)*pt[2]*SIN(alfa), pt[1]*SIN(alfa) + pt[2]*COS(alfa) ];
      });
    } else if (asse === 1) {
      var beta = angolo;
      return pointList.map( function(pt) { 
		return [ pt[0]*COS(beta) + pt[2]*SIN(beta), pt[1], (-1)*pt[0]*SIN(beta) + pt[2]*COS(beta) ];
      });
    } else if (asse === 2) {
      var gamma = angolo;
      return pointList.map( function(pt) { 
		return [ pt[0]*COS(gamma) + (-1)*pt[1]*SIN(gamma), pt[0]*SIN(gamma) + pt[1]*COS(gamma), pt[2] ];
      });
    }
	    
    return pointList;
};
	
PointUtils.ribaltaPunti = function(pointList, asse) {
    if (asse === 0) {
      return pointList.map( function(pt) { 
		return [ -pt[0], pt[1], pt[2] ];
      });
    } else if (asse === 1) {
      return pointList.map( function(pt) { 
		return [ pt[0], -pt[1], pt[2] ];
      });
    } else if (asse === 2) {
      return pointList.map( function(pt) { 
		return [ pt[0], pt[1], -pt[2] ];
      });
    }
};

PointUtils.traslaPunti = function(pointList, asse, qty) {
    if (asse === 0) {
      return pointList.map( function(pt) { 
		return [ pt[0]+qty, pt[1], pt[2] ];
      });
    } else if (asse === 1) {
      return pointList.map( function(pt) { 
		return [ pt[0], pt[1]+qty, pt[2] ];
      });
    } else if (asse === 2) {
      return pointList.map( function(pt) { 
		return [ pt[0], pt[1], pt[2]+qty ];
      });
    }
};

PointUtils.scalaPunti = function(pointList, scalamento, asse) {
    return pointList.map( function(pt) { 
		return [ pt[0] * scalamento, pt[1]*scalamento, pt[2]*scalamento ];
    });
};

PointUtils.scalaPuntiAsse = function(pointList, scalamento, asse) {
    if (asse === 0) {
	    return pointList.map( function(pt) { 
			return [ pt[0] * scalamento, pt[1], pt[2] ];
	    });
    } else if (asse === 1) {
	    return pointList.map( function(pt) { 
			return [ pt[0], pt[1]*scalamento, pt[2] ];
	    });
    } else if (asse === 2) {
	    return pointList.map( function(pt) { 
			return [ pt[0], pt[1], pt[2]*scalamento ];
	    });
    }
};

// =================================================================================
// =================================================================================

var CommonDomains = function() {}

CommonDomains.DIM1_DOMAIN = INTERVALS(1)(50);
CommonDomains.DIM2_DOMAIN = DOMAIN([[0,1],[0,1]])([50,1]);
CommonDomains.DIM2_DOMAIN_LOWRES = DOMAIN([[0,1],[0,1]])([15,1]);
CommonDomains.DIM2RP_DOMAIN = DOMAIN([[0,1],[0,1]])([25,25]);
CommonDomains.DIM2R_DOMAIN = DOMAIN([[0,1],[0,2*PI]])([25,25]);
CommonDomains.DIM3_DOMAIN = DOMAIN([[0,1],[0,1],[0,1]])([50,1,1]);

// =================================================================================
// =================================================================================

var CurveUtils = function() {};

CurveUtils.drawCurveDebug = function(mapping, controlPoints) {
	// punti di controllo
	var listaDfacce = [];
	controlPoints.forEach( function(v,i) { listaDfacce.push([i]); } );
	DRAW( COLOR([0.1,0.6,0.2])( SIMPLICIAL_COMPLEX(controlPoints)(listaDfacce) ) );

	// polyline che unisce punti di controllo
	// DRAW( COLOR([0.5,0.2,0.7])( POLYLINE(controlPoints) ) );

	// curva
	var curve = MAP(mapping)(CommonDomains.DIM1_DOMAIN);
	DRAW( COLOR([0,0.5,0.5])( curve ) );
};

CurveUtils.createS0NUBS = function(degree, cPoints, debug) {
	debug = debug || false;
	var nubMap = NUBS(S0)(degree)(CurveUtils.generateS0Knots(cPoints.length, degree))(cPoints);
		
	if ( debug == true ) {
		CurveUtils.drawCurveDebug(nubMap, cPoints);
	}
		
	return nubMap;
};

CurveUtils.createBezier = function(selector, cPoints, debug) {
	debug = debug || false;
	var nubMap = BEZIER(selector)(cPoints);
		
	if (( debug == true ) && (selector == S0)) {
		CurveUtils.drawCurveDebug(nubMap, cPoints);
	}
		
	return nubMap;
};

CurveUtils.createHermite = function(selector, cPoints, debug) {
	debug = debug || false;
	var nubMap = CUBIC_HERMITE(selector)(cPoints);
		
	if (( debug == true ) && (selector == S0)) {
		CurveUtils.drawCurveDebug(nubMap, cPoints);
	}
		
	return nubMap;
};

CurveUtils.generateS0Knots = function(cardP, gradoC) {
	var knotsC = cardP + gradoC + 1;
	var knots = [0,0,0];
	for(var i = 0; i < (knotsC - 3 - 3); i++) {
		knots.push(i+1);
	}
	
	knots.push(i+1);
	knots.push(i+1);
	knots.push(i+1);
	
	return knots;
};

// =================================================================================
// =================================================================================

var ColoriProgetto = function() {};
ColoriProgetto.INTONACO_BASE = [247/255, 247/255, 247/255];
ColoriProgetto.INTONACO_SCURO = [210/255, 210/255, 210/255];
ColoriProgetto.INTONACO_BORDI = [215/255, 215/255, 215/255];

ColoriProgetto.INFERRIATE_LEGGERE = [147/255,147/255,147/255];
ColoriProgetto.INFERRIATE_PESANTI = [128/255, 128/255, 128/255];

ColoriProgetto.VETRO = [164/255, 211/255, 238/255, 0.8];
ColoriProgetto.INFISSO_FINESTRA = [152/255, 118/255, 84/255];

ColoriProgetto.INFISSO_PORTA = [65/255, 32/255, 0/255];
ColoriProgetto.LEGNO_PORTA = [152/255, 118/255, 84/255];

// =================================================================================

function Colonna() {
	this.baseColonna = 10;
	this.baseColonnaSpessore = 0.5;
	this.altezzaColonnaNoCap = 34;
	//
	this.scalaCapitelloX = 0.22; 
	this.scalaCapitelloY = 0.18; 
	this.scalaCapitelloZ = 0.45;
	this.altezzaCapitello = 0.2;
}

Colonna.prototype.curvaCapitello_Controls = function(raggioMax) {
	raggioMax = raggioMax || 1;
	var controlPoints = [];
	
	var i = 0;
	var angolo = PI/2;

	for (i = 0; i < 13; i++) {
		controlPoints.push( [raggioMax * ( COS(i*angolo) + i*SIN(i*angolo)  ), raggioMax * ( SIN(i*angolo) - i*COS(i*angolo)  ), 0] );
	}
	
	return controlPoints;
};

Colonna.prototype.curvaCapitello_NubsPoints = function(raggioMax, scaleFactor, traslaQty, traslaAsse) {
	raggioMax = raggioMax || 1;
	scaleFactor = scaleFactor || 1;
	raggioMax = raggioMax || 1;
	traslaQty = traslaQty || 0;

	//
	var controlPoints = this.curvaCapitello_Controls(raggioMax);
	// Ruoto
	controlPoints = PointUtils.ruotaPunti(controlPoints, PI/4, 2);
	// Ribalto
	controlPoints = PointUtils.ribaltaPunti(controlPoints, 1);
	
	if ( scaleFactor !== 1) { 
		controlPoints = PointUtils.scalaPunti(controlPoints, scaleFactor);
	}
	
	if (traslaQty !== 0) {
		controlPoints = PointUtils.traslaPunti(controlPoints, traslaAsse, traslaQty);
	}
	
	return controlPoints
};

Colonna.prototype.curvaCapitello = function(raggioMax, scaleFactor, traslaQty, traslaAsse) {
	raggioMax = raggioMax || 1;
	scaleFactor = scaleFactor || 1;
	raggioMax = raggioMax || 1;
	traslaQty = traslaQty || 0;
	
	var controlPoints = this.curvaCapitello_NubsPoints(raggioMax, scaleFactor, traslaQty, traslaAsse);
	
	return CurveUtils.createS0NUBS(2, controlPoints, false);
};

Colonna.prototype.creaCapitello_TappoSpirale = function(zTappo, scalaSpirale) {
	/*
	var spiraleGenerica = this.curvaCapitello_Controls();
	// Perchè ???? Mi sono dimenticato
	// spiraleGenerica.push(spiraleGenerica[10]);

	spiraleGenerica = PointUtils.ruotaPunti(spiraleGenerica, PI/4, 2);
	spiraleGenerica = PointUtils.scalaPunti(spiraleGenerica, scalaSpirale);
	spiraleGenerica = PointUtils.ribaltaPunti(spiraleGenerica, 1);
	spiraleGenerica = PointUtils.traslaPunti(spiraleGenerica, 2, zTappo);
	*/

	var spiraleGenerica = this.curvaCapitello_NubsPoints(1, scalaSpirale, zTappo, 2);

	var curvaTappo = CurveUtils.createS0NUBS(2, spiraleGenerica);
	var curvaFakePoint = CurveUtils.createBezier(S0, [spiraleGenerica[12]]);
	
	return CurveUtils.createBezier(S1, [curvaTappo, curvaFakePoint]);
};

Colonna.prototype.creaCapitello_TappoCentrale = function(zInizio, zTappo, lunghTappo, scaleSpiralBig, scaleSpirallittle) {
	var spiraleGenerica = this.curvaCapitello_NubsPoints(); /* this.curvaCapitello_Controls();
	spiraleGenerica = PointUtils.ruotaPunti(spiraleGenerica, PI/4, 2);
	spiraleGenerica = PointUtils.ribaltaPunti(spiraleGenerica, 1); */

	var puntoFinaleGenerico = spiraleGenerica[spiraleGenerica.length - 1];
	var puntoBig = puntoFinaleGenerico.map(function(item) { return item*scaleSpiralBig; });
	var puntoLittle = puntoFinaleGenerico.map(function(item) { return item*scaleSpirallittle; });
	// La Z buona
	var xDiff = puntoBig[0] - puntoLittle[0];
	puntoBig[2] = zInizio;
	puntoLittle[2] = zInizio;

	var stanghettaVerticale = [puntoBig,  
								[puntoBig[0] + lunghTappo, puntoBig[1], puntoLittle[2]], 
								[puntoBig[0] + lunghTappo, puntoLittle[1], puntoBig[2] ],
								puntoLittle,
								puntoBig ];		
	
	var tappoProfondita = [ [puntoLittle[0], puntoLittle[1], puntoLittle[2] + zTappo],
							[puntoLittle[0] + lunghTappo + xDiff, puntoLittle[1], puntoLittle[2] + zTappo],
							[puntoLittle[0] + lunghTappo + xDiff, 0, puntoLittle[2] + zTappo],
							[0, 0, puntoLittle[2] + zTappo],
							[puntoLittle[0], puntoLittle[1], puntoLittle[2] + zTappo]
						   ];						   

	var modelTappi = STRUCT([  
			SIMPLICIAL_COMPLEX(stanghettaVerticale)([[0,1,2],[2,3,4]]),
			SIMPLICIAL_COMPLEX(tappoProfondita)([[0,1,2],[2,3,4]]),
		]);

	return modelTappi;
};

Colonna.prototype.creaCapitello_TappoCentraleSuperiore = function(zInizio, zFine, zRil, lunghTappo, scaleSpiralBig, scaleSpirallittle) {
	var spiraleGenerica = this.curvaCapitello_NubsPoints(); /* this.curvaCapitello_Controls();
	spiraleGenerica = PointUtils.ruotaPunti(spiraleGenerica, PI/4, 2);
	spiraleGenerica = PointUtils.ribaltaPunti(spiraleGenerica, 1); */

	var puntoFinaleGenerico = spiraleGenerica[spiraleGenerica.length - 1];
	var puntoBig = puntoFinaleGenerico.map(function(item) { return item*scaleSpiralBig; });
	var puntoLittle = puntoFinaleGenerico.map(function(item) { return item*scaleSpirallittle; });
	// La Z buona
	var xDiff = puntoBig[0] - puntoLittle[0];
	puntoBig[2] = zInizio;
	puntoLittle[2] = zInizio;

	var rettangoloSuperiore = [puntoBig, 
								[puntoBig[0] + lunghTappo, puntoBig[1], puntoBig[2]], 
								[puntoBig[0] + lunghTappo, puntoBig[1], puntoBig[2] + zFine],
								[puntoBig[0], puntoBig[1], puntoBig[2] + zFine ],
								puntoBig ];		
	
	var rettangoloInferiore = [puntoLittle, 
								[puntoLittle[0] + lunghTappo + xDiff, puntoLittle[1], puntoLittle[2]], 
								[puntoLittle[0] + lunghTappo + xDiff, puntoLittle[1], puntoLittle[2] + zFine],
								[puntoLittle[0], puntoLittle[1], puntoLittle[2] + zFine ],
								puntoLittle ];

	var rettangoloIncastroColonna = [ [puntoLittle[0] + lunghTappo + xDiff, 0, zInizio - zRil],
									  [puntoLittle[0] + lunghTappo + xDiff, 0, zFine + zRil],
										[0, 0, zFine + zRil],
										[0, 0, zInizio - zRil],
										[puntoLittle[0] + lunghTappo + xDiff, 0, zInizio - zRil] ];

	var modelTappi = STRUCT([  
			SIMPLICIAL_COMPLEX(rettangoloSuperiore)([[0,1,2],[2,3,4]]),
			SIMPLICIAL_COMPLEX(rettangoloInferiore)([[0,1,2],[2,3,4]]),
			SIMPLICIAL_COMPLEX(rettangoloIncastroColonna)([[0,1,2],[2,3,4]]),
		]);

	return modelTappi;
};

Colonna.prototype.creaCapitello_TappoSpiraliLowRes = function(lunghTappo, scaleSpiralBig, scaleSpiralLittle) {
	var curvaExt = this.curvaCapitello_NubsPoints(1, scaleSpiralBig);
	var curvaInt = this.curvaCapitello_NubsPoints(1, scaleSpiralLittle);

	var curvaExtBack = this.curvaCapitello_NubsPoints(1, scaleSpiralBig, lunghTappo, 2);
	var curvaIntBack = this.curvaCapitello_NubsPoints(1, scaleSpiralLittle, lunghTappo, 2);

	var rettangoloTappo = [curvaExt[0],
							curvaInt[0],curvaIntBack[0],curvaExtBack[0],
						   curvaExt[0] ];

	var modelTappi = SIMPLICIAL_COMPLEX(rettangoloTappo)([[0,1,2],[2,3,4]]);

	return modelTappi;
};

Colonna.prototype.creaHalfCapitello = function() {
	var usaDominio3D = true;
	//
	var zCapitello = -10;
	var scalaSpiraleGrossa = 1.05;
	var scalaSpiralePiccola = 0.9;
	var rilievoTappo = -1;
	var lunMedianaCap = 10;

	// Genera tappi
	var tappoAnteriore = this.creaCapitello_TappoSpirale(rilievoTappo, scalaSpiralePiccola);
	var tappoPosteriore = this.creaCapitello_TappoSpirale(zCapitello-(rilievoTappo), scalaSpiralePiccola);
	var tappoCentraleAnteriore = this.creaCapitello_TappoCentrale(0, rilievoTappo, lunMedianaCap, scalaSpiraleGrossa, scalaSpiralePiccola);
	var tappoCentralePosteriore = this.creaCapitello_TappoCentrale(zCapitello, -rilievoTappo, lunMedianaCap, scalaSpiraleGrossa, scalaSpiralePiccola);
	var tappoCentraleSupInf = this.creaCapitello_TappoCentraleSuperiore(0, zCapitello, -rilievoTappo, lunMedianaCap, scalaSpiraleGrossa, scalaSpiralePiccola);
	// ------------
	
	var curvaExt = this.curvaCapitello(1, scalaSpiraleGrossa);
	var curvaInt = this.curvaCapitello(1, scalaSpiralePiccola);

	var curvaExtBack = this.curvaCapitello(1, scalaSpiraleGrossa, zCapitello, 2);
	var curvaIntBack = this.curvaCapitello(1, scalaSpiralePiccola, zCapitello, 2);
	
	var supAnteriore = CurveUtils.createBezier(S1, [curvaInt,curvaExt]);
	var supPosteriore = CurveUtils.createBezier(S1, [curvaIntBack,curvaExtBack]);

	var profonditaCapitelloSolido;
	if ( usaDominio3D == true ) {
		profonditaCapitelloSolido = MAP( CurveUtils.createBezier(S2, [supAnteriore,supPosteriore]) )( CommonDomains.DIM3_DOMAIN );
	 } else {
		var profonditaCapitelloSolidoExt = CYLINDRICAL_SURFACE(curvaExt)([0,0,zCapitello]);
		var profonditaCapitelloSolidoInt = CYLINDRICAL_SURFACE(curvaInt)([0,0,zCapitello]);
		// Tappo a cylindrical surface
		var chiusuraSpirali = this.creaCapitello_TappoSpiraliLowRes(zCapitello, scalaSpiraleGrossa, scalaSpiralePiccola);
		// Genera il tutto
		profonditaCapitelloSolido = STRUCT([ MAP( profonditaCapitelloSolidoExt )( CommonDomains.DIM2_DOMAIN ),
											 MAP( profonditaCapitelloSolidoInt )( CommonDomains.DIM2_DOMAIN ),
											 chiusuraSpirali
										   ]);
	}

	// Fregio
	var cuboFregio = CUBOID([7,4,-zCapitello]);
	var fregioTrans = T([0,1,2])([7,1,zCapitello]);
	var fregioRepeat = T([0])([4.5]);

	
	var modello = STRUCT([
		  // tappi
		  MAP( tappoAnteriore )( CommonDomains.DIM2_DOMAIN ),
		  MAP( tappoPosteriore )( CommonDomains.DIM2_DOMAIN ),
		  tappoCentraleAnteriore,
		  tappoCentralePosteriore,
		  tappoCentraleSupInf,
		  // spirali
		  MAP( supAnteriore )( CommonDomains.DIM2_DOMAIN ),
		  MAP( supPosteriore )( CommonDomains.DIM2_DOMAIN ),
		  // spirali 3d
		  profonditaCapitelloSolido,
		  // Fregio
		  fregioTrans, cuboFregio
	]);
	

	return modello;
};

Colonna.prototype.creaCapitello = function() {
	var halfLeft = this.creaHalfCapitello();
	var halfRight = S([0])([-1])(this.creaHalfCapitello());

	return STRUCT([halfLeft, T([0])([29]), halfRight]);
};

Colonna.prototype.creaColonna = function() {

	var basicControlPoints = [];
	// Inizio base
	basicControlPoints.push([[5,0,0],[4,0.2,0],[0,1,0],[-0.3,0,0]]);
	// Piatto sopra base
	basicControlPoints.push([[4,0.2,0],[3,0.8,0],[-0.3,0,0],[0.3,0,0]]);
	// Pancia sale
	basicControlPoints.push([[3,0.8,0],[3.6,1.4,0],[0.6,0,0],[0,0.6,0]]);
	// Pancia piatta
	basicControlPoints.push([[3.6,1.4,0],[3.6,1.6,0],[0,0,0],[0,0,0]]);
	// Pancia rientra
	basicControlPoints.push([[3.6,1.6,0],[3,2.4,0],[0,0.6,0],[-0.6,0,0]]);
	// La colonna
	basicControlPoints.push([[3,2.4,0],[1.8,this.altezzaColonnaNoCap,0],[0,14,0],[-1,0,0]]);
	// Tappo superiore
	basicControlPoints.push([[1.8,this.altezzaColonnaNoCap,0],[0,this.altezzaColonnaNoCap,0],[0,0,0],[0,0,0]]);

	// muoviamo punti asse X
	var puntiAsseXZ = basicControlPoints.map(function(cpoints) { return PointUtils.ruotaPunti(cpoints, PI/2, 0); });
	// Crea curve
	var curveColonna = puntiAsseXZ.map(function(cpoints) { return CurveUtils.createHermite(S0, cpoints); } );
	var colonnaRotational = AA(ROTATIONAL_SURFACE)(curveColonna);
	var colonnaSurfaces = CONS( AA(MAP)(colonnaRotational) )(CommonDomains.DIM2R_DOMAIN);
	
	// Genera superfici
	var structSuperfici = T([2])([this.baseColonnaSpessore])( STRUCT(colonnaSurfaces) );
	var baseQuadrata = T([0,1])([-(this.baseColonna/2),-(this.baseColonna/2)])(CUBOID([this.baseColonna,this.baseColonna,this.baseColonnaSpessore]));
	var capitelloTop = T([0,1,2])([-3.2,-2.3,this.altezzaColonnaNoCap+this.altezzaCapitello])( R([1,2])(PI/2)( S([0,1,2])([this.scalaCapitelloX,this.scalaCapitelloY,this.scalaCapitelloZ])(this.creaCapitello()) ) );

	// Modello finale orientato sulle x
	// var rotazioneOrientante = function(a) { return a; };
	var rotazioneOrientante = R([0,1])(PI);
	var modReturn = rotazioneOrientante( STRUCT([
						COLOR(ColoriProgetto.INTONACO_BASE)(structSuperfici),
						COLOR(ColoriProgetto.INTONACO_SCURO)(baseQuadrata),
						COLOR(ColoriProgetto.INTONACO_BASE)(capitelloTop)
						]) );

	return modReturn;
};

// --------------------------

var CommonParetiMeasure = function() {};
CommonParetiMeasure.spessoreParete = 1;
CommonParetiMeasure.spessoreBordo = 0.3;
CommonParetiMeasure.larghezzaParete = 21;
CommonParetiMeasure.altezzaParete = 40.7;

// --------------------------

function ParetiColonnato() {
	this.spessoreParete = CommonParetiMeasure.spessoreParete;
	this.spessoreBordo = CommonParetiMeasure.spessoreBordo;
	this.larghezzaParete = CommonParetiMeasure.larghezzaParete;
	this.altezzaParete = CommonParetiMeasure.altezzaParete;
	this.centroParetiX = (this.larghezzaParete * 5) / 2;
}

ParetiColonnato.prototype.creaParetePorta = function() {
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var deltaBordo = 0.5;
	//
	var frameInternoH = 9;
	var frameInternoV = 19;
	var frameEsternoH = 11;
	var frameEsternoV = 21 - deltaBordo;
	//
	var bordoH = 2 - deltaBordo;
	var bordoV = bordoH;

	var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
						  		 SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[-frameInternoV,altezzaParete-frameInternoV]] )
						]);

	var bordoPorta = STRUCT([	SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[frameEsternoV,-(altezzaParete-frameEsternoV)]] ),
								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameInternoV,bordoV,-(altezzaParete-frameInternoV-bordoV)]] )
						]);

	var posBordoPorta = T([1])([-spessoreBordo])(bordoPorta);

	var portaLegno = T([0,1])([(larghezzaParete-frameInternoH)/2,spessoreParete/2])( this.creaPorta(frameInternoH, frameInternoV) );

	return STRUCT([ 
			COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete), 
			COLOR(ColoriProgetto.INTONACO_BORDI)(posBordoPorta), 
			portaLegno ]);
};

ParetiColonnato.prototype.creaPorta = function(frameInternoH, frameInternoV) {
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var profBande = spessoreBordo;
	var spessBandaH = 0.6;
	var spessBandaV = spessBandaH;
	var spessPannello = profBande/3;

	//
  	var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_PORTA)(
   							SIMPLEX_GRID([[spessBandaV],[profBande],[frameInternoV]])
   						  );

  	var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_PORTA)(
  							 SIMPLEX_GRID([[frameInternoH],[profBande],[spessBandaH]])
  							);

	var pannello = COLOR(ColoriProgetto.LEGNO_PORTA)(
					BOUNDARY(
   						SIMPLEX_GRID([[frameInternoH],[spessPannello],[frameInternoV]])
   					)
   				);

  	var bandeLateraliH = COLOR(ColoriProgetto.INFISSO_PORTA)(
   					SIMPLEX_GRID([[frameInternoH],[profBande],[spessBandaH/2]])
   				);

  	var bandeLateraliV = COLOR(ColoriProgetto.INFISSO_PORTA)(
   					SIMPLEX_GRID([[spessBandaV/2],[profBande],[frameInternoV]])
   				);

  	var finModel = [];
	finModel.push( T([1])([spessPannello])(pannello) );
	finModel.push( bandeLateraliV );
	finModel.push( T([0])([frameInternoH-(spessBandaV/2)])(bandeLateraliV) );
	finModel.push( T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale) );
	finModel.push( sbarraOrizzontale );
	finModel.push( T([2])([frameInternoV-spessBandaH])(sbarraOrizzontale) );

	finModel.push( T([2])([(1/3)*frameInternoV])(bandeLateraliH) );
	finModel.push( T([2])([(2/3)*frameInternoV])(bandeLateraliH) );

	return STRUCT(finModel);
};

ParetiColonnato.prototype.creaPareteFinestra = function() {
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var deltaBordo = 0.5;
	//
	var frameInternoH = 6.5;
	var frameInternoV = 13.5;
	var frameEsternoH = 8.5 - deltaBordo;
	var frameEsternoV = 15.5 - deltaBordo;
	var frameEsternoTV = 3;
	var conInferriata = true;
	//
	var bordoH = 2 - deltaBordo;
	var bordoV = bordoH;

	var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
						  		 SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[frameEsternoTV+bordoV,-frameInternoV,(altezzaParete-frameInternoV-frameEsternoTV-bordoV)]] )
						]);

	var bordoFinestra = STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV-frameEsternoV-bordoV)]] ),
								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV,bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV-(bordoV*2)-frameInternoV)]] )
						]);

	var posBordoFinestra = T([1])([-spessoreBordo])(bordoFinestra);

	var finestraVetri = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV+bordoV])( 
							this.creaFinestra(frameInternoH, frameInternoV, conInferriata) 
						);

	return STRUCT([ 
		COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete), 
		COLOR(ColoriProgetto.INTONACO_BORDI)(posBordoFinestra), 
		finestraVetri ]);
};

ParetiColonnato.prototype.creaFinestra = function(frameInternoH, frameInternoV, conInferriata) {
	conInferriata = conInferriata || false;
	//
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var spessBandaH = 0.3;
	var spessBandaV = spessBandaH;
	var spessVetro = spessBandaH/3;

	//
  	var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
   							SIMPLEX_GRID([[spessBandaV],[spessoreBordo],[(2/3)*frameInternoV]])
   						  );
  	var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
  							 SIMPLEX_GRID([[frameInternoH],[spessoreBordo],[spessBandaH]])
  							);
	var vetro = COLOR(ColoriProgetto.VETRO)(
					BOUNDARY(
   						SIMPLEX_GRID([[frameInternoH],[spessVetro],[frameInternoV]])
   					)
   				);
  	var bandeLaterali = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
   					SIMPLEX_GRID([[spessBandaV],[spessBandaV],[frameInternoV]])
   				);

  	var finModel = [];
	finModel.push(T([1])([spessVetro])(vetro));
	finModel.push(bandeLaterali);
	finModel.push(T([0])([(frameInternoH-spessBandaV)])(bandeLaterali));
	finModel.push(T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale));
	finModel.push(T([0])([spessBandaV])(sbarraOrizzontale));
	finModel.push(T([0,2])([spessBandaV,frameInternoV-spessBandaH])(sbarraOrizzontale));
	finModel.push(T([0,2])([spessBandaV,(2/3)*frameInternoV])(sbarraOrizzontale));
	if ( conInferriata == true ) {
		finModel.push(T([1])([-(spessBandaV/2)])(this.creaFinestra_Inferriata(frameInternoH, frameInternoV)));
	}

	return STRUCT(finModel);
};

ParetiColonnato.prototype.creaFinestra_Inferriata = function(frameInternoH, frameInternoV) {
	var endLinea = frameInternoH >= frameInternoV ? frameInternoH : frameInternoV;
	var intervalloGrate = 2.5;

	var polyStruct = [];
	for (var i = 0; i <= endLinea; i += intervalloGrate) {
		polyStruct.push( POLYLINE([[0,0,i],[i,0,0]]) );
	}

	var quarterModel = T([0,2])([-(frameInternoH/2),-(frameInternoV/2)])( STRUCT(polyStruct) );
	var fullModel = STRUCT([
						quarterModel,
						S([2])([-1]), quarterModel,
						S([0])([-1]), quarterModel,
						S([2])([-1]), quarterModel
					]);

	return COLOR(ColoriProgetto.INFERRIATE_LEGGERE)( T([0,2])([(frameInternoH/2),(frameInternoV/2)])( fullModel ) );
};

ParetiColonnato.prototype.creaPareteLateralePorta = function() {
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete + 2 + (spessoreParete*2);
	var altezzaParete = this.altezzaParete;
	//
	var deltaBordo = 0.5;
	//
	var frameInternoH = 9;
	var frameInternoV = 17;
	var frameEsternoH = 11;
	var frameEsternoV = 19 - deltaBordo;
	//
	var bordoH = 2 - deltaBordo;
	var bordoV = bordoH;

	var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
						  		 SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[-frameInternoV,altezzaParete-frameInternoV]] )
						]);

	var bordoPorta = STRUCT([	SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[frameEsternoV,-(altezzaParete-frameEsternoV)]] ),
								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameInternoV,bordoV,-(altezzaParete-frameInternoV-bordoV)]] )
						]);

	var posBordoPorta = T([1])([-spessoreBordo])(bordoPorta);

	var portaLegno = T([0,1])([(larghezzaParete-frameInternoH)/2,spessoreParete/2])( this.creaPorta(frameInternoH, frameInternoV) );

	return T([0])([-larghezzaParete+spessoreParete])( STRUCT([ 
			COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete), 
			COLOR(ColoriProgetto.INTONACO_BORDI)(posBordoPorta), 
			portaLegno ]) );
};

ParetiColonnato.prototype.creaParetePatio = function() {
	var transRipeti = T([0])([this.larghezzaParete]);
	var pareteLateraleL = R([0,1])(PI/2)( this.creaPareteLateralePorta() );
	var pareteLateraleR = S([0])([-1])( pareteLateraleL );

	var modelloFinale = STRUCT([
							pareteLateraleL,
							this.creaPareteFinestra(), transRipeti,
							this.creaPareteFinestra(), transRipeti,
							this.creaParetePorta(), transRipeti,
							this.creaPareteFinestra(), transRipeti,
							this.creaPareteFinestra(), transRipeti,
							pareteLateraleR
					]);

	return modelloFinale;
};

// --------------------------

function CornicionePatio() {
	this.larghezzaMax = 2;
	this.altezzaMax = 2.14;
};

CornicionePatio.prototype.getControlPoints = function() {
	// Punti controllo NUBS colonna
	var ctPoints = [
						// Superficie fondo
						[0,0,0],[0,0,0],
						// A,B,C
						[1,0,0],[1,0.5,0],[1.2,0.5,0],
						// D,E,F
						[1.2,1,0],[1.6,1,0],[1.6,1.5,0],
						// G
						[this.larghezzaMax,this.altezzaMax,0],
						// Superficie top
						[0,this.altezzaMax,0],[0,this.altezzaMax,0]
					];

	return ctPoints.map(function(item){ return item; });
};

CornicionePatio.prototype.creaCornicioneRetto = function(length) {
	var ctPoints = this.getControlPoints();

	// Metti punti in XZ
	ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
	var prof1 = CurveUtils.createS0NUBS(1, ctPoints);

	// CYLINDRICAL_SURFACE
	var mapProfileCornicione = CYLINDRICAL_SURFACE(prof1)([0,length,0]);

	// Tappo sul retro
	var tappoRetro = SIMPLICIAL_COMPLEX([ ctPoints[0], ctPoints[ctPoints.length-1], 
		[ ctPoints[ctPoints.length-1][0], ctPoints[ctPoints.length-1][1] + length, ctPoints[ctPoints.length-1][2] ], 
		[ ctPoints[0][0], ctPoints[0][1] + length, ctPoints[0][2] ],
		ctPoints[0]  ])([[0,1,2],[2,3,4]]);

	return STRUCT([
					MAP(mapProfileCornicione)(CommonDomains.DIM2_DOMAIN_LOWRES),
					tappoRetro
				]);
};

CornicionePatio.prototype.creaCornicioneAngolo = function() {
	var ctPoints = this.getControlPoints();

	// Metti punti in XZ
	ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
	var prof1 = CurveUtils.createS0NUBS(1, ctPoints);

	// Profilo ruotato
	var ctPointsRR = PointUtils.scalaPuntiAsse(this.getControlPoints(), SQRT(2), 0);
	ctPointsRR = PointUtils.ruotaPunti(ctPointsRR, PI/2, 0);
	ctPointsRR = PointUtils.ruotaPunti(ctPointsRR, PI/4, 2);
	var prof2 = CurveUtils.createS0NUBS(1, ctPointsRR);

	// Superficie
	var mapProfileCornicione = NUBS(S1)(1)([0,0,3,3])([prof1,prof2]);

	return MAP(mapProfileCornicione)(CommonDomains.DIM2_DOMAIN_LOWRES);	
};

CornicionePatio.prototype.creaCornicione = function(length, leftAngle, rightAngle) {
	length = length || 1;
	leftAngle = leftAngle || false;
	rightAngle = rightAngle || false;
	//

	var resultModel = [];
	resultModel.push( this.creaCornicioneRetto(length) );
	if ( leftAngle == true ) {
		resultModel.push( S([1])([-1])( this.creaCornicioneAngolo() ) );
	}
	if ( rightAngle == true ) {
		resultModel.push( T([1])([length])( this.creaCornicioneAngolo() ) );
	}

	return R([0,1])(-PI/2)( STRUCT(resultModel) );
};

// --------------------------

function ModuliPareti() {
	this.spessoreParete = CommonParetiMeasure.spessoreParete;
	this.spessoreBordo = CommonParetiMeasure.spessoreBordo;
	this.larghezzaParete = 13;
	this.altezzaParete = 53.5;
};

ModuliPareti.prototype.pareteAlta = function(larghezza) {
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = larghezza;
	var altezzaParete = this.altezzaParete;
	//

	return COLOR(ColoriProgetto.INTONACO_BASE)(
				SIMPLEX_GRID([[larghezzaParete],[spessoreParete],[altezzaParete]])
			);
};

ModuliPareti.prototype.pareteAltaFinestraPiccola = function() {
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var deltaBordo = 0.5;
	//
	var frameInternoH = 5;
	var frameInternoV = 10;
	var frameEsternoH = 7 - deltaBordo;
	var frameEsternoV = 12 - deltaBordo;
	var frameEsternoTV1 = 3 + deltaBordo;
	var frameEsternoTV2 = 37.5 + deltaBordo;
	//
	var bordoH = 2 - deltaBordo;
	var bordoV = bordoH;

	var modelloParete = COLOR(ColoriProgetto.INTONACO_BASE)(
							STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
						  			 SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],
						  			 	[frameEsternoTV1+bordoV,-frameInternoV,frameEsternoTV2-frameEsternoTV1-frameInternoV,-frameInternoV,altezzaParete-frameInternoV-frameEsternoTV2-bordoV]] )
							])
						);

	var bordoFinestra = COLOR(ColoriProgetto.INTONACO_BORDI)(
							STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV1,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV1-frameEsternoV-bordoV)]] ),
								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV1,bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV1-(bordoV*2)-frameInternoV)]] )
							])
						);

	var posBordoFinestra = T([1])([-spessoreBordo])(bordoFinestra);

	var finestraVetriInf = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraPiccola(frameInternoH, frameInternoV, true) );
	var finestraVetriSup = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV1+bordoV])( this.creaFinestraPiccola(frameInternoH, frameInternoV) );

	return  STRUCT([ modelloParete, posBordoFinestra, finestraVetriInf, T([2])([frameEsternoTV2-frameEsternoTV1]), posBordoFinestra, finestraVetriSup ]);
};

ModuliPareti.prototype.pareteAltaFinestraGrossa = function() {

};

ModuliPareti.prototype.creaFinestraPiccola = function(frameInternoH, frameInternoV, conInferriata) {
	conInferriata = conInferriata || false;
	//
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var spessBandaH = 0.3;
	var spessBandaV = spessBandaH;
	var spessVetro = spessBandaH/3;

	//
  	var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
   							SIMPLEX_GRID([[spessBandaV],[spessoreBordo],[frameInternoV]])
   						  );
  	var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
  							 SIMPLEX_GRID([[frameInternoH],[spessoreBordo],[spessBandaH]])
  							);
	var vetro = COLOR(ColoriProgetto.VETRO)(
					BOUNDARY(
   						SIMPLEX_GRID([[frameInternoH],[spessVetro],[frameInternoV]])
   					)
   				);
  	var bandeLaterali = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
   					SIMPLEX_GRID([[spessBandaV],[spessBandaV],[frameInternoV]])
   				);

  	var finModel = [];
	finModel.push(T([1])([spessVetro])(vetro));
	finModel.push(bandeLaterali);
	finModel.push(T([0])([(frameInternoH-spessBandaV)])(bandeLaterali));
	finModel.push(T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale));
	finModel.push(T([0])([spessBandaV])(sbarraOrizzontale));
	finModel.push(T([0,2])([spessBandaV,frameInternoV-spessBandaH])(sbarraOrizzontale));
	if ( conInferriata == true ) {
		finModel.push(T([1])([-(spessBandaV/2)])(this.creaFinestra_InferriataQuadrata(frameInternoH, frameInternoV)));
	}	

	return STRUCT(finModel);
};

ModuliPareti.prototype.creaFinestraGrossa = function(frameInternoH, frameInternoV, conInferriata) {
	conInferriata = conInferriata || false;
	//
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = this.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var spessBandaH = 0.3;
	var spessBandaV = spessBandaH;
	var spessVetro = spessBandaH/3;


	//
  	var sbarraVerticale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
   							SIMPLEX_GRID([[spessBandaV],[spessoreBordo],[(2/3)*frameInternoV]])
   						  );
  	var sbarraOrizzontale = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
  							 SIMPLEX_GRID([[frameInternoH],[spessoreBordo],[spessBandaH]])
  							);
	var vetro = COLOR(ColoriProgetto.VETRO)(
					BOUNDARY(
   						SIMPLEX_GRID([[frameInternoH],[spessVetro],[frameInternoV]])
   					)
   				);
  	var bandeLaterali = COLOR(ColoriProgetto.INFISSO_FINESTRA)(
   					SIMPLEX_GRID([[spessBandaV],[spessBandaV],[frameInternoV]])
   				);

  	var finModel = [];
	finModel.push(T([1])([spessVetro])(vetro));
	finModel.push(bandeLaterali);
	finModel.push(T([0])([(frameInternoH-spessBandaV)])(bandeLaterali));
	finModel.push(T([0])([(frameInternoH-spessBandaV)/2])(sbarraVerticale));
	finModel.push(T([0])([spessBandaV])(sbarraOrizzontale));
	finModel.push(T([0,2])([spessBandaV,frameInternoV-spessBandaH])(sbarraOrizzontale));
	finModel.push(T([0,2])([spessBandaV,(2/3)*frameInternoV])(sbarraOrizzontale));
	if ( conInferriata == true ) {
		finModel.push(T([1])([-(spessBandaV/2)])(this.creaFinestra_InferriataDiagonale(frameInternoH, frameInternoV)));
	}	

	return STRUCT(finModel);
};

ModuliPareti.prototype.creaFinestra_InferriataQuadrata = function(frameInternoH, frameInternoV) {
	var intervalloGrate = 1.5;

	var polyStruct = [];
	for (var i = 0; i <= frameInternoH; i += intervalloGrate) {
		polyStruct.push( POLYLINE([[i,0,0],[i,0,frameInternoV]]) );
	}
	for (var i = 0; i <= frameInternoV; i += intervalloGrate) {
		polyStruct.push( POLYLINE([[0,0,i],[frameInternoH,0,i]]) );
	}

	return COLOR(ColoriProgetto.INFERRIATE_PESANTI)( STRUCT( polyStruct ) );
};

ModuliPareti.prototype.creaFinestra_InferriataDiagonale = ParetiColonnato.prototype.creaFinestra_Inferriata;

// -----------------------------

function Patio() {
	this.refColonna = new Colonna();
	this.refParetiColonnato = new ParetiColonnato();
	this.refCornicionePatio = new CornicionePatio();
	// References
	this.startPatio = this.refColonna.baseColonna * (2/3);
	this.profonditaPatio = this.startPatio + 25;
	this.centroPatioX = this.refParetiColonnato.centroParetiX;
	this.centroPatioY = (this.profonditaPatio + this.startPatio) / 2;
	// Patio sopra colonne
	this.lunghezzaPatioX = 105;
	this.lunghezzaPatioY = 7;
	// Altezza cornicione
	this.altezzaCornicione = this.refColonna.altezzaColonnaNoCap - this.refColonna.altezzaCapitello - 0.25 + this.refCornicionePatio.altezzaMax;
	// Altezza supCornicione
	this.altezzaSupCornicione = this.altezzaCornicione + this.refCornicionePatio.altezzaMax;
};

Patio.prototype.creaColonnato = function(fullColonnato) {
	fullColonnato = fullColonnato || false;

	var colonnaStandard = this.refColonna.creaColonna().translate([1],[1]);
	var standardTrans = T([0])([this.refParetiColonnato.larghezzaParete]);

	var modelloColonnato = colonnaStandard;
	if ( fullColonnato != false ) {
		/*
		modelloColonnato = STRUCT([
								colonnaStandard, standardTrans,
								colonnaStandard, standardTrans,
								colonnaStandard, standardTrans,
								colonnaStandard, standardTrans,
								colonnaStandard, standardTrans,
								colonnaStandard
							]);	*/
		modelloColonnato = STRUCT([
								colonnaStandard,
								colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 1]),
								colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 2]),
								colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 3]),
								colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 4]),
								colonnaStandard.clone().translate([0],[this.refParetiColonnato.larghezzaParete * 5])
							]);
	}

	return modelloColonnato;
};

Patio.prototype.creaFullCornicione = function() {
	var lunghezzaPatioX = this.lunghezzaPatioX;
	var lunghezzaPatioY = this.lunghezzaPatioY;
	//
	var rotatedModel = R([0,1])(PI/2)( this.refCornicionePatio.creaCornicione(lunghezzaPatioY,true,false) );
	//
	var finalModel = [];
	//
	finalModel.push( this.refCornicionePatio.creaCornicione(lunghezzaPatioX,true,true) );
	finalModel.push( T([0])([lunghezzaPatioX])( rotatedModel ) );
	finalModel.push( S([0])([-1])( rotatedModel ) );

	return COLOR(ColoriProgetto.INTONACO_BASE)( STRUCT(finalModel) );
};

Patio.prototype.creaSoffitto = function() {
	var lunghezzaPatioX = this.lunghezzaPatioX;
	var lunghezzaPatioY = this.lunghezzaPatioY;
	//
	var finalModel = [];
	finalModel.push( T([2])([this.altezzaSupCornicione - this.altezzaCornicione])( CUBOID([this.lunghezzaPatioX, this.profonditaPatio, 0.5]) ) );
	finalModel.push( CUBOID([this.lunghezzaPatioX, this.lunghezzaPatioY, this.refCornicionePatio.altezzaMax]) );
	//
	return COLOR(ColoriProgetto.INTONACO_BASE)( STRUCT(finalModel) );
};

Patio.prototype.creaPatio = function(fullColonnato) {
	var modelloParetiPatio = T([1])([this.profonditaPatio])( this.refParetiColonnato.creaParetePatio() );
	// var modelloColonnato = this.creaColonnato(fullColonnato);
	var modelloCornicione = T([2])([this.altezzaCornicione])( this.creaFullCornicione() );
	var modelloSoffitto = T([2])([this.altezzaCornicione])( this.creaSoffitto() );

	var modelloFinale = STRUCT([
									modelloParetiPatio,
	//								modelloColonnato,
									modelloCornicione,
									modelloSoffitto
								]);

	return T([0])([-this.centroPatioX])( modelloFinale );
};

// --------------------------

function ColonnaBalconcino() {
	this.fattoreScalaBase = 0.5;
	this.hMaxColonna = 4.2;
};

ColonnaBalconcino.prototype.getColumnPoints = function() {
	// Punti controllo NUBS colonna
	var ctPoints = [
						// Superficie fondo
						[0,0,0],[0,0,0],
						// A,B,C
						[1,0,0],[1,1,0],[0.3,1.2,0],
						// D,E,F
						[0.3,1.3,0],[1,1.7,0],[1,1.8,0],
						// G,H,I
						[0.3,1.8,0],[0.3,2,0],[1,2.2,0],
						// L,M,N
						[1,2.6,0],[0.3,2.8,0],[0.3,3,0],
						// O,P,Q
						[0.5,3.25,0],[0.5,3.35,0],[0.3,3.6,0],
						// R,S,T
						[0.3,3.8,0],[0.5,3.8,0],[0.5,4,0],
						// U,V
						[0.7,4,0],[0.7,this.hMaxColonna,0],
						// Superficie sopra
						[0,this.hMaxColonna,0],[0,this.hMaxColonna,0]
					];

	return ctPoints.map(function(item){ return item; });
};

ColonnaBalconcino.prototype.creaColonna = function(scaleFactorV, scaleFactorH) {
	scaleFactorV = scaleFactorV || 1;
	scaleFactorH = scaleFactorH || 1;

	// Punti controllo NUBS colonna
	var ctPoints = this.getColumnPoints();

	// Scala se necessario
	if ( scaleFactorV != 1 ) {
		ctPoints = PointUtils.scalaPunti(ctPoints, scaleFactorV);
	}

	// Metti punti in XZ
	ctPoints = PointUtils.ruotaPunti(ctPoints, PI/2, 0);
	var prof1 = CurveUtils.createS0NUBS(1, ctPoints, false);
	
	// Quadrato scala in XY
	var ctPointsQuadrato = [ [1,1,0],[1,1,0],[-1,1,0],[-1,-1,0],[1,-1,0],[1,1,0],[1,1,0] ];
	ctPointsQuadrato = PointUtils.scalaPunti(ctPointsQuadrato, this.fattoreScalaBase * scaleFactorH);
	var prof2 = NUBS(S1)(1)(CurveUtils.generateS0Knots(ctPointsQuadrato.length, 1))(ctPointsQuadrato);

	// Produttoria tra profili
	var mapProfileColonna = PROFILEPROD_SURFACE([prof1,prof2]);

	return MAP(mapProfileColonna)(CommonDomains.DIM2RP_DOMAIN);
};

// --------------------------

function PareteBalconcino(refToPatio) {
	this.refColonnaBalconcino = new ColonnaBalconcino();
	//
	this.spessoreParete = CommonParetiMeasure.spessoreParete;
	this.spessoreBordo = CommonParetiMeasure.spessoreBordo;
	this.larghezzaParete = CommonParetiMeasure.larghezzaParete;
	this.altezzaParete = 15.675;
	//
	this.centroParetiX = (this.larghezzaParete * 5) / 2;
	//
	this.refPatio = refToPatio;
};

PareteBalconcino.prototype.creafinestraBalconcino = ModuliPareti.prototype.creaFinestraPiccola;

PareteBalconcino.prototype.creaBalconcino = function() {
	var spessoreParete = CommonParetiMeasure.spessoreParete;
	var spessoreBordo = CommonParetiMeasure.spessoreBordo;
	var larghezzaParete = CommonParetiMeasure.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	var spessBalconcino = spessoreBordo*2;
	//
	var deltaBordo = 0.5;
	//
	var frameInternoH = 5;
	var frameInternoV = 10;
	var frameEsternoH = 7 - deltaBordo;
	var frameEsternoV = 12 - deltaBordo;
	var frameEsternoTV = 0;
	//
	var bordoH = 2 - deltaBordo;
	var bordoV = bordoH;
	//
	frameEsternoTV = bordoH;
	//
	var col_scalaV = 0.8;
	var col_scalaH = 0.7;
	//
	var colonnaScalata = this.refColonnaBalconcino.creaColonna(col_scalaV,col_scalaH);
	var traslazioneColonna = T([0])([1]);

	var insiemeColonne = STRUCT([
								colonnaScalata, traslazioneColonna,
								colonnaScalata, traslazioneColonna,
								colonnaScalata, traslazioneColonna,
								colonnaScalata, traslazioneColonna,
								colonnaScalata, traslazioneColonna,
								colonnaScalata
							]);

	var bordoFinestra = STRUCT([
							T([0,1])([larghezzaParete/2, -spessBalconcino]),
							T([0])([-(frameEsternoH+2*bordoH)/2])( CUBOID([frameEsternoH+2*bordoH,spessBalconcino,(2/3)*frameEsternoTV]) ),
							T([2])([(2/3)*frameEsternoTV]),
							T([0])([-(frameEsternoH+(4/3)*bordoH)/2])( CUBOID([frameEsternoH+(4/3)*bordoH,spessBalconcino,(1/3)*frameEsternoTV]) ),
							T([2])([(1/3)*frameEsternoTV]),
							T([0,1])([-frameInternoH/2,spessBalconcino])( insiemeColonne ),
							T([2])([col_scalaV*this.refColonnaBalconcino.hMaxColonna]),
							T([0])([-(frameEsternoH+(4/3)*bordoH)/2])( CUBOID([frameEsternoH+(4/3)*bordoH,spessBalconcino+0.1,(1/3)*frameEsternoTV]) )
						]);

	return bordoFinestra;
};

PareteBalconcino.prototype.creaPareteFinestraBalconcino = function() {
	var spessoreParete = CommonParetiMeasure.spessoreParete;
	var spessoreBordo = CommonParetiMeasure.spessoreBordo;
	var larghezzaParete = CommonParetiMeasure.larghezzaParete;
	var altezzaParete = this.altezzaParete;
	//
	var deltaBordo = 0.5;
	//
	var frameInternoH = 5;
	var frameInternoV = 10;
	var frameEsternoH = 7 - deltaBordo;
	var frameEsternoV = 12 - deltaBordo;
	var frameEsternoTV = 0;
	//
	var bordoH = 2 - deltaBordo;
	var bordoV = bordoH;
	//
	frameEsternoTV = bordoH;

	var modelloParete = STRUCT([ SIMPLEX_GRID( [[(larghezzaParete-frameInternoH)/2,-frameInternoH,(larghezzaParete-frameInternoH)/2],[spessoreParete],[altezzaParete]] ),
						  		 SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreParete],[frameEsternoTV,-(frameInternoV+bordoV),(altezzaParete-frameInternoV-frameEsternoTV-bordoV)]] )
						]);
	var bordoFinestra = STRUCT([ SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH-(bordoH*2))/2),bordoH,-frameInternoH,bordoH,-((larghezzaParete-frameInternoH-(bordoH*2))/2)],[spessoreBordo],[-frameEsternoTV,frameEsternoV+bordoV,-(altezzaParete-frameEsternoTV-frameEsternoV-bordoV)]] ),
								SIMPLEX_GRID( [[-((larghezzaParete-frameInternoH)/2),frameInternoH,-((larghezzaParete-frameInternoH)/2)],[spessoreBordo],[-frameEsternoTV,-bordoV,-frameInternoV,bordoV,-(altezzaParete-frameEsternoTV-(bordoV*2)-frameInternoV)]] )
						]);

	var posBordoFinestra = T([1])([-spessoreBordo])(bordoFinestra);
	//
	var balconcino = this.creaBalconcino();

	var finestraVetri = T([0,1,2])([(larghezzaParete-frameInternoH)/2,spessoreParete/2,frameEsternoTV])( 
							this.creafinestraBalconcino(frameInternoH, frameInternoV+bordoV) 
						);

	return STRUCT([ 
			COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete), 
			COLOR(ColoriProgetto.INTONACO_BORDI)(posBordoFinestra),
			COLOR(ColoriProgetto.INTONACO_BORDI)(balconcino),
			finestraVetri
			 ]);
};

PareteBalconcino.prototype.creaPareteLateraleBalconcino = function() {
	var spessoreParete = this.spessoreParete;
	var spessoreBordo = this.spessoreBordo;
	var larghezzaParete = spessoreParete + this.refPatio.lunghezzaPatioY
	var altezzaParete = this.altezzaParete;
	//

	var modelloParete = SIMPLEX_GRID( [[larghezzaParete],[spessoreParete],[altezzaParete]] );

	return STRUCT([ 
			COLOR(ColoriProgetto.INTONACO_BASE)(modelloParete), 
			]);
};

PareteBalconcino.prototype.creaParete = function() {
	var transRipeti = T([0])([this.larghezzaParete]);
	var pareteLateraleL = R([0,1])(PI/2)( this.creaPareteLateraleBalconcino() );
	var pareteLateraleR = S([0])([-1])( pareteLateraleL );

	var modelloFinale = STRUCT([
							pareteLateraleL,
							this.creaPareteFinestraBalconcino(), transRipeti,
							this.creaPareteFinestraBalconcino(), transRipeti,
							this.creaPareteFinestraBalconcino(), transRipeti,
							this.creaPareteFinestraBalconcino(), transRipeti,
							this.creaPareteFinestraBalconcino(), transRipeti,
							pareteLateraleR
					]);

	return T([0,1])([-this.centroParetiX,-this.spessoreParete])( modelloFinale );
};

// --------------------------

function FacciataCentrata() {
	this.refPatio = new Patio(); // centroPatioX
	this.refPareti = new ModuliPareti();
	this.refBalconcino = new PareteBalconcino(this.refPatio);

	this.fullColonnato = true;
};

FacciataCentrata.prototype.creaFacciata = function() {
	var finalModel = [];

	var pareteLateraleR = T([0,1])([this.refPatio.centroPatioX, this.refPatio.startPatio])( this.refPareti.pareteAltaFinestraPiccola()  );
	var pareteLateraleL = S([0])([-1])( pareteLateraleR );

	finalModel.push( this.refPatio.creaPatio(this.fullColonnato) );
	finalModel.push( pareteLateraleR );
	finalModel.push( pareteLateraleL );
	finalModel.push( T([2])([this.refPatio.altezzaSupCornicione])( this.refBalconcino.creaParete() ) );

	return STRUCT(finalModel);
};

// --------------------------

function Progetto() {
	this.refFacciata = new FacciataCentrata();
};

var createProfileNew = function() {
	var pbTest = new PareteBalconcino();
	DRAW( pbTest.creaPareteFinestraBalconcino() );
};


var runTest = function() {
	var p = new Progetto();
	DRAW( p.refFacciata.creaFacciata() );
	
	// var c = new Colonna();
	// DRAW(c.creaHalfCapitello());

	// var c = new ColonnaBalconcino();
	// DRAW( c.creaColonna() );

	// createProfileNew();
};

runTest();