#version 300 es

// Attribute as input (in)
// to the Vertex Shader
// It will receive data from a buffer
// Missing values from the buffered array 
//are filled from the vector (0,0,0,1)

in vec4 a_position;
in vec2 a_uv;

uniform mat4 projectionMatrix;
uniform mat4 worldMatrix;

out vec2 uvCoord;

void main() {
// gl_Position is a special variable
// the Vertex Shader
// is responsible for setting it

uvCoord = a_uv;
mat4 matrix = projectionMatrix * worldMatrix;
gl_Position = matrix * a_position;

}