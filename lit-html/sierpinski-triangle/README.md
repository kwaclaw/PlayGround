Porting sierpinski triangle demo from LitElement to plain lit-html.

To build the sierpinski-triangle demo:
  - switch to the root directory
  - run "npm install"
  - then run "npm run build-demo"
To run the demo:
  - use "npm run start-demo", this starts the dev server and opens a browser

Note: IT SEEMS ONE CANNOT HAVE MULTIPLE NODE_MODULES directories!
For instance: the Javascript expression "myInstanceOfA instanceof A" will return
  false if the the class and the instance are resolved to different node_modules directories!
