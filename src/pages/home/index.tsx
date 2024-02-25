import { List } from '@refinedev/antd';
import { useTranslate } from '@refinedev/core';
import { Col, Empty, Row } from 'antd';

export const Home = () => {
  const translate = useTranslate();

  return (
    <List title={translate('home.home')}>
      <Row>
        <Col span={24}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        </Col>
      </Row>
    </List>
  );
};
