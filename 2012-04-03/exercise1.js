var drawGrid = function(startX, endX, startY, endY) {
  var points = [];
  var i = startX;
  for (i = startX; i <= endX; i++) {
    if (( i % 2 ) == 0 ) {
      points.push([i, startY]);
      points.push([i, endY]);
    } else {
      points.push([i, endY]);
      points.push([i, startY]);
    }
  }
  
  var gridX = POLYLINE(points);
  points = [];

  for (i = startY; i <= endY; i++) {
    if (( i % 2 ) == 0 ) {
      points.push([startX, i]);
      points.push([endX, i]);
    } else {
      points.push([endX, i]);
      points.push([startX, i]);
    }
  }

  var gridY = POLYLINE(points);
  
  var grigliaComplessiva = STRUCT([gridX,gridY]);
  DRAW(grigliaComplessiva);

  return grigliaComplessiva;
};


var finalStruct = []
finalStruct.push( drawGrid(0,39,0,1) ); // riga sotto
finalStruct.push( drawGrid(0,1,0,2) ); // riga verticale vicino piscina grossa
finalStruct.push( drawGrid(20,36,1,17) ); // tra piscina e gradini
finalStruct.push( drawGrid(1,20,10,17) ); // tra piscina e promontorio nord
finalStruct.push( drawGrid(1,9,17,22) ); // promontorio nord
finalStruct.push( drawGrid(36,39,4,17) ); // sopra gradino, prima promontorio west
finalStruct.push( drawGrid(39,47,4,16) ); // promontorio west
finalStruct.push( drawGrid(47,52,4,5) ); // passerella west piscina
finalStruct.push( drawGrid(51,52,5,6) ); // passerella west piscina-1


DRAW(STRUCT(finalStruct));
