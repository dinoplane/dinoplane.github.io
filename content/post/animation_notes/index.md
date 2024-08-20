---
# Documentation: https://wowchemy.com/docs/managing-content/

title: "GLboids: Devlog 1"
subtitle: ""
summary: "An OpenGL boid simulation I have not abandoned yet. Status: Looking for ways to efficiently calculate positions!"
authors: ["Arrian Chi"]
tags: []
categories: []
date: 2024-01-18T08:54:18-07:00
lastmod: 2024-01-18T08:54:18-07:00
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



## Interpolation and Motion Curves

- Chapter 3 of textbook and Appendix B.5


#### Motion Curves

The most basic capability of an animation to let the user set animation variables in each frame

Not easy to accomplish - HCI challengess in designing effective interface


The next capability is to support key frame animation: Computer automatically interpolating in-between frames

A motion curve is what you get when you plot an animation variable against time (avars)
- The computer must come up with motion curves that interpolate your keyframe values

- specify values at certain key frames, work and manipulate curves


#### Different forms of Curve Functions

Explicit y = f(x) mapping of x to y
- Cannot get multiple y to same x

Implicit f(x, y) = 0
- Cannot easily compare tangent vectors at joints
- In/out test, normals from gradient

Parametric: x = f_x(t), y = f_y(t), z = f_z(t)
- Most convenient for motion representation

#### Describing Curves by Means of Polnomials

Lth degree polynomial

p(t) = a_0 + a_1t + a_2t^2 + ... + a_Lt^L

a_0 ... a_L coefficients

L is degree
L+1 is order of polynomial

# Some questions

When a GPU samples a texture, how does it pick which mipmap level to read from?
- GPU rasterizes things in 2x2 fragment blocks, so it could calculate the difference between the uvs between fragments in the block and use the difference to pick the mipmap level that matches.

You are designing a lighting system for a game/engine. What would it be?
  - try to narrow things down
  - speak about some existing solutions and their pros and cons
  - explore the problem space
  - talk about tradeoffs

You are implementing a graphics API abstraction for an engine. How would it look like?
  - power/performance or ease of use?
  - who are the users?

You need to store and render a large city. How would you do it?
  - Authoring, procedural authoring, baking, runtime modification, storage, streaming, spatial data structures, levels of detail, occlusion, rendering, lighting, and so on. Lots and lots of discussion to be had.



# C++ Questions
    OOP
        - Encapsulation: grouping data/methods into single unit
            - Data hiding: restrict access to members
            - Bundling together
        - Data Abstraction:
            - showing only relevant information to user
            - abstract classes define how users implement your interface
        - Polymorphism: when a class has different forms/ contexts
            - Compile Time Polymorphism
                - binding of call to code done at compile time
                - Method/operator overloading (creating function with same name but diff params)
            - Runtime Polymorphism
                - binding of call to code done at runtime
                - method overriding (virtual)
        - Inheritance
            - derive a class from another baseclass
            - help with code reusibility and runtime polymorphism

    Virtual functions
        - a virtual function is a function that is declared in a base and redefined in a derived.
        - With a derived class object pointer or reference, you can call the derived function
        - The compiler, when seeing virtual, objects created will have an additional VPTR to point to the vtable of the class.
        - virtuality is inherited!
        - Constructors cannot be virtual but destructors can
            - work around for copy constructor, virtual method that calls copy
        - override is a keyword that tells compiler to check for override error

    What does the friend keyword do?
        - If I say they are my friend, they can touch my privates
        - BUT THEY MUST BE REAL!



    What is a memory leak?
        - When the programmer forgets to deallocate memory from the heap, reducing the amount of available memory, making it harder for the CPU to find a place to allocate memory

    What is stack overflow?
        - When the process stack exceeds its bound. May happen when we infinitely recurse.

    What is a seg fault?
        - When a process tries to access a restricted area of memory.

    When should you use virtual destructors? (interviewers absolutely love this question!)
        - When it is possible that you are deleting a derived class from a base pointer
        - We could also prevent this problem from ever arising by making the base destructor protected, so we cant call delete on the base class pointer

    What is the difference between allocating memory on the heap versus the stack?
        - If memory is allocated on the stack, the memory will be freed when the function goes off out of scope (the stack frame is popped). If memory is allocated on the heap, the memory will persist until a call to free it is made.
        - heap allocation is usually done noncontiguously
        - stack allocation is done contiguously

    What C++11 and C++14 features are you using?
        - C++ 11: auto, deleted functions, override, nullptr, variadic templates, move constructors, move assignment operators, range for, constexpr (evaluate at compile time), smart pointers, atomic
        - C++ 14: make_unique


    What does RAII mean?
        - Resource Acquisistion is Initialization
        - the lifecycle of a resource is acquired and bound to the lifecycle of the object


    What is a smart pointer?
        - A wrapper class of the raw pointer that implements RAII.
        - deallocate and free destroyed memory
        Types:
            - unique_ptr: stores one pointer only, and only one pointer can to the object
            - shared_ptr: more than one can point to the object
            - weak_ptr: holds nonowning reference to object, preventing deadlock due to circular dependency.

    What are templates used for?
        - Generic programming, defining a blueprint so that a function/class can work with multiple data types.
        - Expanded in compiler time
        - cant be used with virtual
        - so we leverage type erasure (easy way is to use void*)

    Explain the inline keyword?
        - The inline keyword signifies to the compiler that the function can be expanded inline in the code. There is no need for a jump/pushing a stack frame(args of function, address of following instr, transferring control). More compiler optimizations may be done.
        - but... more registers may be used, and the binary executable size may increase, the instruction cache hit rate decreases (duh), increase compiler time,
        - all functions defined in a class are implicitly inline
        - inline only functions that take a small amount of time to do

    What is little and big endian?
        - endianness the order in which bytes within a word of digital data are stored in memory
        - Big, MSB stored in smaller memory address &4&3&2&1 -> 0011 = 12
        - Little MSB stored in bigger memory address 1100 = 12
        - matters when data is serialized

    Explain what const-correctness is?
        - using const to prevent const objects from being mutated
        - check is done at compile time
        - prevent things from being modified on accident
        - pointers
            - `const X* p`: p points to X that is const (X object cannot be modified by p)
            - `X* const p`: p is const pointer that points to X (p can't be changed, but X can)
            - `const X* const p`: p is a const pointer that points to a const X (neither p nor X can be changed)

    What is the difference between C and C++?
      In C++:
        - CLASSES
        - access modifiers (public, private, protected)

    What is the size of a pointer in C++?(that is, the result of sizeof for a pointer):
        - depends on your architecture 32 or 64 bit addresses

# Mathematics Questions

    What is a dot product?
        - The sum of the components of 2 vectors multiplied component-wise (scalar)
        - a*b = |a||b|cos(theta) where theta is the angle between 2 vectors
        - commutative

    Projection
        - projection of a onto b is b(a*b/|b|)

    What is a cross product?
        - The determinant of a matrix containing the unit vector and the two vectors
        - anti commutative
        - The result is a vector that is orthogonal to both vectors
        - magnitude quals area of parallelogram formed by the vector
        - |axb| = |a||b|sin(theta)

    Why should you use quaternions over euler angles?
        - Euler angles, which define an objects rotations based on the axes of their local origin, suffer from Gimbal lock, the phenomenon where when the middle axis of rotation aligns the top and bottom axes of rotation with respect to the rotation order, the object loses one axis of rotation.
        - This causes weird transitional artifacts in animations.

        - quaternions are an extension of the complex number system/plane into 3d.
            - Rotation of theta about v: Rot(theta, v) = q = [cos(theta/2), sin(theta/2)v]

    How do you use matrices to apply transformations to an object? For instance, how do you scale, translate and rotate an object with matrices?
        - affine transformations can be represented as a 4 by 4 matrix.
            - scale is just multiplying a factor to a particular row on the identity matrix
            - translate is modifying the 4th column of the 4 by 4
            - rotation is applying [cos(t) -sin(t); sin(t) cos(t)] (signs switched for about y) about axis of rot.
            - rotations are applied in multiplication oder to the vector
            - ABx is B applied first, then A
        - These can also be thought of as a basis transformation. Given a point


    How do you calculate the intersection between a ray and a plane/sphere/triangle?
        - rays have a origin point and a vector (l0 + l*t) = p
            -
        - Plane: (a normal and a point (p-p0)*n = 0): t = (p0 - l0)*n / (l*n)
        - Sphere: (a point and radius): use implicit function of sphere and substitute values for ray (becomes a quadratic) a=D^2 b=2D(O-C) c = |O-C|^2 - R^2
        - Triangle: (3 points): same thing as a plane but... with dot/cross
            - Calculate the normal and the offset from origin using a tri vertex
            - substitute ray into plane eq to derive
                - check if the normal of triangle and ray are orthogonal (to check for parallelness)... depending on application, we can compute or ignore this
                    - check line intersection, since on same plane
                - check sign of t (t negative means triangle behind the ray)
            - The inside-outside test
                - Intuition: dot(cross(V0 to V1, V0 to POI), N) > 0 -> point above V0V1
                    - do this 3 times and we bing chilling

    Explain concepts like world space, object space and camera space.
        - Object space, the object's center is the origin
        - World space, 0 0 is the origin
        - Camera space, the camera is the origin
        - Clip space mapped the view volume to a unit cube
        - Screen space, clipped the geometry based on intersections with view volume
            - only clipped coords are sent to screen mapping to here.


Optimization Questions

    How can we use a Bounding Volume Hierarchy(or an octree, or something similar) to speed up a raytracer?
        - same idea as my boid simulation
        - don't check the child objects if the objects don't intersect with the volume

    Explain about Cache Memory(L1 and L2 caches, and so on)
        - Cache Hierarchy
        - Registers, L1, L2 etc. to Disk
        - Fetch from memory takes a couple hundred cycles.
        - But what if we use a memory address multiple times within a unit time, or are guaranteed to access its neighbors later?
        - We could be more efficient if we cache the value and its surrounding ones at this location.
        - Retrieve cache blocks
            - We could also talk about prefetching etc etc


    What is Data Oriented Design?
        - programming motivated by efficient usage of the CPU cache
        - think about problems like cache misses/evictions, the parallel array as opposed to an array of structs, false sharing, lock free data structures etc.

    Explain how view frustum culling can be optimized using multithreading and SIMD(see e.g. the blog post by Andreas Asplund)
        - Do a Sphere to plane check first
        - Pack the Vertex in the OBBs into a struct containing 4 float vectors.

    Do you have experience with using performance profiling tools for the GPU?
        - I've tried using renderdoc b4, and unity's profiling, but not much else.

Computer Graphics Questions

    - Render vs Display
        - Render: calculating what needs to be displayed
        - Display: ACTUALLY displaying it

    What anti-aliasing techniques do you know about?(some possible techniques are MSAA, MLAA, FXAA and TXAA)
    - Jaggies that form when you try drawing curved surfaces on a screen
    - Aliasing happens due to the limitations of a pixel to display only 1 color and the fact that a display doesn't have infinite resolution.
    - SSAA:
        - Supersample Anti-aliasing
            - expensive
            - Render an image at a higher resolution and sample at each pixel multiple times

    - MSAA:
        - Multi-sample Anti-Aliasing
            - better than SSAA
            - Only need to sample on the triangle's edges. (we can do better if we determine actual edges)
            - coverage mask
    - MLAA:
        - Morphological Anti-aliasing
            - uses a filter to blur edges
            - looks for discontinuities in last pipeline stage
    - FXAA:
        - Fast Approximation Anti-aliasing
            - FAST; a post processing technique that uses a high contrast filter to find edges and bledn them
            - kinda blurry (blurring done differently, looks at luma difference among pixels)
    - TXAA:
        - Temporal Anti-aliasing
            - like FXAA, but uses previous frames todo the blending
            - ghosting: a previous sample carries onto the frame

    What are the most common elements of a rendering engine?(common elements will be things like a system for handling culling, rendering of shadows, handling of light sources with something like deferred/forward shading, how materials are handled in the engine, and so on)
      - deferred/forward shading
        - deferred shading: decoupling shading from scene geometry, lighting is calculated after the shaders are executed
            - first pass, gather data required for shading compute. second pass, use pixel shader to do lighting per pixel
            - advantage: we decouple lighting from geometry, only calculating lighting for the pixels that need to calculate it
            - disadvantage: we cant do transparency, multiple materials expensive, antialiasing becomes inaccurate
        -forward:
            - traditional, we look at lighting in the base shaders
        - materials
        - bloom
            - when the light looks like a gift from god. (light extends into the edges of materials)


    What shadow rendering techniques do you know about?(there are TONS of shadow rendering techniques out there. Some examples are variance shadow mapping and exponential shadow mapping, and the newer moment shadow mapping)

    Explain to me physically based rendering?

    Can you give an explanation of how the Rendering Equation works?
        - an integral equation in which the equilibrium radiance leaving a point is given as the sum of emitted plus reflected radiance under a geometric optics approximation

    What is a BRDF? What does it mean to say that a BRDF is "energy conserving"?

    What are the performance implications of branching in a shader?(hint: read up on the concept of a warp in GPU architecture)
        - Branching is bad
        - GPUs have many many cores,
            - we organize threads into warps, which will execute in lockstep until a stall, in which then we must swap it out
            - branches hurt performance by making some threads that shouldnt branch either do wasted computation or stall
            - register use also too because need more memory so fewer warps can be executed at a time

    What advantages does newer API:s like Vulkan and DirectX 12 offer over old API:s like OpenGL and DirectX 11?(hint: primary reason is lower driver-overhead)
        - OpenGL - simpler and high level of abstraction, high CPU overhead, porting from desktop to mobil is a pain (OpenGL ES), saves lots of time
        - Vulkan - more verbose, can be used for general compute, highly optimized(use of command buffers to draw), programmers need to allocate and deallocate memory, unified API, Error checking is manual...

    What is the last graphics paper you read, and can you explain it to me?(this was a pretty common question)
        - It was about behavioral animation...

    Describe to me the entire graphics pipeline?(your answer will probably be pretty long. You will explain about the vertex shader and the fragment shader, about perspective correct interpolation, about the z-buffer, about double buffering the framebuffer, about alpha blending, about transformation matrices, about homogeneous coordinates, about reflection models in the fragment shader and so on.)

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
s