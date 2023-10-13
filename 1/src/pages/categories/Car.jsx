import React, { useState, useEffect } from "react";
import "./Car.css";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";
import img7 from "../../assets/7.jpg";
import img9 from "../../assets/9.jpg";
import { Button } from "@mui/material";
import store from "../../redux/store";
import { addShopList } from "../../redux/action";
import { connect } from "react-redux";
const Car = (props) => {
  const [auctions, setAuctions] = useState([]);
  const navigate = useNavigate();
  const { list } = props;
  useEffect(() => {
    setAuctions([
      {
        title: "小鲤鱼历险记",
        description: 20,
        fl: "童话",
        src: img1,
      },
      {
        title: "西游记",
        description: 20,
        fl: "老人",
        src: img2,
      },
      {
        title: "淘气包马小跳",
        description: 20,
        fl: "童话",
        src: img3,
      },
      {
        title: "吹牛大王历险记",
        description: 20,
        fl: "神话",
        src: img4,
      },
      {
        title: "一千零一夜",
        description: 20,
        fl: "神话",
        src: img5,
      },
      {
        title: "中国历史故事",
        description: 20,
        fl: "历史",
        src: img6,
      },
      {
        title: "鲁滨逊漂流记",
        description: 20,
        fl: "梦幻",
        src: img7,
      },
      {
        title: "明朝",
        description: 20,
        fl: "古代",
        src: img9,
      },
    ]);
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  const calculateTimeLeft = (endDate) => {
    const currentDate = new Date();
    const auctionEndDate = new Date(endDate);
    const timeDifference = auctionEndDate - currentDate;

    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesLeft = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${daysLeft}D : ${hoursLeft}H : ${minutesLeft}M`;
  };

  console.log("Rendering Car");

  return (
    <div className="">
      <div className="banner">
        <div className="banner-content">
          <h1 className="title-dashboard">商品列表</h1>
        </div>
        <button className="go-back-button" onClick={handleGoBack}>
          返回
        </button>
      </div>
      <div
        className="contnets"
        style={{
          width: "100%",
          marginTop: "15%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {auctions.map((auction, i) => {
          const timeLeft = calculateTimeLeft(auction.endDate);
          return (
            <div
              key={i}
              style={{
                flex: "1 20%",
                height: "320px",
                margin: "20px",
                borderRadius: "20px",
                background: "rgb(230,230,230)",
                padding: "20px",
                boxSizing: "border-box",
                justifyContent: "flex-start",
              }}
              className="auction-item"
            >
              <div
                className=""
                style={{
                  height: "150px",
                }}
              >
                <img
                  src={auction.src}
                  style={{ width: "100%", height: "100%" }}
                  alt=""
                />
              </div>
              <div
                className="bts"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  marginTop: "10px",
                  flex: "1 100%",
                }}
              >
                <h2
                  className="auction-item-title"
                  style={{
                    fontSize: "24px",
                    flex: "1 100%",
                    margin: "0",
                  }}
                >
                  {auction.title}
                </h2>
                <p style={{ flex: "1 100%", marginTop: "20px" }}>
                  分类: {auction.fl}
                </p>
                <p style={{ marginTop: "20px", flex: "1 100%" }}>
                  价格 {auction.description}
                  <Button
                    onClick={() => {
                      store.dispatch(
                        addShopList(
                          list.lentgh === 0
                            ? [{ ...auction, id: i }]
                            : [...list, { ...auction, id: i }]
                        )
                      );
                    }}
                  >
                    购买
                  </Button>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* {auctions.map(auction => {
                console.log("Rendering auction with ID:", auction.id);
                const timeLeft = calculateTimeLeft(auction.endDate);
                return (
                    <div key={auction.id} className="auction-item">
                        <h2 className="auction-item-title">{auction.title}</h2>
                        <div className="description-container">
                            <p className="auction-item-description"> {auction.description}</p>
                        </div>
                        <p className="auction-item-time"> {timeLeft}</p>
                        <div className="requirements-container">
                            <p><strong>Requirements:</strong></p>
                            {Object.entries(auction.requirements).map(([key, value]) => (
                                <span key={key}>
                                    {key}: {value}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })} */}
    </div>
  );
};

export default connect((state) => {
  return {
    list: state.shopAll,
  };
})(Car);
