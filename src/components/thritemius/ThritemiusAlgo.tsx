import { Button, Card, Form, Input, Layout, notification, Radio } from "antd";
import React, { useState } from "react";
import Thritemius from "../../ciphers/Thritemius";

const ThritemiusAlgo: React.FC = () => {
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
      let encryptor = new Thritemius(v.cryptoKey ?? undefined);

      if (!v.cryptoKey) form.setFieldsValue({ cryptoKey: encryptor.key });
      let outputMessage =
        action === 1
          ? encryptor.encrypt(v.upperMessage)
          : encryptor.decrypt(v.upperMessage);
      form.setFieldsValue({
        lowerMessage: outputMessage,
      });
    } catch {
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
      <Card title="Шифр Тритемія" style={{ margin: "100px" }}>
        <Form
          onValuesChange={onValuesChange}
          onFinish={onSubmit}
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Ключ"
            name="cryptoKey"
            required={action === 2}
            rules={action === 2 ? [requiredRule()] : []}
          >
            <Input
              placeholder={
                action === 1
                  ? "Якщо залишити пустим, ключ буде згенеровано автоматично"
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

export default ThritemiusAlgo;
