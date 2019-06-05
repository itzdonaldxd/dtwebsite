import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  Grid, Message, Header, Segment, Form, Button, Container
} from 'semantic-ui-react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showError: false,
      errorMsg: [],
      redirect: false
    };
  }

  handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      email,
      password,
    } = this.state;
    axios.post('/login', {
      email,
      password,
    })
      .then((response) => {
        this.props.loginUser(response.data);
        this.setState({
          showError: false,
          errorMsg: [],
          redirect: true
        });
      })
      .catch((error) => {
        console.log(error.response.data);
        if (error.response.data.errors !== undefined) {
          // form validation errors
          var msgList = [];
          error.response.data.errors.forEach(element => {
            msgList.push(element.msg);
          });
          this.setState({
            showError: true,
            errorMsg: msgList
          })
        } else {
          // bad email or password errors
          this.setState({
            showError: true,
            errorMsg: [error.response.data]
          });
        }
      });
  };

  render() {
    const {
      email,
      password,
      showError,
      errorMsg,
      redirect
    } = this.state;
    if (redirect) {
      return <Redirect to='/profile' />
    }
    return (
      <Grid padded centered columns={2}>
        <Grid.Column>
          <Header as="h1">
            Welcome Back!
          </Header>
          <Segment>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input
                  name="email"
                  onChange={this.handleInputChange}
                  value={email}
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  name="password"
                  autoComplete="off"
                  type="password"
                  onChange={this.handleInputChange}
                  value={password}
                />
              </Form.Field>
            </Form>
            <Container as={Link} to="/forgot" style={{marginBottom: '1em'}}>Forgot your password?</Container>
            <Button type="submit" onClick={this.handleSubmit} fluid color="blue">
              Login
            </Button>
            {showError === true && errorMsg.length !== 0 && (
              <Message
                error
                header="Please fix the following and try again."
                list={errorMsg}
              >
              </Message>
            )}
          </Segment>
          <Message>
            Need an account?
            {' '}
            <a href="/signup">Sign up!</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;
