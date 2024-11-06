//抽屉组件
import React from 'react';
import { Drawer, Button } from 'antd';

export const ProjectModal = (props:{projectModalOpen: boolean, onClose: () => void}) => {
  return (
    <Drawer width="100%" visible={props.projectModalOpen} onClose={props.onClose}>
      <h1>Project Modal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
