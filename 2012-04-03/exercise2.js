var altezzaBase = 1.72;
var altezzaMuri = 4;
var ssMuro = 0.2;
var ssMuroLisci = 0.1;

var baseStruttura = [];
baseStruttura.push( SIMPLEX_GRID([[1],[2],[altezzaBase]]) ); // 2 blocchi prima piscina
baseStruttura.push( SIMPLEX_GRID([[-1,21],[1,-9,7],[altezzaBase]]) ); // settore piscina
baseStruttura.push( T([0])([22])(SIMPLEX_GRID([[15],[17],[altezzaBase]])) ); // corpo tra piscina e scalini
baseStruttura.push( T([0])([37])(SIMPLEX_GRID([[3],[1],[altezzaBase]])) ); // prot scalini
baseStruttura.push( T([0,1])([37,4])(SIMPLEX_GRID([[3],[13],[altezzaBase]])) ); // corpo scalini e nord
baseStruttura.push( T([0,1])([40,4])(SIMPLEX_GRID([[8],[12],[altezzaBase]])) ); // corpo tra prima e pool dopo
baseStruttura.push( T([0,1])([47,4])(SIMPLEX_GRID([[5],[1],[altezzaBase]])) ); // protuberanza piscina nord
baseStruttura.push( T([0,1])([51,5])(SIMPLEX_GRID([[1],[1],[altezzaBase]])) ); // protuberanza piscina nord alto
baseStruttura.push( T([0,1])([1,17])(SIMPLEX_GRID([[8],[5],[altezzaBase]])) ); // promontorio nord
baseStruttura = STRUCT(baseStruttura);


var muriStrutturaGrossi = [];
// Piscina grossa + promontorio nord
muriStrutturaGrossi.push( T([0])([1-ssMuro])(SIMPLEX_GRID([[ssMuro],[-1,21],[altezzaBase+altezzaMuri]])) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(1-ssMuro),7+ssMuro],[-(1-ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(1-ssMuro),8+ssMuro+ssMuro],[-(21+1-ssMuro), ssMuro],[altezzaBase+altezzaMuri]]) );
muriStrutturaGrossi.push( SIMPLEX_GRID([[-9, ssMuro],[-(16+1-ssMuro), 5],[altezzaBase+altezzaMuri]]) );
// Muro sopra piscina grossa
muriStrutturaGrossi.push( SIMPLEX_GRID([[-7.5, 19],[-15, ssMuro],[-altezzaBase,altezzaMuri]]) );
// Muro destra piscina grossa
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(25+ssMuro), 7 + (3-ssMuro)],[-(7+ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );
// Muro sinistra piscinetta
muriStrutturaGrossi.push( SIMPLEX_GRID([[-(37+ssMuro), 4 + (1-ssMuro)+0.5],[-(11+ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );
// Piscina piccola
muriStrutturaGrossi.push( SIMPLEX_GRID([[-41.5, 0.5+9+ssMuro],[-(5-ssMuro), ssMuro],[-altezzaBase,altezzaMuri]]) );



muriStrutturaGrossi = STRUCT(muriStrutturaGrossi);


DRAW(STRUCT([baseStruttura,muriStrutturaGrossi]));

