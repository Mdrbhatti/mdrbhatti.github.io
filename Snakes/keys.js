//Keyhandlers to move snake
window.onkeydown = function(e){
    e = e || window.event;
    var code = e.keyCode;
    if ( code === 37 ) {
        // Left key
        if(head.vx==0){
            head.vx=-vl;
            head.vy=0;
        }
    } 
    else if ( code === 38 ) {
        // Up key
        if(head.vy==0){
            head.vy=-vl;
            head.vx=0;
        }
    } 
    else if ( code === 39 ) {
        // Right key
        if(head.vx==0){
            head.vx=vl;
            head.vy=0;
        }
    } 
    else if ( code === 40 ) {
        // Down key
        if(head.vy==0){
            head.vy=vl;
            head.vx=0;
        }
    }
};
