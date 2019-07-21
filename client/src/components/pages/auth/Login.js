import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import {
  Grid, Message, Header, Segment, Form, Button, Container, Input, Dimmer, Loader
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
      redirect: false,
      loading: false,
    };
  }

  handleChange = (e, { name, value }) => {
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
    const {
      loginUser,
    } = this.props;

    this.setState({
      loading: true
    })

    axios.post('/login', {
      email,
      password,
    })
      .then((response) => {
        loginUser(response.data);
        this.setState({
          showError: false,
          errorMsg: [],
          redirect: true,
          loading: false
        });
      })
      .catch((error) => {
        if (error.response.data.errors !== undefined) {
          // form validation errors
          const msgList = [];
          error.response.data.errors.forEach((element) => {
            msgList.push(element.msg);
          });
          this.setState({
            showError: true,
            errorMsg: msgList,
            loading: false
          });
        } else {
          // bad email or password errors
          this.setState({
            showError: true,
            errorMsg: [error.response.data],
            loading: false
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
      redirect,
      loading
    } = this.state;
    if (redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <Grid padded centered columns={2}>
        <Dimmer active={loading} inverted>
          <Loader />
        </Dimmer>
        <Grid.Column>
          <Header as="h1">
            Welcome Back!
          </Header>
          <Segment>
            <Form>
              <Form.Field>
                <label>Email</label>
                <Input
                  name="email"
                  onChange={this.handleChange}
                  value={email}
                />
              </Form.Field>
              <Form.Field style={{ marginBottom: '0em' }}>
                <label>Password</label>
                <Input
                  name="password"
                  autoComplete="off"
                  type="password"
                  onChange={this.handleChange}
                  value={password}
                />
              </Form.Field>
              <div style={{ marginBottom: '1em' }}>
                 <Link to="/forgot">Forgot your password?</Link>
              </div>
              <Button type="submit" onClick={this.handleSubmit} fluid color="blue">
                Login
              </Button>
            </Form>
            {showError === true && errorMsg.length !== 0 && (
              <Message
                error
                header="Please fix the following and try again."
                list={errorMsg}
              />
            )}
          </Segment>
          <Message
            style={{ textAlign: 'center' }}
          >
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
