var vertexShaderSource = `#version 300 es
in vec4 a_position;

void main() {
  gl_Position = a_position;
}`;

var fragmentShaderSource = `#version 300 es
precision mediump float;
uniform float radians_over_time;
out vec4 outColor;

void main() {

  float red = sin(radians_over_time);

  if(red < 0.0){
    red = -red;
  }

  outColor = vec4(red, 0.0, 0.0, 1.0);
}`;