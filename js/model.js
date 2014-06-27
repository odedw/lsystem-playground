/**
 * Created by oded on 21/06/2014.
 */
define('model',
    [], function() {
        var systems = [
                {
                    name: "Fractal Plant",
                    size: {width: 804, height: 605},
                    iterations: 6,
                    startingPosition:{x:0,y:0.5},
                    start: 'X',
                    angle:25,
                    segmentLength:5,
                    rules: {
                        'F': 'FF',
                        'X': 'F-[[X]+X]+F[+FX]-X'
                    }
                },
                {
                    name: "Hilbert",
                    size: {width: 441, height: 441},
                    iterations: 6,
                    startingPosition:{x:0.3, y:0.15},
                    start: 'X',
                    angle:90,
                    segmentLength:7,
                    rules: {
                        X : '-YF+XFX+FY-',
                        Y : '+XF-YFY-FX+'
                    }
                },
                {
                    name: "Peano-Gosper",
                    size: {width: 755, height: 745},
                    iterations: 5,
                    startingPosition:{x:0.8,y:0.9},
                    start: 'X',
                    angle:60,
                    segmentLength:5,
                    rules: {
                        X : 'X+YF++YF-FX--FXFX-YF+',
                        Y : '-FX+YFYF++YF+FX--FX-Y'
                    }
                },
                {
                    name: "Sierpinski Triangle",
                    size: {width: 637.5, height: 549.9261314031207},
                    iterations: 7,
                    startingPosition:{x:0.2,y:0.9},
                    start: 'X',
                    angle:60,
                    segmentLength:5,
                    rules: {
                        X : 'YF+XF+Y',
                        Y : 'XF-YF-X'
                    }
                },
                {
                    name: "Levy C Curve",
                    size: {width: 898.0256121069215, height: 558.6143571373735},
                    iterations: 13,
                    startingPosition:{x:0.4,y:0.5},
                    start: 'F',
                    angle:45,
                    segmentLength:5,
                    rules: {
                        F:'+F--F+'
                    }
                },
                {
                    name: "Circle",
                    size: {width: 455.7452467635099, height: 455.7452467635099},
                    iterations: 6,
                    startingPosition:{x:0.5,y:0.5},
                    start: 'X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X+X',
                    angle:15,
                    segmentLength:10,
                    rules: {
                        X : "[F+F+F+F[---X-Y]+++++F++++++++F-F-F-F]",
                        Y : "[F+F+F+F[---Y]+++++F++++++++F-F-F-F]"
                    }
                },
            ],
            currentSystem = systems[2];
        return{
            color: '#fff',
            angle: currentSystem.angle,
            segmentLength:  currentSystem.segmentLength,
            iterations:  currentSystem.iterations,
            scale: 1,
            startingPosition:currentSystem.startingPosition,
            system: currentSystem
        }

    });