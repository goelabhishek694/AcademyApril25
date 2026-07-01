import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/users";

function Register() {
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      const response = await registerUser(values);
      console.log("response", response);
      if(response.success){
        console.log("register form values", response);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }else{
        console.log("register form values else", response);
        message.error(response.message);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("register form failed", errorInfo);
  };

  return (
    <main className="App-header">
      <h1>Register on BookMyShow</h1>
      <section className="mw-500 text-center px-3">
        <Form
          layout="vertical"
          onFinish={handleRegister}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            htmlFor="name"
            className="d-block"
            rules={[{ required: true, message: "Name is required!" }]}
          >
            <Input id="name" type="text" placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            htmlFor="email"
            className="d-block"
            rules={[
              { required: true, message: "Email is required!" },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input id="email" type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            htmlFor="password"
            className="d-block"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                min: 6,
                message: "Password must be of at least 6 characters!",
              },
            ]}
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
              Register
            </Button>
          </Form.Item>
        </Form>

        <div>
          <p>
            Already a User ? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
