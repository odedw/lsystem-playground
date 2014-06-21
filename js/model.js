/**
 * Created by oded on 21/06/2014.
 */
define('model',
    [], function() {
        return{
            color: '#fff',
            angle: 25,
            segmentLength:  5,
            iterations:  6,
            scale: 1,
            system: {
                start: 'X',
                rules: {
                    'F': 'FF',
                    'X': 'F-[[X]+X]+F[+FX]-X'
                }
            },
            startingPosition:{x:0,y:0}
        }

    });