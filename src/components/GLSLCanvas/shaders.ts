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

    // 3D Simplex Noise
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise3(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);

        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;

        i = mod289(i);
        vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));

        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);

        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);

        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    // 3D Fractal Brownian Motion
    float fbm3(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        for (int i = 0; i < 5; i++) {
            value += amplitude * snoise3(p * frequency);
            frequency *= 2.0;
            amplitude *= 0.5;
        }
        return value;
    }

    void main() {
        // ========== TUNABLE PARAMETERS ==========
        float NOISE_SCALE = 0.5;        // Pattern density (higher = finer)
        float TIME_SPEED = 0.05;        // Animation speed (higher = faster)
        float DISTORTION_STRENGTH = 1.0; // Warping intensity
        // =========================================
        
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv.x *= u_resolution.x / u_resolution.y;
        
        float t = u_time * TIME_SPEED;
        
        // Use 3D noise with time as Z axis - no sliding, just evolution
        vec3 p = vec3(uv * NOISE_SCALE, t);
        
        // Layered distortion using 3D noise
        float q = fbm3(p);
        float r = fbm3(p + vec3(q, q * 0.5, 0.0) * DISTORTION_STRENGTH + vec3(1.7, 9.2, 0.0));
        float f = fbm3(p + vec3(r * 2.0, r * 1.5, 0.0) * DISTORTION_STRENGTH);
        
        // Color palette: purple, orange, black
        vec3 purple = vec3(0.45, 0.2, 0.85);
        vec3 orange = vec3(1.0, 0.55, 0.3);
        vec3 pink = vec3(0.95, 0.7, 0.75);
        vec3 black = vec3(0.02);
        
        // Mix colors based on flow
        vec3 color = black;
        color = mix(color, purple, smoothstep(-0.5, 0.3, f));
        color = mix(color, orange, smoothstep(0.1, 0.6, f + q * 0.3));
        color = mix(color, pink, smoothstep(0.5, 0.9, f + r * 0.2));
        
        // Add sparkles/stars
        float stars = step(0.997, fract(sin(dot(floor(gl_FragCoord.xy * 0.5), vec2(12.9898, 78.233))) * 43758.5453));
        color += vec3(stars * 0.8);
        
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
        
        // Alpha based on brightness for additive blending
        float alpha = bright;

        gl_FragColor = vec4(color, alpha);
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
