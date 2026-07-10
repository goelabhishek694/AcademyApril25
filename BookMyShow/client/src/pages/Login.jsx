import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
// forms -> onFinish-> handleLogin -> api -> response -> ui decision 
// api -> end point method -> called in my component 

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading]= useState(false);

  const handleLogin = async(values) => {
    try{
      setLoading(true);
      console.log("login form values", values);
      const response = await loginUser(values);
      console.log("response", response);
      const token = response.data.token;
      if(token){
        localStorage.setItem("token", token);
      }
      if(response.success){
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }else{
        console.log("login form values else", response);
        message.error(response.message);
      }
    } catch (err) {
      console.log("Error:", err);
    }finally{
      console.log("hi i am finally");
      setLoading(false);
    }
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
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div>
          <p>
            New User ? <Link to="/register">Register Here</Link>
          </p>
          <p>
            Forgot Password ? <Link to="/forget">Click Here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
