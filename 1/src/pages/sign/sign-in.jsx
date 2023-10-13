import "./styles/base.css";
import Button from "./components/Button";
import Content from "./components/Content";
import SignInput from "./components/Input";
import SignIcon from "./components/Icon";
import { useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [checkPsd, setCheckPsd] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onLogin = useCallback(() => {
    console.log(email, password);
    if (!email) {
      return alert("please input email");
    }
    if (!password) {
      return alert("please input password");
    }

    /**
     * Parameters to be passed in
     */
    const headers = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    };
    const params = {
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:8080/api/v1/users/login", params)
      .then((res) => {
        console.log(res);
        const token = res.data.token;

        const loginConfirmURL =
          "http://localhost:8080/api/v1/users/login?token=" + token;

        axios
          .get(loginConfirmURL, token, headers)
          .then((ress) => {
            const data = {
              userid: res.data.id,
              userType: res.data.userType,
              token: res.data.token,
            };
            console.log(data);

            localStorage.setItem("user", JSON.stringify(data));
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email, password]);

  return (
    <div className="sign-page">
      <div className="sign-page-header">
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </div>
      <div className="sign-page-content">
        <SignIcon type="login" />
        <Content>
          <SignInput
            onChange={(v) => setEmail(v)}
            value={email}
            placeholder="email"
            subfixIcon={<SignIcon name="email" />}
          />
          <SignInput
            onChange={(v) => setPassword(v)}
            value={password}
            placeholder="password"
            type={!checkPsd ? "password" : "text"}
            subfixIcon={
              <SignIcon
                name="checkPsd"
                onClick={() => setCheckPsd(!checkPsd)}
              />
            }
          />

          <div className="sign-page-button">
            <Button type="sign" onClick={() => onLogin()}>
              Login
            </Button>
          </div>
        </Content>
      </div>
    </div>
  );
};

export default SignIn;
