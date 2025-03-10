import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setApiKey } from "./redux/slice/auth.slice";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { ProductPage } from "./pages/product";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LockOutlined,
  FileTextOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import ApiKeyModal from "./components/ui/apiKey";

const { Header, Content, Footer, Sider } = Layout;

function App() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <Link to="/products">Demo</Link>
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: "24px 16px 0" }}>
            <Routes>
              <Route path="/products" element={<ProductPage />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Echoware ©2023 Created by SouravA
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
