import React, { useEffect, useState } from "react";
import "./ElectricityPlan.css";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import store from "../../redux/store";
import { addShopList } from "../../redux/action";

const ElectricityPlan = (props) => {
  const navigate = useNavigate();
  const [listAll, uselistAll] = useState([]);
  const { list } = props;
  useEffect(() => {
    uselistAll(
      [...list].map((e) => {
        return {
          ...e,
          count: 1,
        };
      })
    );
  }, []);
  const handleGoBack = () => {
    store.dispatch(addShopList(listAll));
    navigate("/");
  };
  const deleteshop = (i) => {
    const arr = [...listAll];
    arr.splice(i, 1);
    uselistAll(arr);
  };
  const changenum = (r, n, i) => {
    if (n.target.value < 0) {
      return;
    }
    const arr = [...listAll];
    arr.splice(i, 1, {
      ...list.find((e) => e.id === r.id),
      count: n.target.value,
    });
    uselistAll(arr);
    // store.dispatch(addShopList(list));
  };
  return (
    <div className="auctions-list">
      <div className="banner">
        <div className="banner-content">
          <h1 className="title-dashboard">购物车</h1>
        </div>
        <button className="go-back-button" onClick={handleGoBack}>
          返回
        </button>
      </div>
      {list.length > 0 ? (
        <div className="car">
          <table>
            <thead>
              <tr>
                <td>序号</td>
                <td>选择</td>
                <td>图片</td>
                <td>分类</td>
                <td>单价</td>
                <td>数量</td>
                <td>总计</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              {listAll.map((e, i) => {
                return (
                  <tr key={e}>
                    <td>{e.id + 1}</td>
                    <td>
                      <input type="checkbox" value={e.check} />
                    </td>
                    <td>
                      <img width="100" height="100" src={e.src} alt="" />
                    </td>
                    <td>{e.fl}</td>
                    <td>{e.description}</td>
                    <td>
                      <input
                        type="number"
                        value={e.count}
                        onChange={(k) => {
                          changenum(e, k, i);
                        }}
                      />
                    </td>
                    <td>{e.description * Number(e.count || 1)}</td>
                    <td>
                      <button
                        onClick={() => {
                          deleteshop(i);
                        }}
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>还没有购买商品</div>
      )}
    </div>
  );
};

export default connect((state) => {
  return {
    list: state.shopAll,
  };
})(ElectricityPlan);
