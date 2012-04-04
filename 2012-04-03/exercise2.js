
var altezzaBase = 1.72;

var baseStruttura = [];
baseStruttura.push( SIMPLEX_GRID([[1],[2],[altezzaBase]]) ); // settore piscina
baseStruttura.push( SIMPLEX_GRID([[-1,21],[1,-10,17],[altezzaBase]]) ); // 2 blocchi prima piscina
baseStruttura.push( T([0])([21])SIMPLEX_GRID([[15],[17],[altezzaBase]]) ); // corpo tra piscina e scalini

DRAW(STRUCT(baseStruttura));
