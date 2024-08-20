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
draft: false

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



Parametirc and implicit forms are linie

