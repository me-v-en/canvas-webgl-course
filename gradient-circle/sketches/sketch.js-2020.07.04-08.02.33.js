const canvasSketch = require('canvas-sketch');



const settings = {
    dimensions: [2048, 2048]
    // dimensions: "A4"
};

const sketch = () => {
    return ({context, width, height}) => {
        const color1 = '#fa8282';
        const color2 = '#a5d5de';

        const gradient = context.createLinearGradient(0, 0, 2048, 2048);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        const gradientReverse = context.createLinearGradient(0, 0, 2048, 2048);
        gradientReverse.addColorStop(0, color2);
        gradientReverse.addColorStop(1, color1);


        // context.fillStyle = '#cae6ec';
        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        // BIG CIRCLE
        const mdLine =300;
        const radius = 1000;


        context.beginPath();
        context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false);

        context.strokeStyle = gradientReverse;
        context.lineWidth = mdLine;
        context.stroke();

        //SHORT CIRCLES
        const smLine =100;

        context.beginPath();
        context.arc(width / 2, height / 2, radius + (smLine + mdLine) / 2, 0, Math.PI * 2, false);

        context.strokeStyle = 'white';
        context.lineWidth = smLine;
        context.stroke();

        context.beginPath();
        context.arc(width / 2, height / 2, radius - (smLine + mdLine) / 2, 0, Math.PI * 2, false);
        context.stroke();
    };
};

canvasSketch(sketch, settings);
