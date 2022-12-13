import { Card, Form, Input, Layout } from "antd";
import React, { useEffect, useState } from "react";
import ElGamal from "../../hashes/ElGamal";

const RSAAlgo: React.FC = () => {
  const [form] = Form.useForm();
  const [enc, setEnc] = useState<string>("");
  const [dec, setDec] = useState<string>("");
  const [hasher, setHasher] = useState<ElGamal>();

  useEffect(() => {
    setHasher(new ElGamal());
    debugger;
  }, []);

  let requiredRule = () => {
    return { required: true, message: "Поле не може бути пустим" };
  };

  let onValuesChange = (c: any, v: any) => {
    if (!hasher) return;
    let encT = hasher.getSignature(v.hash);
    setEnc(encT.text);
    setDec(hasher.getDecrSignature(encT.text, encT.p));
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
        title="Сформуйте та перевірте цифровий підпис сформованого ґеш-образа за допомогою схеми ElGamal."
        style={{ margin: "100px" }}
      >
        <Form onValuesChange={onValuesChange} layout="vertical" form={form}>
          <Form.Item label="Геш" name="hash" required rules={[requiredRule()]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="Зашифрований підпис" name="enc">
            {enc}
          </Form.Item>
          <Form.Item label="Розшифрований підпис" name="dec">
            {dec}
          </Form.Item>
        </Form>
      </Card>
    </Layout>
  );
};

export default RSAAlgo;
