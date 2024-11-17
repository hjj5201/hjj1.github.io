//编辑task组件
import { useForm } from "antd/lib/form/Form";
import React, { useEffect } from "react";
import { useTasksModal, useTasksQueryKey } from "./util";
import { useEditTask } from "utils/task";
import { Form, Modal ,Input,Button } from "antd";
import { UserSelect } from "components/user-select";
import { TaskTypeSelect } from "components/task-type-select";
import { ModalProps } from "antd/lib/modal";
import { useDeleteTask } from "utils/task";



// const layout = {
//     labelCol:{span:8},
//     wrapperCol:{span:16}
// }


// export const TaskModal = () => {
//     const [form] = useForm()
//     const {editingTaskId,editingTask,close,startEdit} = useTasksModal()
//     const {mutateAsync:editTask,isLoading:editLoading} = useEditTask(useTasksQueryKey())

//     const onCancel = () => {
//         // 窗口关掉
//         close()
//         // 表单重置
//         form.resetFields()
//     }
//     //打开窗口
//     const onOk = async () => {
//         await editTask({...editingTask, ...form.getFieldValue})
//         close()
//     }

//     useEffect(() => {
//         form.setFieldsValue(editingTask)
//     },[form,editTask])
//     // @ts-ignore
//     return <Modal 
//     okText={'确认'} 
//     cancelText={'取消'} 
//     confirmLoading={editLoading} 
//     title={'编辑任务'} visible={!!editingTaskId}
//     onCancel={onCancel}
//     onOk={onOk}
//     >
//         <Form initialValues={editingTask} form={form} {...layout}>
//             <Form.Item label={'任务名'} name={'name'} rules={[{required:true,message:'请输入任务名'}]}>
//                 <Input/>
//             </Form.Item>
//             <Form.Item label={'经办人'} name={'processorId'}>
//                 <UserSelect defaultOptionName={'经办人'}/>
//             </Form.Item>
//             <Form.Item label={'类型'} name={'typeId'}>
//                 <TaskTypeSelect/>
//             </Form.Item>
//         </Form>
//     </Modal>
// }

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  export const TaskModal = () => {
    const [form] = useForm();
    const { editingTaskId, editingTask, close } = useTasksModal();
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
      useTasksQueryKey()
    );
    const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());
    const onCancel = () => {
      // 窗口关掉
      close();
      // 表单重置
      form.resetFields();
    };
    // 打开窗口
    const onOk = async () => {
      await editTask({ ...editingTask, ...form.getFieldsValue() });
      close();
    };
    // 删除看板
    const startDelete = () => {
      close();
      Modal.confirm({
        okText: "确定",
        cancelText: "取消",
        title: "确定删除任务吗",
        onOk() {
          return deleteTask({ id: Number(editingTaskId) });
        },
      });
    };

    
    useEffect(() => {
      form.setFieldsValue(editingTask);
    }, [form, editingTask]);
    
    return (
        // @ts-ignore
      <Modal
        forceRender={true}
        onCancel={onCancel}
        onOk={onOk}
        okText={"确认"}
        cancelText={"取消"}
        confirmLoading={editLoading}
        title={"编辑任务"}
        visible={!!editingTaskId}
      >
        <Form {...layout} initialValues={editingTask} form={form}>
          <Form.Item
            label={"任务名"}
            name={"name"}
            rules={[{ required: true, message: "请输入任务名" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"经办人"} name={"processorId"}>
            <UserSelect defaultOptionName={"经办人"} />
          </Form.Item>
          <Form.Item label={"类型"} name={"typeId"}>
            <TaskTypeSelect />
          </Form.Item>
        </Form>
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={startDelete}
            style={{ fontSize: "14px" }}
            size={"small"}
          >
            删除
          </Button>
        </div>
      </Modal>
    );
  };
