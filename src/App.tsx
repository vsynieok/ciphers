import { Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { MenuProps } from "antd/es/menu";
import { ReactNode, useState } from "react";
import "./App.css";
import ElGamalAlgo from "./components/elgamal/ElGamalAlgo";
import PolybiusAlgo from "./components/polybius/PolybiusAlgo";
import RearragementAlgo from "./components/rearragement/RearragementAlgo";
import ReplacementAlgo from "./components/replacement/ReplacementAlgo";
import RSAAlgo from "./components/rsasignature/RSASignature";
import SimpleHash from "./components/simplehash/SimpleHash";
import ThritemiusAlgo from "./components/thritemius/ThritemiusAlgo";

type MenuItem = Required<MenuProps>["items"][number];

function App() {
  const [menuOption, setMenuOption] = useState<number>(11);

  let menuItem = (
    label: React.ReactNode,
    key: React.Key,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon: undefined,
      children,
      label,
    } as MenuItem;
  };

  let getMenuItems = (): MenuItem[] => [
    menuItem("Лабораторна робота 1", 1, [
      menuItem("Проста перестановка", 11),
      menuItem("Проста заміна", 12),
      menuItem("Шифр Полібія", 13),
      menuItem("Шифр Тритемія", 14),
    ]),
    menuItem("Лабораторна робота 3", 3, [
      menuItem("3. 2. 1", 31),
      menuItem("3. 2. 2", 32),
      menuItem("3. 2. 2 (ElGamal)", 33),
    ]),
  ];

  let getComponentByKey = (k: number): ReactNode => {
    switch (k) {
      case 11:
        return <RearragementAlgo />;
      case 12:
        return <ReplacementAlgo />;
      case 13:
        return <PolybiusAlgo />;
      case 14:
        return <ThritemiusAlgo />;
      case 31:
        return <SimpleHash />;
      case 32:
        return <RSAAlgo />;
      case 33:
        return <ElGamalAlgo />;
      default:
        return <></>;
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Layout>
        <Sider>
          <Menu
            defaultSelectedKeys={["11"]}
            mode="inline"
            theme="dark"
            items={getMenuItems()}
            onClick={(info) => setMenuOption(parseInt(info.key))}
          />
        </Sider>
        <Layout>
          <Content style={{ height: "100%" }}>
            {getComponentByKey(menuOption)}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
