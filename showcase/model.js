/* Pedone */

!(function (exports){
	var sphereSurface = function (r) {  
	  var domain = DOMAIN([[0,PI], [0,2*PI]])([r*30,r*30*2]);
	  var mapping = function (p) {
		var u = p[0];
		var v = p[1];

		return [r * SIN(u) * COS(v), r * SIN(u) * SIN(v), r * COS(u)];
	  };

	  return MAP(mapping)(domain);
	};
	
	var ruotaPunti = function(pointList, angolo, asse) {
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

	var basicControlPoints = [];
	// Pre Base I
	basicControlPoints.push([[0,0.1,0],[2,0.1,0],[0,0,0],[0,0,0]]);
	// Pre Base II
	basicControlPoints.push([[2,0.1,0],[2.5,0,0],[0,-0.3,0],[1.7,0,0]]);
	// Base
	basicControlPoints.push([[2.5,0,0],[1.3,1,0],[0,3.8,0],[1,0,0]]);
	// Rigonfiamento sopra base I
	basicControlPoints.push([[1.3,1,0],[1.8,1.5,0],[1,0,0],[0,0.75,0]]);
	// Rigonfiamento sopra base II
	basicControlPoints.push([[1.8,1.5,0],[1.3,2,0],[0,0.75,0],[-1,0,0]]);
	// Salita su primo anello I
	basicControlPoints.push([[1.3,2,0],[0.9,2.3,0],[-1,0,0],[0,0.1,0]]);
	// Salita su primo anello II
	basicControlPoints.push([[0.9,2.3,0],[1.1,2.5,0],[0,0.1,0],[0.7,0,0]]);
	// primo anello
	basicControlPoints.push([[1.1,2.5,0],[1.1,2.6,0],[0.15,-0.05,0],[-0.15,-0.05,0]]);
	// Salita lunga I
	basicControlPoints.push([[1.1,2.6,0],[0.5,4,0],[-2,1,0],[0,0.5,0]]);
	// Salita lunga II
	basicControlPoints.push([[0.5,4,0],[1.5,5.4,0],[0,3,0],[1,0,0]]);
	// secondo anello
	basicControlPoints.push([[1.5,5.4,0],[1.5,5.55,0],[0.1,0,0],[-0.1,0,0]]);
	// Salita prima di sfera
	basicControlPoints.push([[1.5,5.55,0],[0.5,6.55,0],[-3,0,0],[0,0.1,0]]);
	
	// Funzione curva (o debug o la CUBIC)
	var HER0 = CUBIC_HERMITE(S0); // drawHermiteS0Curve;
	// Marrone pastello 152,118,84
	var COLMP = COLOR([152/255,118/255,84/255]);
	// Risoluzione di rotazione
	var resRot = 30;

	// muoviamo punti asse X
	var puntiAsseXZ = basicControlPoints.map(function(ptlist) {return ruotaPunti(ptlist,PI/2,0);});
	AA(HER0)(puntiAsseXZ);
	
	// Dominio
	// var domainSurface = DOMAIN([[0,1],[0,2*PI],[0,1]])([resRot,resRot,1]);
	var domainSurface = DOMAIN([[0,1],[0,2*PI]])([resRot,resRot]);
	
	// Generate hermits rotational surfaces
	var generatedHermitFunctions = AA(HER0)(puntiAsseXZ);
	var generatedRotationalSurfaces = AA(ROTATIONAL_SURFACE)(generatedHermitFunctions);
	var generatedSurfaces = CONS( AA(MAP)(generatedRotationalSurfaces) )(domainSurface);
	
	// Colora e genera superfici
	var structSuperfici = STRUCT(generatedSurfaces);
	// DRAW(COLMP(structSuperfici));
	
	// Sfera sopra
	var sphereTop = T([2])([6.55+0.5])(sphereSurface(1,10));
	// DRAW(COLMP(sphereTop));
	
	exports.scmodel = COLMP( STRUCT([structSuperfici,sphereTop]) );
}(this));