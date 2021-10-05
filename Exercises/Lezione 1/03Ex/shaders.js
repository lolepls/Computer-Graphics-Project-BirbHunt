var vertexShaderSource = `#version 300 es
in vec4 a_position;
out vec2 rg_coordinates;

void main() {
  rg_coordinates = a_position.rg;
  gl_Position = a_position;
}`;

var fragmentShaderSource = `#version 300 es
precision mediump float;

in vec2 rg_coordinates;
out vec4 outColor;

void main() {

  outColor = vec4(rg_coordinates.r, rg_coordinates.g, 0.0, 1.0);
}`;