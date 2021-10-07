#version 300 es

// Attribute as input (in)
// to the Vertex Shader
// It will receive data from a buffer
// Missing values from the buffered array 
//are filled from the vector (0,0,0,1)

in vec4 a_position;


void main() {
// gl_Position is a special variable
// the Vertex Shader
// is responsible for setting it
gl_Position = a_position;

}