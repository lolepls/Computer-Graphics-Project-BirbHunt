#version 300 es

// Attribute as input (in)
// to the Vertex Shader
// It will receive data from a buffer
// Missing values from the buffered array 
//are filled from the vector (0,0,0,1)

in vec4 a_position;
in vec2 a_uv;
in vec3 a_norm;

uniform mat4 projectionMatrix;
uniform mat4 worldMatrix;
uniform mat4 nMatrix;

out vec2 uvCoord;
out vec3 fs_norm;

void main() {

uvCoord = a_uv;
fs_norm = mat3(nMatrix) * a_norm; 

mat4 matrix = projectionMatrix * worldMatrix;
gl_Position = matrix * a_position;

}