/**
 * Created by oded on 21/06/2014.
 */
define('view',
    ['model'], function(model) {
        var canvas,
            context,
            angleInRadians,
            currentPosition = {x: 0, y: 0, angle: Math.PI/2};

        return {
            init: function (){
                canvas = document.getElementsByTagName('canvas')[0];
                canvas.width  = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
                context = canvas.getContext("2d");
                context.strokeStyle = model.color;
                context.lineWidth = 1;
                angleInRadians =  model.angle * Math.PI / 180;

                context.clearRect(0, 0, canvas.width, canvas.height);
                context.scale(model.scale, model.scale);
                currentPosition.x = 0;
                currentPosition.y = context.canvas.height / (2 * model.scale);
                currentPosition.angle = Math.PI/2;
                context.beginPath();
            },

            lineForward: function(){
                currentPosition.x = currentPosition.x + Math.sin(currentPosition.angle) * model.segmentLength;
                currentPosition.y = currentPosition.y + Math.cos(currentPosition.angle) * model.segmentLength;
                context.lineTo(currentPosition.x, currentPosition.y);
                context.stroke();
            },
            rotate: function(clockwise){
                currentPosition.angle += clockwise ? angleInRadians : -angleInRadians;
            },
            moveToPosition: function(position){
                currentPosition = position;
                context.moveTo(position.x, position.y);
            },
            getCurrentPosition: function(){
                return {x: currentPosition.x, y:currentPosition.y, angle: currentPosition.angle};
            }
        }
    });