---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "GLboids: Devlog 0"
subtitle: ""
summary: "An OpenGL boid simulation I started in the middle of summer break. Status: Looking pretty solid for a prototype"
authors: []
tags: []
categories: []
date: 2023-09-14T08:54:18-07:00
lastmod: 2023-09-14T08:54:18-07:00
featured: false
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

{{< video src="singlethreaded.mp4" controls="yes" >}}

[Link to the project here](https://github.com/dinoplane/flocking)

My first ever devlog!

So to start, the motivation of this project. To put it simply, I wanted to find a way to integrate multithreading, graphics, and artificial intelligence in a project together. Thus, the I believed the best way to integrate all these together is through (another boids project).

But why now, two weeks before the start of the quarter? First off, I have always wanted to make another boids simulation after the one I created last year, but never had the time. Second, I wanted to make a project in OpenGL (and I learned that setting up OpenGL is a significant phase). Third, I want to prove to myself I can apply all the skills I learned in my undergraduate career.

Now that all the background is down, I will now explain the technical accomplishments of this first checkpoint.

1. Setting up a simple OpenGL project template: This was quite tedious, even though I am using linux. I had to learn how CMake works (still rusty) and how to include all the files and dependencies. I also learned that OpenGL leverages many libraries such as GLM (the GL mathematics library), GLFW (the windowing manager library), and stb_image (an image loader).

2. Rendering the 3D objects while maintaining modularity: It is in the low level nature of the OpenGL API that feeding the vertex positions, the colors, and the uv coordinates into the shaders must be done in the correct sequential order. In order to do this, I looked at the LearnOpenGL website and my Blocky Clown project to modularize the camera, shaders, and the geometric solids (the cube and the pyramid). To get the boids to point the right way, I applied an inversed lookat transformation(use what you already have!) to the rotation and scale(to make them look like boids).

3. Debugging the behaviors: I picked up 3 key lessons when debugging.

Lesson 1: **When one must maintain a global list of objects, always consider the [rule of five](https://en.cppreference.com/w/cpp/language/rule_of_three)**. When debugging the separation behavior, I found that the returned list of boids was according to the initial positions of the boids, even though the boids had the correct positions. This happened because the the copy constructor was called when the boids when the boids were initialized and these copies were added tp the global boid vector. The function that finds the boids in range uses this data structure, thus using the wrong unupdated values. The fix was quite simple: use pointers to avoid copying the objects directly.

Lesson 2: **Ensure all values that depend on the values on the same previous frame to update at the same time.** This should be a nobrainer, but I missed this when I was calculating the forces and updating the positions in the same loop. So every boid updates their position according to an incomplete "future" state. The fix was also quite simple for this one: Divide the force calculation step and the update position step and keep them in separate loops.

Lesson 3: **Sometimes its better to reduce the problem size to simplify it and use previous solutions to verify it.** Amidst all these bugs, debugging in 3 dimensions is especially hard since one must consider the third dimension (for me it was y). So I decided to reduce the model down 1 dimension (just zero the y-force and initialize y-velocity as 0). Using the 2D simulation as a model (the bat one I made an year ago), I could easily compare and contrast what differences each model had and ensure for similar behaviors (because otherwise, the underlying implementations are different).

So well... what's next? My second checkpoint will consist of these goals:
1. Giving the simulation a name (I really don't want the name to be GLBoids).

2. Multithreading the calculation of positions (I highly doubt I can multithread the rendering, since passing in the shader inputs and using them needs to be atomic).

3. Create a HUD and debug UI (I learned this the hard way, and that way is failing an interview question)

I also have some future aspirations:
1. Apply some theming. I've always said I wanted to encode water...

2. Regular boids are boring. Make a weird behavior. Genetics is quite a field isn't it? What about a building a formation?

3. Should I make this a game?????

All in all, I feel this project will prolly become a pastime, a sandbox of sorts to relieve stress. In the last few weeks, I found myself averaging less on game time and more on this project (and among other things like finding jobs/housing/insurance waivers 💀). I know I will continue on my word and my interests (but I just need to find the time).

