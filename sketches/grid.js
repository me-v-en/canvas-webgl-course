
const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

export const settings = {
    dimensions: [2048, 2048]
};

export const sketch = () => {

        const createGrid = (cols, rows) => {
            const points = [];
            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    const u = x / (cols - 1);
                    const v = y / (rows - 1);
                    points.push({
                            position: [u, v],
                            radius: Math.pow(Math.abs(random.gaussian()), 4) * 0.005,
                        }
                    );
                }
            }
            return points;
        }
        // random.setSeed('yes');
        const points = createGrid(20, 10)
        // .filter(() => random.value() > 0.5);

        const margin = 300;


        return ({context, width, height}) => {
            // context.fillStyle = '#cefffd';
            context.fillStyle = '#202023';
            context.fillRect(0, 0, width, height);

            const functionGraph = (u, v) => {
                // |Sin(xx)/2(xx-pi/2)/pi|

                return Math.abs(
                    Math.sin(u * u)
                    /
                    (
                        Math.pow(2, (u * u - Math.PI / 2) / Math.PI)
                    )
                )
            }

            points.forEach(data => {
                // const radiusTest = 10;

                const {position, radius} = data;
                const [u, v] = position;

                const x = lerp(margin, height - margin, u);

                const y = lerp(margin, width - margin, v);

                if (Math.abs(u - v) > (1 / (Math.abs(u - .5))) * 0.01) {
                    // if (Math.abs(u - v) > (functionGraph(u*3,v))) {
                    //     context.strokeStyle = 'white';
                    // }
                    // else{
                    //     context.strokeStyle = '#ff0000';
                    // }
                    context.beginPath();
                    context.arc(x, y, radius * width, 0, Math.PI * 2, false);
                    // context.strokeStyle = '#ee9494';
                    context.strokeStyle = 'white';

                    context.lineWidth = radius * radius *100;
                    // context.lineWidth = 10;
                    // context.fillStyl e = '#a4fdf7';
                    // context.fillStyle = 'white';
                    // context.fillStyle = 'red';
                    context.stroke();
                    // context.fill();
                }
            });
        };
    }
;

// canvasSketch(sketch, settings);
