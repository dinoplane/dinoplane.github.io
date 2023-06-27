---
title: My page
type: landing
id: 'landing'

sections:
  - block: markdown
    content:
      title: THE AMAZING CLOWN GIRL!
      subtitle: AHAHHAHHAHAHAHHA
      text: |
        <div id="content"></div>

        <script>
          fetch('content.html')
          .then(response => response.text())
          .then(html => {
            document.getElementById('content').innerHTML = html;
          })
          .then(mcal => {
            main()
          });
        </script>


        <script src="./lib/webgl-utils.js"></script>
        <script src="./lib/webgl-debug.js"></script>
        <script src="./lib/cuon-utils.js"></script>
        <script src="./lib/cuon-matrix.js"></script>
        <script src="./lib/noise-utils.js"></script>
        <script src="./scripts/asg2.js"></script>
        <script src="./scripts/Circle.js"></script>
        <script src="./scripts/Triangle.js"></script>
        <script src="./scripts/Point.js"></script>
        <script src="./scripts/Solid.js"></script>
        <script src="./scripts/Cube.js"></script>
        <script src="./scripts/Prism.js"></script>
        <script src="./scripts/Pyramid.js"></script>
        <script src="./scripts/Icosahedron.js"></script>
        <script src="./scripts/Fabric.js"></script>
        <script src="./scripts/Head.js"></script>
        <script src="./scripts/ClownHead.js"></script>
        <script src="./scripts/Jester.js"></script>

    design:
      # See Page Builder docs for all section customization options.
      # Choose how many columns the section has. Valid values: '1' or '2'.
      columns: '1'
---
