import "./styles/base.css";
import Button from "./components/Button";
import Content from "./components/Content";
import SignInput from "./components/Input";
import SignIcon from "./components/Icon";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../redux/store";
import { setUserInfo } from "../../redux/action";

const SignUp = () => {
  const navigate = useNavigate();
  const [checkPsd, setCheckPsd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState();

  const onLogin = useCallback(() => {
    if (username === "123" && password === "123456") {
      // sessionStorage.setItem("user", 1);
      store.dispatch(setUserInfo({ username, password }));
      navigate("/");
    }
  }, [password, username]);

  return (
    <div className="sign-page">
      <div className="sign-page-header">
        <Button onClick={() => navigate("/")}>返回</Button>
      </div>
      <div className="sign-page-content">
        <h2>登录</h2>
        <Content>
          <SignInput
            onChange={(v) => setUsername(v)}
            value={username}
            placeholder="请输入用户名"
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
          <div className="sign-page-button" style={{ marginTop: "20px" }}>
            <Button type="sign" onClick={() => onLogin()}>
              登录
            </Button>
          </div>
        </Content>
      </div>

      {/* <SignIcon type='signup' /> */}
    </div>
  );
};

export default SignUp;
