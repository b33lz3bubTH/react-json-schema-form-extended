import { Col, Row } from "antd";
import { ProductForm } from "./productForm";

function ProductPage() {
  return (
    <Row gutter={12} style={{ padding: "1%" }}>
      <Col lg={24}>
      <h1>Form Ref #1 [Async Select + Media Upload]</h1>
      </Col>
      <Col lg={16}>
        <ProductForm />
      </Col>
    </Row>
  );
}

export { ProductPage };
