//抽屉组件
import React, { useEffect } from 'react';
import { Drawer, Button, Spin,Form,Input } from 'antd';
import { useProjectModal, useProjectsQueryKey } from './util';
import { UserSelect } from 'components/user-select';
import { useAddProject, useEditProject } from 'utils/project';
import { useForm } from 'antd/lib/form/Form';
import { ErrorBox } from 'components/lib';
import styled from '@emotion/styled';

export const ProjectModal = () => {
  const {projectModalOpen,close,open ,editingProject,isLoading} = useProjectModal()
  const title = editingProject ? '编辑项目' : '创建项目'
  // 判断为编辑还是创建
  const useMutateProject = editingProject ? useEditProject: useAddProject
  const {mutateAsync,error,isLoading:mutateLoading} = useMutateProject(useProjectsQueryKey())
  // 重置表单
  const [form] = useForm()
  const onFinish = (values:any) => {
    mutateAsync({...editingProject,...values}).then(() => {
      // 完成异步任务后重置表单
      form.resetFields()
      close()
    })
  }

    //当editingProjecr（主要）改变时重置表单 
    useEffect(()=>{
      form.setFieldsValue(editingProject)
    },[editingProject,form])

  return (
    <Drawer width="100%" visible={projectModalOpen} onClose={close} forceRender={true}>
      <Container>
      {
        isLoading ? <Spin size={"large"}/> : <>
          <h1>
            {title}
          </h1>
            <ErrorBox error={error}></ErrorBox>
            <Form form={form} layout={"vertical"} style={{width:'40rem'}} onFinish={onFinish}>
                <Form.Item label={'名称'} name={'name'} rules={[{required:true,message:'请输入项目名'}]}>
                    <Input placeholder={'请输入项目名称'}/>
                </Form.Item>
                <Form.Item label={'部门'} name={'organization'} rules={[{required:true,message:'请输入部门名'}]}>
                    <Input placeholder={'请输入部门名称'}/>
                </Form.Item>
                <Form.Item label={'负责人'} name={'personId'} >
                    <UserSelect defaultOptionName={'负责人'}/>
                </Form.Item>

                <Form.Item>
                  <Button loading={mutateLoading} type={"primary"} htmlType={"submit"} style={{textAlign:"right"}}>
                    提交
                  </Button>
                </Form.Item>
            </Form>
        </>
      }
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default ProjectModal;
