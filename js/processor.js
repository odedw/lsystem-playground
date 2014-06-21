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
                var inst = expression[currentInstructionIndex];
                var shouldRequestFrame = processInstruction(inst);
                currentInstructionIndex++;
                if (shouldRequestFrame){
                    requestAnimationFrame(drawExpression);
                }
                else {
                    drawExpression();
                }

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

                drawExpression();
            }
        }
    });