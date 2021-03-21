//takes an array of points as argument to the function
function draw(points) {
    const canvas = document.querySelector('#canvas');

    if (!canvas.getContext) {
        return;
    }
    const ctx = canvas.getContext('2d');

    // set line stroke and line width
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;

    // draw a red line
/**
    ctx.beginPath();
    ctx.moveTo(100, 15000);
    ctx.lineTo(300, 100);
    ctx.stroke();
*/
    for (i = 0; i < points.length-1; points++) {
        ctx.beginPath(),
        ctx.moveTo(points[i]['x'], points[i]['y']);
        ctx.lineTo(points[i+1]['x'], points[i+1]['y']);
        ctx.stroke();
    }

}
//old draw call
//draw();

//new draw call
draw(
    [
        {x: 1, y: 2},
        {x: 2, y: 3}
    ]
)

function drawLine(ctx, begin, end, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

