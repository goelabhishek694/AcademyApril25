import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";

function Login() {
  const handleLogin = (values) => {
    console.log("login form values", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("login form failed", errorInfo);
  };

  return (
    <main className="App-header">
      <h1>Login to BookMyShow</h1>
      <section className="mw-500 text-center px-3">
        <Form
          layout="vertical"
          onFinish={handleLogin}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            htmlFor="email"
            className="d-block"
            rules={[
              { required: true, message: "Email is required!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input id="email" type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            htmlFor="password"
            className="d-block"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              block
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div>
          <p>
            New User ? <Link to="/register">Register Here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
