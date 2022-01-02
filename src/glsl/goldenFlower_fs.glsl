#version 300 es

precision mediump float;

out vec4 outColor;
in vec2 uvCoord;


in vec3 fs_norm; // normal received by the vertex shader
uniform sampler2D u_texture;

uniform vec3 directLightDirection; // Direction of the direct light source (0.0, 1.0, 0.0)
uniform vec3 directLightColor; // Color of the direct light source (1.0, 1.0, 1.0)

uniform vec3 upHemisphericLightColor; // Up color for the hemispheric ambient light model (0.910, 0.949, 0.992)
uniform vec3 downHemisphericLightColor; // Down color for the hemispheric ambient light model (0.482, 0.792, 0.361)
uniform vec3 dVector; //Vector d for the hemispheric ambient model (0.0, 1.0, 0.0);
uniform vec3 observerDirection;

void main() {

// Set the output color. The model used here is the single direct light + hemispherical light from
// the evnironment + the reflection term.

// Getting the color from the texture:
vec4 pixelColor4 = texture(u_texture, uvCoord);
vec3 pixelColor = pixelColor4.rgb;

//Normalizing the normal:
vec3 nNormal = normalize(fs_norm);

//Computing direct light contribution with Lambert model:
vec3 directLightDirNorm = normalize(directLightDirection);
vec3 directLightColorContribution = pixelColor * directLightColor * 
                                clamp(dot(directLightDirNorm, nNormal), 0.0, 1.0);

//Computing the hemispheric ambient contribution:
float nd = dot(nNormal, dVector);
vec3 hemisphericLightColorContribution = (

((nd+1.0)/2.0)*upHemisphericLightColor 
+
((1.0-nd)/2.0)*downHemisphericLightColor
)*pixelColor;

// Computing the reflection term:
vec3 reflectionV = -reflect(directLightDirNorm, nNormal);
vec3 specularLight = pixelColor * pow(clamp(dot(observerDirection, reflectionV), 0.0, 1.0), 800.0);

// Computing the final light as the sum of the three contributions:
vec3 finalLight = directLightColorContribution + hemisphericLightColorContribution + specularLight;

//Out:
outColor = vec4(finalLight, 1.0);

}