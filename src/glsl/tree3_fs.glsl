#version 300 es

// Fragment shaders requires the float 
// precision. mediump is a good default. 
// It means "medium precision"
precision mediump float;

// Output for the Fragment Shader = colour
//of the pixel
out vec4 outColor;
in vec2 uvCoord;

uniform sampler2D u_texture;

void main() {
// Set the output to the textures
outColor = texture(u_texture, uvCoord);
}