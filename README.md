# Computer Graphics Project - Golden Flower Hunt

This is a project developed for the course of Computer Graphics, held by Professor Marco Gribaudo at Politecnico di Milano.
The project focuses on the implementation of the concepts seen during the course, heavily based on the **low-level interaction 
part** required to manage 3D applications on modern computers.
The aim of the course was **not to introduce 3D computer graphic as product of engines such Unity and Unreal, but to explain how
such tools are able to produce realistic 3D graphics**.

# Project specification

The goal was to develop a 3D game where you can explore the environment until you find the hidden golden flower. 
I had to implement a First-person camera, so that it must be possible to move around the environment with keyboard keys and
finish the game once getting close enough to the flower.

The project must be done in HTML-5, using Web-GL 2.0
 
I was allowed to use third party libraries and helpers such as TWGL.js, but not complete 3D 
engines, such as Three.js, Babilon.js or A-Frame. The code needed to have sections where: it 
explicitly loads the geometries and the textures, sets the shaders (which must be written by 
yourself), sets the vertex formats and the uniforms, and where draw-call are used to finally show 
the scene on screen.
Assets were given by Professors.

# Structure of the code

The code is quite commented and quite easy to read. I suggest to start from the "main" function and then work your way
across various .js files.
The code is done in such a way that *it is easy to insert new assets, textures and models*, and also you can easily 
edit the world and set the environment as you like.

Speaking about computer graphics, each model in the world shares the same shader, except from the terrain tiles, 
the golden flower (which has a Phong reflection term) and the skybox. The rest of the code is quite verbose because
of GLSL without any external library.

# Playing the game

Set up a local server with xampp and run "index.html" in the src folder. Then you can move around with WASD. Find the hidden golden flower!

