const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

export const settings = {
    dimensions: [2048, 2048]
};

const sketch = async () => {
        const colors = [];

        function componentToHex(c) {
            var hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        var url = "http://colormind.io/api/";
        var data = {
            model: "default"
        }

        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                json.result.forEach(color => {
                    colors.push(rgbToHex(...color));
                });
                random.shuffle(colors);
                console.log(colors);

            })

        const createGrid = (cols, rows) => {
            const points = [];
            const frequency = 2;
            for (let x = 0; x < cols; x++) {
                for (let y = 0; y < rows; y++) {
                    const u = x / (cols - 1);
                    const v = y / (rows - 1);
                    points.push({
                            position: [u, v],
                            radius: Math.abs(random.noise2D(u * frequency, v * frequency)) * 0.08,
                            rotation: random.noise2D(u * frequency, v * frequency),
                        }
                    );
                }
            }
            return points;
        }
        random.setSeed(random.getRandomSeed());
        console.log('seed', random);
        const points = createGrid(50, 50)
        // .filter(() => random.value() > 0.5);

        const margin = 300;


        return ({context, width, height}) => {
            context.fillStyle = '#202023';
            context.fillRect(0, 0, width, height);


            points.forEach(data => {

                const {position, radius, rotation} = data;
                const [u, v] = position;

                const x = lerp(margin, height - margin, u);
                const y = lerp(margin, width - margin, v);

                // context.beginPath();
                // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
                // context.strokeStyle = 'white';
                context.save();
                context.fillStyle = colors[Math.floor(Math.random() * 5)];
                context.font = `${radius * width}px Arial`;
                context.translate (x, y);
                context.rotate(rotation);
                context.fillText('_', 0, 0);
                // context.lineWidth = radius * 1000;
                context.restore();
            });
        };
    }
;

canvasSketch(sketch, settings);
