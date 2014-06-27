/**
 * Created by oded on 21/06/2014.
 */
define('processor',
    ['model','view'], function(model, view) {
        var
            shouldStop,
            currentInstructionIndex,
            positionStack = [],
            expression,
            minX = undefined, maxX = undefined, minY = undefined, maxY = undefined,
                computeExpression = function(system, n) {
                var result = '';
                var exp = system.start;
                for (var i=0; i<n; i++){
                    for (var j=0; j<exp.length; j++){
                        var c = exp[j];
                        result += system.rules[c] ? system.rules[c] : c;
                    }
                    exp = result;
                    result = '';
                }
                return exp;
            },
            drawExpression = function (){

                if (shouldStop) {
                    return;
                }
                var currentPosition = view.getCurrentPosition();
                maxX = maxX == undefined ? currentPosition.x : Math.max(maxX, currentPosition.x);
                minX = minX == undefined ? currentPosition.x : Math.min(minX, currentPosition.x);
                maxY = maxY == undefined ? currentPosition.y : Math.max(maxY, currentPosition.y);
                minY = minY == undefined ? currentPosition.y : Math.min(minY, currentPosition.y);
                while (!processInstruction(expression[currentInstructionIndex]) && currentInstructionIndex < expression.length){
                    currentInstructionIndex++;
                }
                if (currentInstructionIndex >= expression.length){
                    finished();
                }
                else{
                    currentInstructionIndex++;
                    requestAnimationFrame(drawExpression);
//                    drawExpression();
                }
            },
            finished = function(){
//                console.log(minX+','+minY+','+(maxX-minX)+','+(maxY-minY));
//                console.timeEnd('draw');
            },
            processInstruction= function(instruction){
                switch(instruction){
                    case 'F':
                        view.lineForward();
                        return true;
                    case '+':
                        view.rotate(true);
                        break;
                    case '-':
                        view.rotate(false);
                        break;
                    case '[':
                        positionStack.push(view.getCurrentPosition());
                        break;
                    case ']':
                        view.moveToPosition(positionStack.pop());
                        break;
                }
                return false;

            };
        return {

            start: function(){
                expression = computeExpression(model.system, model.iterations);
                view.init();
                currentInstructionIndex = 0;
                shouldStop = false;
                console.time('draw');
                drawExpression();
            }
        }
    });

//424,101.20018504813585,755,744.7818472546196
//283647.000ms
//281235.000ms
//283130.000ms