import { Button, Card, Form, Input, Layout, notification, Radio } from "antd";
import React, { useState } from "react";
import Polybius from "../../ciphers/Polybius";

const PolybiusAlgo: React.FC = () => {
  const [form] = Form.useForm();
  const [action, setAction] = useState<number>(1);

  let requiredRule = () => {
    return { required: true, message: "Поле не може бути пустим" };
  };

  let onValuesChange = (c: any, v: any) => {
    if (v.action) setAction(v.action as number);
  };

  let onSubmit = (v: any) => {
    try {
      let encryptor = new Polybius(v.cryptoKey);

      let outputMessage =
        action === 1
          ? encryptor.encrypt(v.upperMessage)
          : encryptor.decrypt(v.upperMessage);
      form.setFieldsValue({
        lowerMessage: outputMessage,
      });
    } catch (e) {
      console.log(e);
      notification.error({ message: "Невірний формат ключа." });
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
      <Card title="Шифр Полібія" style={{ margin: "100px" }}>
        <Form
          onValuesChange={onValuesChange}
          onFinish={onSubmit}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Ключ"
            name="cryptoKey"
            required
            rules={[requiredRule()]}
          >
            <Input
              placeholder={
                action === 1
                  ? "Придумайте ключ без літер, що повторюються"
                  : undefined
              }
            ></Input>
          </Form.Item>
          <Form.Item
            label={action === 1 ? "Повідомлення" : "Зашифроване повідомлення"}
            name="upperMessage"
            required
            rules={[requiredRule()]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label={
              action === 1
                ? "Зашифроване повідомлення"
                : "Розшифроване повідомлення"
            }
            name="lowerMessage"
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="Операція" name="action" required initialValue={1}>
            <Radio.Group>
              <Radio value={1}>Зашифрувати</Radio>
              <Radio value={2}>Розшифрувати</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Старт
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default PolybiusAlgo;
