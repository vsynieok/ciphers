import { Card, Form, Input, Layout, Typography } from "antd";
import React, { useState } from "react";
import SimpleHash from "../../hashes/SimpleHash";

const SimpleHashAlgo: React.FC = () => {
  const [form] = Form.useForm();
  const [hash, setHash] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);

  let requiredRule = () => {
    return { required: true, message: "Поле не може бути пустим" };
  };

  let onValuesChange = (c: any, v: any) => {
    let hasher = new SimpleHash();
    try {
      setHash(hasher.calculate(v.surname));
      setHasError(false);
    } catch {
      setHasError(true);
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
      <Card title="Створіть геш-образ повідомлення" style={{ margin: "100px" }}>
        <Form onValuesChange={onValuesChange} layout="vertical" form={form}>
          <Form.Item
            label="Прізвище"
            name="surname"
            required
            rules={[requiredRule()]}
          >
            <Input placeholder={"ВИДАТИ_СТО_ГРН_ГЛБУХ_[ПРІЗВИЩЕ]"}></Input>
          </Form.Item>
          <Form.Item label="Геш" name="hash">
            {hasError ? (
              <Typography.Text type={"danger"}>
                Не можу порахувати геш
              </Typography.Text>
            ) : (
              <Typography.Text code>{hash}</Typography.Text>
            )}
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default SimpleHashAlgo;
