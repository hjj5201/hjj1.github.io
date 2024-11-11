//抽屉组件
import React from 'react';
import { Drawer, Button } from 'antd';
import { useProjectModal } from './util';

export const ProjectModal = () => {
  const {projectModalOpen,close,open} = useProjectModal()
  return (
    <Drawer width="100%" visible={projectModalOpen} onClose={close}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
