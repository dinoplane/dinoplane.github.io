---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "AlienVulkanEngine: Devlog 1"
subtitle: ""
summary: "A game engine created with C++ and Vulkan"
authors: ["Arrian Chi"]
tags: []
categories: []
date: 2024-01-22T08:54:18-07:00
lastmod: 2024-01-22T08:54:18-07:00
featured: true
draft: true

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ""
  focal_point: ""
  preview_only: true

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
---

[Link to the project here](https://github.com/dinoplane/vulkangameengine)


## Introduction

So, I've worked with graphics APIS like WebGL, OpenGL, and Three.js and many game engines like Unity and Unreal. I wanted to learn even more about the nitty gritty of graphics and GPUs so I decided to pursue Vulkan.

First things first, I have been following a couple tutorials to supplement my learning.
We have:

- [The Vulkan Game Engine Tutorials](https://www.youtube.com/playlist?list=PL8327DO66nu9qYVKLDmdLW_84-yE4auCR)
- [The official Vulkan Tutorial](https://docs.vulkan.org/tutorial/latest/00_Introduction.html) adapted from [The Vulkan Tutorial](https://vulkan-tutorial.com/)
- [The Vulkan Programming Guide](https://www.amazon.com/Vulkan-Programming-Guide-Official-Learning/dp/0134464540)

I've mostly been going through the tutorial and following the coding, and referring to the other resources when I need to. I know and feel like I am just slapping a alien over the tutorial right now (but it can't be helped I gotta learn). I hope to integrate either the ray tracing project or the boids project into my game engine (or maybe even combining the two?!). But first I must complete a significant number of tutorials...

The following will be a scratchpad for my thoughts on how Vulkan works since this is the first checkpoint, connecting each of the components I have learned up to now.

## Differences between OpenGL and Vulkan

#### To draw a triangle in OpenGL
1. Set up a GLFW Window
2. Load in all of the OpenGL function pointers
3. Create, read, compile, and link your vertex and fragment shaders.
4. Load all required textures.
5. Initialize your geometry
  a. Generate vertex array and associated vertex and index buffers.
  b. Calculate the vertices of your solid.
  c. Bind and set your vertex array and buffers.
  d. Configure your vertex attributes.
6. Apply necessary transformations to the geometry (aka multiply transformation matrix to model transform and supply resultant matrix to shaders as a uniform).
7. Render your geometry.
  a. Bind the necessary vertex array.
  b. Draw call (GPU executes shaders going to the graphics rendering pipeline).
8. Repeat until prompted not to.


#### To draw a triangle in Vulkan
- Set up a GLFW Window
-


#### The graphics rendering pipeline stages
1. Application
  - Generates rendering primitives (points, lines, triangles)
2. Geometry Processing
  a. Vertex Shader
    - compute the position of the vertex.
      - Model space * model transform -> world space * view transform -> view space(camera at origin)
    - calculate extra vertex output data like color (shading)
  b. Projection
    - transform view volume into unit cube
      - ortho (prism to cube)
      - persp (frustrum to cube)
      - projection matrix transforms scene into clip space
  c. Clipping
    - include primitives inside canonical view volume
    - clip objects that are partially inside
  d. Screen Mapping
    - map clip coords into screen coords mapped onto window coords
3. Rasterization
  - Find all pixels in primitive
4. Pixel processing
  a. Pixel Shading
    - per pixel computations
    - outputs stored onto frame buffer
  b. Merging
    - blend color in buffer with that on the screen.
    - handles z-buffering



  - Alien