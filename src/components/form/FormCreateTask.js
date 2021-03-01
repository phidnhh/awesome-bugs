import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Select, Slider } from 'antd';
import { connect, useSelector, useDispatch } from "react-redux";
import { CREATE_TASK_API, GET_PROJECT_LIST_API, GET_TASK_PRIORITY_API, GET_TASK_STATUS_API, GET_TASK_TYPE_API, GET_USER_BY_PROJECT_ID_API, SET_SUBMIT_FUNCTION } from '../../redux/constants/AwesomeBugs';
import { Form, withFormik } from 'formik';
import * as yup from 'yup';

function FormCreateTask(props) {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_PROJECT_LIST_API });
    dispatch({ type: GET_TASK_TYPE_API });
    dispatch({ type: GET_TASK_PRIORITY_API });
    dispatch({ type: GET_TASK_STATUS_API });

    dispatch({
      type: SET_SUBMIT_FUNCTION,
      submitFunction: handleSubmit
    });
  }, []);

  const { taskTypeList, taskPriorityList, taskStatusList } = useSelector(state => state.TaskReducer);
  const projectList = useSelector(state => state.ProjectReducer.projectList);

  useEffect(() => {
    if(projectList[0]?.id) {
      dispatch({
        type: GET_USER_BY_PROJECT_ID_API,
        projectId: projectList[0]?.id
      });
    }
  }, [projectList]);
  const userByProjectId = useSelector(state => state.UserReducer.userByProjectId);

  let userOptions = userByProjectId.map((item,index) => {
    return { label: item.name, value: item.userId }    
  })
  
  const [size, setSize] = useState("default");
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0
  });

  let maxSlider = (+timeTracking.timeTrackingSpent) + (+timeTracking.timeTrackingRemaining);
  useEffect(() => {
    maxSlider = (+timeTracking.timeTrackingSpent) + (+timeTracking.timeTrackingRemaining);
  }, [timeTracking.timeTrackingSpent, timeTracking.timeTrackingRemaining]);

  let handleChangeSelectProject = (e) => {
    setFieldValue("projectId", +e.target.value);
    dispatch({
      type: GET_USER_BY_PROJECT_ID_API,
      projectId: +e.target.value
    });
  }

  return (
    <Form className="container form-create-task" onSubmit={handleSubmit}>
      <div className="form-group mb-2">
        <label>Project</label>
        <select className="form-select" name="projectId" onChange={handleChangeSelectProject}>
            {
              projectList.map((project,index) => {
                return <option key={index} value={project.id}>
                  {project.projectName}
                </option>
              })
            }
        </select>
      </div>
      <div className="row mb-2">
        <div className="form-group col-8">
          <label>Task name</label>
          <input className="form-control" name="taskName" onBlur={handleBlur} onChange={handleChange}/>
          {touched.taskName? <div className="text-danger">{errors.taskName}</div>: ""}
        </div>
        <div className="form-group col-4">
          <label>Status</label>
          <select className="form-select" name="statusId" onChange={handleChange}>
            {
              taskStatusList.map((task,index) => {
                return <option key={index} value={task.statusId}>
                  {task.statusName}
                </option>
              })
            }
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="form-group col-6">
          <label>Task type</label>
          <select className="form-select" name="typeId" onChange={handleChange}>
            {
              taskTypeList.map((task,index) => {
                return <option key={index} value={task.id}>
                  {task.taskType}
                </option>
              })
            }
          </select>
        </div>
        <div className="form-group col-6">
          <label>Priority</label>
          <select className="form-select" name="priorityId" onChange={handleChange}>
            {
              taskPriorityList.map((priority,index) => {
                return <option key={index} value={priority.priorityId}>
                  {priority.priority}
                </option>
              })
            }
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="form-group col-6">
          <label>Assignees</label>
          <Select
            mode="multiple"
            size={size}
            options={userOptions}
            optionFilterProp="label"
            placeholder="Select members"
            onChange={(values) => {
              setFieldValue("listUserAsign", values);
            }}
            onSearch={(value) => {}}
            style={{ width: '100%' }}
          ></Select>
        </div>
        <div className="form-group col-6">
          <label>Time tracking</label>
          <Slider
            value={ +timeTracking.timeTrackingSpent } 
            max={ maxSlider }
          ></Slider>
          <div className="row text-time-tracking">
            <div className="col-6 text-start">{
              (+timeTracking.timeTrackingSpent)>0? `${+timeTracking.timeTrackingSpent}h logged`: "No time logged"
            }</div>
            <div className="col-6 text-end">{+timeTracking.timeTrackingRemaining}h remaining</div>
          </div>
        </div>
      </div>
      <div className="row mb-2">
        <div className="form-group col-4">
          <label>Original Estimate (hours)</label>
          <input type="number" defaultValue="0" min="0" className="form-control" name="originalEstimate" onChange={handleChange}/>
        </div>
        <div className="form-group col-4">
          <label>Time spent (hours)</label>
          <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
            setTimeTracking({
              ...timeTracking,
              timeTrackingSpent: +e.target.value
            });
            setFieldValue("timeTrackingSpent", +e.target.value);
          }}/>
        </div>
        <div className="form-group col-4">
          <label>Time remaining (hours)</label>
          <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
            setTimeTracking({
              ...timeTracking,
              timeTrackingRemaining: +e.target.value
            });
            setFieldValue("timeTrackingRemaining", +e.target.value);
          }}/>
        </div>
        </div>      
      <div className="form-group">
        <label>Description</label>
        <Editor
            name="description"
            initialValue=""
            init={{
              height: 200,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }}
            onEditorChange={(content, editor) => {
              setFieldValue("description", content);
            }}
          ></Editor>
      </div>
      {/* <button type="submit" className="btn btn-info mt-3">Submit</button> */}
    </Form>
  )
}

const formCreateTaskWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let { 
      taskTypeList, 
      taskPriorityList, 
      taskStatusList, 
      projectList, 
    } = props;

    return {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: taskStatusList[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: projectList[0]?.id,
      typeId: taskTypeList[0]?.id,
      priorityId: taskPriorityList[0]?.priorityId
    }
  },
  validationSchema: yup.object().shape({
    taskName: yup.string()
      .required("Please enter a task name.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {    
    // console.log("~ values", values);
    setSubmitting(true);
    props.dispatch({
      type: CREATE_TASK_API,
      newTask: values,
      projectId: values.projectId
    });
  },
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    taskTypeList: state.TaskReducer.taskTypeList,
    taskPriorityList: state.TaskReducer.taskPriorityList,
    taskStatusList: state.TaskReducer.taskStatusList,
    projectList: state.ProjectReducer.projectList
  }
}

export default connect(mapStateToProps)(formCreateTaskWithFormik);
