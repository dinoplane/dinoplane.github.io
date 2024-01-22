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


# Introduction

So, I've worked with graphics APIS like WebGL, OpenGL, and Three.js and many game engines like Unity and Unreal. I wanted to learn even more about the nitty gritty of graphics and GPUs so I decided to pursue Vulkan.

First things first, I have been following a couple tutorials to supplement my learning.
We have:

- [The Vulkan Game Engine Tutorials](https://www.youtube.com/playlist?list=PL8327DO66nu9qYVKLDmdLW_84-yE4auCR)
- [The official Vulkan Tutorial](https://docs.vulkan.org/tutorial/latest/00_Introduction.html) adapted from [The Vulkan Tutorial](https://vulkan-tutorial.com/)
- [The Vulkan Programming Guide](https://www.amazon.com/Vulkan-Programming-Guide-Official-Learning/dp/0134464540)

I've mostly been going through the tutorial and following the coding, and referring to the other resources when I need to. I know and feel like I am just slapping a alien over the tutorial right now (but it can't be helped I gotta learn). I hope to integrate either the ray tracing project or the boids project into my game engine (or maybe even combining the two?!). But first I must complete a significant number of tutorials...

The following will be a scratchpad for my thoughts on how Vulkan works since this is the first checkpoint, connecting each of the components I have learned up to now.

#


- Alien
