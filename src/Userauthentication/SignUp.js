import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import { useRef } from "react";
import { productList } from "../ReduxSaga/actions/productAction";
import { Link } from "react-router-dom";

export function SignUp() {
  const dispatch = useDispatch();
  // Sign Up
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  //   Sign UP
  let stat = useSelector((state) => state);
  // console.log(stat);

  const onFinish = (values) => {
    console.log("Success:", values);
    // let { username, password } = values;
    // setUserName(username);
    // setPassword(password);

    const getApiData = async () => {
      // Getting Request Token
      let data = await fetch(
        "https://api.themoviedb.org/3/authentication/token/new?api_key=c12531a82a60035f2bcdef9bb2c8ff3c"
      );
      let response = await data.json();
      let token = response.request_token;
      //   Saved Request Token
      localStorage.setItem("token", token);
      //   GEtting token authentication and aprroved
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3001/Sign-Up`;
      //       let tok = localStorage.getItem("token");
      //       //   Creating Session ID
      //       try {
      //         const response = await fetch(
      //           `https://api.themoviedb.org/3/authentication/session/new/new?api_key=c12531a82a60035f2bcdef9bb2c8ff3c`,
      //           {
      //             method: "POST", // or 'PUT'
      //             headers: {
      //               "Content-Type": "application/json",
      //             },
      //             body: JSON.stringify({
      //               "request_token": tok ,
      // }),
      //           }
      //         );

      //         const result = await response.json();
      //         console.log(result,"result");
      //         localStorage.setItem("sessionID", result);
      //         // console.log(result,"Success:" );
      //       } catch (error) {
      //         console.error("Error:", error);
      //       }
      // console.log(tok,"tok");
    };

    getApiData();
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const session = () => {
    const getApiData = async () => {
      let tok = localStorage.getItem("token");
      console.log(typeof tok, "tok");
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=c12531a82a60035f2bcdef9bb2c8ff3c&request_token=${tok}`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
              // "Authorization": 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTI1MzFhODJhNjAwMzVmMmJjZGVmOWJiMmM4ZmYzYyIsInN1YiI6IjY0M2UzZjExNDMyNTBmMDRmODUwZmY3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n8C5jIhRoWFBCvknA2BRcFNoqcs0RgTcMML9X4rQBvA',
              accept: "application/json",
            },
            // body: JSON.stringify({"request_token": "a18623a17e22b26ff315c458b891e5f7299b84cf" }),
          }
        );

        const result = await response.json();
        console.log(result, "result");
        localStorage.setItem("sessionID", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getApiData();
  };
  return (
    <>
      <Button type="primary">
        <Link to="/login">Login</Link>
      </Button>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button onClick={session}>Session ID</Button>
    </>
  );
}
