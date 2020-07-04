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
                            radius: Math.abs(random.gaussian()) * 0.0001,
                        }
                    );
                }
            }
            return points;
        }
        // random.setSeed('yes');
        const points = createGrid(5, 50)
        // .filter(() => random.value() > 0.5);

        const margin = 300;


        return ({context, width, height}) => {
            // context.fillStyle = '#cefffd';
            context.fillStyle = '#202023';
            context.fillRect(0, 0, width, height);


            points.forEach(data => {
                const {position, radius} = data;

                const [u, v] = position;

                const x = lerp(margin, height - margin, u);

                const y = lerp(margin, width - margin, v);

                if (Math.abs(u - v) > (1 / (Math.abs(u - .5))) * 0.01) {

                    context.beginPath();
                    context.arc(x, y, 1, 0, Math.PI * 2, false);
                    context.strokeStyle = 'white';
                    context.lineWidth = 3000;
                    context.stroke();
                    context.closePath();
                }
            });

            context.fillRect(width/2, height/2, 580, 600);
            context.strokeStyle = 'white';
            context.lineWidth = 500;
            context.stroke();
        };
    }
;

// canvasSketch(sketch, settings);
