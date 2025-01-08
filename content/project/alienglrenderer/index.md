+++
image = "featured.gif"
title = "AlienGLRenderer"
date = "2024-08-01T00:00:00Z"
type = "gallery"
github = "https://github.com/dinoplane/gl_alien_renderer"
report = "/uploads/CapstoneReport.pdf"
featured = "./baka1.PNG"
+++


My senior capstone project. It is a simple 3D OpenGL renderer implemented with Direct State Access. Some features implemented include instancing, indirect drawing, culling, model/texture loading, and post-processing. Please refer to the report for further details.

*In the process of converting to Vulkan.

Why? Although OpenGL will still be around for a while and modern OpenGL is a slightly more sane API than before, many high end games are leaving OpenGL for Vulkan or DirectX12. In addition, OpenGL does not provide an interface for asynchronous GPU compute (i.e. running a compute shader whilst processing graphics). There is however an argument of not overcomplicating things when things could be simple. But I wanna learn. 

