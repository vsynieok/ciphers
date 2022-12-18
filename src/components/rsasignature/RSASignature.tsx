import { Card, Form, Input, Layout, Tag } from "antd";
import React, { useState } from "react";
import RSASignature from "../../hashes/RSASignature";

const RSAAlgo: React.FC = () => {
  const [form] = Form.useForm();
  const [isCorrect, setCorrect] = useState<boolean>(false);

  let requiredRule = () => {
    return { required: true, message: "Поле не може бути пустим" };
  };

  let onValuesChange = (c: any, v: any) => {
    let hasher = new RSASignature();
    try {
      setCorrect(hasher.check(v.hash));
    } catch (e) {
      console.log(e);
      setCorrect(false);
    }
  };

  return (
    <Layout
      style={{
        display: "flex",
        justifyContent: "center",
        justifyItems: "center",
        height: "100%",
      }}
    >
      <Card
        title="Використовуючи відкритий e = 7  і  закритий  d = 3  ключі та модуль n = 33 схеми RSA, сформуйте та перевірте цифровий підпис"
        style={{ margin: "100px" }}
      >
        <Form onValuesChange={onValuesChange} layout="vertical" form={form}>
          <Form.Item label="Геш" name="hash" required rules={[requiredRule()]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Чи є достовірним" name="valid">
            {isCorrect ? (
              <Tag color="green">Перевірено</Tag>
            ) : (
              <Tag color="red">Не перевірено</Tag>
            )}
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default RSAAlgo;
