export const shaders = {
    noise: `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;

    float random (vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float r = random(st + u_time * 0.1);
        gl_FragColor = vec4(vec3(r * 0.2), 1.0); // Dark noise
    }
  `,

    scanline: `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float line = sin(st.y * 50.0 + u_time * 5.0);
        vec3 color = vec3(0.0, 0.8, 0.2) * line; // Green scanlines
        gl_FragColor = vec4(color, 1.0);
    }
  `,

    matrix: `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.x *= 20.0; // Columns
        vec2 ipos = floor(st);
        vec2 fpos = fract(st);

        float r = random(ipos);
        float drop = fract(r * 10.0 + u_time * (0.5 + r));
        
        float bright = step(0.95, 1.0 - abs(fpos.y - drop));
        vec3 color = vec3(0.0, bright, 0.0);

        gl_FragColor = vec4(color, 1.0);
    }
  `,

    plasma: `
    precision mediump float;
    uniform float u_time;
    uniform vec2 u_resolution;

    void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        float v = sin(st.x * 10.0 + u_time) + sin(st.y * 10.0 + u_time) + sin((st.x + st.y) * 10.0 + u_time);
        vec3 color = vec3(sin(v), sin(v + 1.0), sin(v + 2.0));
        gl_FragColor = vec4(color * 0.5, 1.0);
    }
  `
};
