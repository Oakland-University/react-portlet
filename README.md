# React Portlet

An old portlet with a new face!

## Getting Started
1.  Javascript framework used: [React framework](https://facebook.github.io/react/)
2.  Tool to build our javascript application: [Yarn](https://yarnpkg.com/en/)
3.  UI library used: [Material UI](http://www.material-ui.com/#/)

Yarn does not have to be installed locally on your system to build the application. Yarn and node will be downloaded and installed via the maven build process. This is all handled by the frontend maven plugin.

### Prerequisites
1.  maven 3+
2.  jdk 7+ (preferably 8)

## Installing
```bash
mvn clean package
cd $UPORTAL_SOURCE
ant deployPortletApp -DportletApp=/path/to/portlet.war
```

## React Setup
We added the react code to the project using the tool [create-react-app](https://github.com/facebookincubator/create-react-app). After that we [ejected](https://github.com/facebookincubator/create-react-app#converting-to-a-custom-setup) from the create-react-app project. This allows us to change the transpilied javascript output file name. When you build a react application the output filenames have the file hash appended.  An example would be something like index.abef34d.js. The filename changes every time the project is built. This makes it difficult for us to include the javascript file in our JSP file. We modified the file [webpack.config.prod.js](src/main/react/config/webpack.config.prod.js) to remove '[hash]' from all output files.

If we take a look at [main.jsp](src/main/webapp/WEB-INF/jsp/main.jsp) we can see that we are including the javascript file containing our react code. You will also see an empty div with the id of "app". If we have multiple react portlets on the same page, make sure that the id is unique per portlet. Otherwise react will render ALL portlets to the same div. Looking at [index.js](src/main/react/src/index.js) we can see where the react application figured out where it needs to render to.

The way this project is setup is for NO external CSS files. All CSS must be done essentially in-line. This will help prevent portlet's CSS bleeding into others on the page.

## Building The Project
As stated before, you do not need to build the react side of the project by its self. The maven process will build and copy the generated artifacts to the correct location for you. But if you wish to build the react project by hand, go to the src/main/react/ directory and do either a `npm run build` or a `yarn run build`.
