import React, { Component } from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";

import { cyan500 } from "material-ui/styles/colors";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Needed to allow yarn not to fail to the build because of
//  undefined variable. We actually define this javascript
//  variable in the jsp file.
/* global dataUrl */

const muiTheme = getMuiTheme(darkBaseTheme, {
  App: { backgroundColor: cyan500 }
});

class DisplayInfo extends Component {
  render() {
    const actions = [
      <FlatButton
        label="Done"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.handleClose}
      />
    ];

    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.props.handleClose}
      >
        Your {this.props.type} is: {this.props.name}
      </Dialog>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      displayName: null,
      emailAddress: null,
      openEmail: false,
      openName: false
    };
  }

  componentDidMount() {
    var that = this;
    // This is the equivalent of jQuery's ajax. For some browser versions, you
    //  may need a polyfill for.
    //  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    //  https://github.com/github/fetch
    fetch(dataUrl, { credentials: "include" })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        that.setState({
          displayName: data.displayName,
          emailAddress: data.emailAddress
        });
      });
  }

  handleOpenEmail = () => {
    this.setState({ openEmail: true });
  };

  handleOpenName = () => {
    this.setState({ openName: true });
  };

  handleCloseEmail() {
    this.setState({ openEmail: false });
  }

  handleCloseName() {
    this.setState({ openName: false });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={muiTheme.App}>
          <h2>Welcome to React</h2>
          <Card>
            <CardHeader title="Your Information" />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
            <CardActions>
              <FlatButton
                label="Show Email"
                onTouchTap={this.handleOpenEmail}
              />
              <FlatButton label="Show Name" onTouchTap={this.handleOpenName} />
            </CardActions>
          </Card>
          <DisplayInfo
            open={this.state.openEmail}
            handleClose={this.handleCloseEmail.bind(this)}
            title="Email Address"
            type="email address"
            name={this.state.emailAddress}
          />
          <DisplayInfo
            open={this.state.openName}
            handleClose={this.handleCloseName.bind(this)}
            title="Name"
            type="name"
            name={this.state.displayName}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
