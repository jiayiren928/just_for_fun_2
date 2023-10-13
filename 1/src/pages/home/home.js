import { React, useEffect, useState } from 'react';
import { Button, TextField, Typography, ThemeProvider, createTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fontsource/poppins';
import './home.css';
import { useNavigate } from 'react-router-dom/dist';
import { connect } from 'react-redux';
import store from '../../redux/store';
import { setUserInfo } from '../../redux/action';


const App = (props) => {
  const navigator = useNavigate()
  const { userInfo, count, shopAll } = props
  const logout = () => {
    store.dispatch(setUserInfo(null))
  }
  console.log(shopAll, '22');


  useEffect(() => {
  }, [])

  return (
    < div className="landing-page" >
      <div className="header">
        {!userInfo
          ? <div>
            <Link to="/login" className="button button-signup">登录</Link>
          </div>
          : <div>
            <span style={{ marginRight: '20px' }}>欢迎登录</span>
            <Button onClick={() => navigator('/auctions/list')} style={{ marginRight: '20px' }}>购物车{shopAll.length}</Button>
            <Button onClick={() => logout()}>退出登录</Button>
          </div>
        }

      </div>
      <div className="main-logo">
        <h1 className="title-reverse">首页</h1>
        <div className="bottom-buttons">
          {/* <Link to="/auctions/electricity-plan" className="button-bottom">ELECTRICITY PLAN</Link> */}
          <Link to="/auctions/car" className="button-bottom">商品列表</Link>
          {/* <Link to="/auctions/mobile-phone-plan" className="button-bottom">MOBILE PHONE PLAN</Link> */}
        </div>
      </div>
    </div >
  )
};

export default connect((state) => {
  return {
    userInfo: state.userInfo,
    count: state.count,
    shopAll: state.shopAll
  }
})(App);
