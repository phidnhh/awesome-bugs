import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import parse from "html-react-parser";
import { Select, Avatar, Card, Button } from 'antd';
import avatar1 from "./../../assets/avatar/avatar1.jfif";
import { GET_TASK_PRIORITY_API, GET_TASK_STATUS_API, GET_TASK_TYPE_API, UPDATE_TASK_ASSIGNESS, UPDATE_TASK_DETAIL_MODAL, REMOVE_TASK_ASSIGNEE, HANDLE_CHANGE_SAGA } from '../../redux/constants/AwesomeBugs';
import { Editor } from '@tinymce/tinymce-react';
import _ from "lodash";

const { Option } = Select;
const { Meta } = Card;

export default function InfoModal() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_TASK_STATUS_API });
    dispatch({ type: GET_TASK_PRIORITY_API });
    dispatch({ type: GET_TASK_TYPE_API });
  }, []);

  const { taskDetailModal, taskStatusList, taskPriorityList, taskTypeList } = useSelector(state => state.TaskReducer);
  const projectDetail = useSelector(state => state.ProjectReducer.projectDetail);

  const [stateEditor, setStateEditor] = useState({
    visible: false,
    historyContent: taskDetailModal.description,
    content: taskDetailModal.description
  });


    useEffect(() => {
    setStateEditor({
      ...stateEditor,
      historyContent: taskDetailModal.description,
      content: taskDetailModal.description      
    });
  }, [taskDetailModal]);


  let handleChange = (name, value) => {
    dispatch({
      type: HANDLE_CHANGE_SAGA,
      actionType: UPDATE_TASK_DETAIL_MODAL,
      name: name,
      value: value
    });
  }

  let renderTimeTracking = () => {
    let { originalEstimate, timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;
    let max = (+timeTrackingSpent) + (+timeTrackingRemaining);
    let percent = Math.round((+timeTrackingSpent)/max*100);

    return <>
      <div style={{display: 'flex'}}>
        <i className="fa fa-clock" />
        <div style={{width: '100%'}}>
          <div className="progress">
            <div className="progress-bar" role="progressbar" style={{width: `${percent}%`}} 
              aria-valuenow={(+timeTrackingSpent)}
              aria-valuemin={0}
              aria-valuemax={ max }
            ></div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            {
              (+timeTrackingSpent)>0 ? 
                <p className="estimate-time">{(+timeTrackingSpent)}h logged</p>:
                <p className="estimate-time">No time logged</p>
            }
            {
              (+timeTrackingRemaining)>0 ? 
                <p className="estimate-time">{(+timeTrackingRemaining)}h remaining</p>: 
                <p className="estimate-time">{(+originalEstimate)}h estimated</p>
            }
          </div>     
        </div>
      </div>
      <div className="row">
        <div className="estimate col-6">
          <label>Time spent</label>
          <input type="number" min="0" className="form-control"
            value={ (+timeTrackingSpent)? (+timeTrackingSpent): 0 }
            name="timeTrackingSpent"
            onChange={(e) => handleChange(e.target.name, +e.target.value)}
          />
        </div>
        <div className="estimate col-6">
          <label>Time remaining</label>
          <input type="number" min="0" className="form-control" 
            value={ (+timeTrackingRemaining)? (+timeTrackingRemaining): 0 } 
            name="timeTrackingRemaining"
            onChange={(e) => handleChange(e.target.name, +e.target.value)}
          />
        </div>
      </div>      
    </>
  }

  let renderSwitchPriority = (priority) => {
    switch(priority) {
      case 1:
        return "rgb(205, 19, 23)";
      case 2:
        return "rgb(233, 73, 74)";
      case 3:
        return "rgb(233, 127, 51)";
      case 4:
        return "rgb(45, 135, 56)";
      case 5:
        return "rgb(87, 165, 90)";
      default:
        return "rgb(233, 127, 51)";
    }
  }

  return (
      <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <Select
                dropdownStyle={{width:"100px"}}
                bordered={false}
                defaultValue={taskDetailModal.typeId} 
                value={taskDetailModal.typeId} 
                onChange={(value) => handleChange("typeId", +value)} 
              >
                {
                  taskTypeList.map((type, index) => {
                    return <Option key={index} value={type.id}>                    
                      {
                        type.id == 1? 
                          <div>
                            <i className="fa fa-lg fa-exclamation-circle me-2"/>
                            <span>BUG-{taskDetailModal.projectId}{taskDetailModal.taskId}</span>
                          </div>:
                          <div>
                            <i className="fa fa-lg fa-check-square me-2"/>
                            <span>TASK-{taskDetailModal.projectId}{taskDetailModal.taskId}</span>
                          </div>
                      }
                    </Option>
                  })
                }
              </Select>              
              
            </div>
            <div style={{display: 'flex'}} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{paddingRight: 20}}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{paddingRight: 20}}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{cursor: 'pointer'}} />
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">{taskDetailModal.taskName}</p>
                  <div className="description">
                    <b>Description</b>
                    <div className="mt-1">
                      {
                        stateEditor.visible?
                          <div>
                            <Editor
                              name="description"
                              initialValue={stateEditor.content}
                              value={stateEditor.content}
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
                                setStateEditor({
                                  ...stateEditor,
                                  content: content
                                });
                              }}
                            ></Editor>
                            <div className="mt-2">
                              <Button type="primary" className="me-2" onClick={() => {
                                setStateEditor({
                                  ...stateEditor,
                                  visible: false,
                                });
                                
                                dispatch({
                                  type: HANDLE_CHANGE_SAGA,
                                  actionType: UPDATE_TASK_DETAIL_MODAL,
                                  name: "description",
                                  value: stateEditor.content
                                });
                                
                              }}>Save</Button>
                              <Button onClick={() => setStateEditor({ ...stateEditor, visible: false })}>Cancel</Button>
                            </div>
                          </div>:
                          <div onClick={() => setStateEditor({...stateEditor, visible: true}) }>
                            { taskDetailModal.description? parse(taskDetailModal.description): ""  }
                          </div>
                      }
                    </div>
                  </div>
                  <div className="comment mt-3">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{display: 'flex'}}>
                      <div className="avatar">
                        <img src={avatar1} alt="avatar" />
                      </div>
                      <div className="input-comment">
                        <input type="text" placeholder="Add a comment ..." />
                        <p>
                          <span style={{fontWeight: 500, color: 'gray'}}>Protip:</span>
                          <span>press
                            <span style={{fontWeight: 'bold', background: '#ecedf0', color: '#b4bac6'}}>M</span>
                            to comment</span>
                        </p>
                      </div>
                    </div>
                    <div className="lastest-comment">
                      <div className="comment-item">
                        <div className="display-comment" style={{display: 'flex'}}>
                          <div className="avatar">
                            <img src={avatar1} alt="avatar" />
                          </div>
                          <div>
                            <p style={{marginBottom: 5}}>
                              Lord Gaben <span>a month ago</span>
                            </p>
                            <p style={{marginBottom: 5}}>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Repellendus tempora ex
                              voluptatum saepe ab officiis alias totam ad
                              accusamus molestiae?
                            </p>
                            <div>
                              <span style={{color: '#929398'}}>Edit</span>
                              •
                              <span style={{color: '#929398'}}>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status mb-3">
                    <h6>STATUS</h6>                
                    <Select
                      defaultValue={taskDetailModal.statusId} 
                      value={taskDetailModal.statusId} 
                      onChange={(value) => handleChange("statusId", value)} 
                    >
                      {
                        taskStatusList.map((status, index) => {
                          return <Option key={index} value={status.statusId}>
                            {status.statusName}
                          </Option>
                        })
                      }
                    </Select>
                  </div>
                  <div className="assignees mb-3 ">
                    <h6>ASSIGNEES</h6>
                    <div className="row">
                      {
                        taskDetailModal.assigness?.map((user, index) => {
                          return <Card key={index} 
                            className={ user.name.length<5? "card-assignees col-3": "card-assignees col-5" }
                            onClick={() => {
                              dispatch({
                                type: HANDLE_CHANGE_SAGA,
                                actionType: REMOVE_TASK_ASSIGNEE,
                                userId: user.id
                              });
                            }}
                          >
                              <Meta
                                avatar={
                                  <Avatar src={`${user.avatar}&background=random&color=random`} />
                                }
                                title={user.name}
                                description={<i className="fa fa-times"></i>}
                              />
                          </Card>
                        })
                      }
                      <div className="col-6 add-more-assignees">
                        <Select
                          bordered={false}
                          placeholder="+ Add more"
                          allowClear
                          value={[]}
                          onChange={(value) => {                          
                            let userSelect = projectDetail.members.find(member => member.userId == value);
                            userSelect = {
                              ...userSelect,
                              id: userSelect.userId,
                              alias: userSelect.name
                            }
                            userSelect = _.omit(userSelect,["userId", "email", "phoneNumber"]);

                            dispatch({
                              type: HANDLE_CHANGE_SAGA,
                              actionType: UPDATE_TASK_ASSIGNESS,
                              assignee: userSelect
                            });

                          }}
                          style={{ width: '100%' }}
                          dropdownClassName="dropdown-add-more-assignees"
                        >
                          {
                            projectDetail.members?.filter((member) => {
                              let index = taskDetailModal.assigness?.findIndex(item => item.id == member.userId);
                              if(index === -1) {
                                return true;
                              }
                              return false;
                            }).map((member, index) => {
                              return <Option key={index} value={member.userId}>
                                <Avatar src={`${member.avatar}&background=random&color=random`}/>
                                <span className="ms-2">{member.name}</span>
                              </Option>
                            })
                          }  
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="priority" style={{marginBottom: 20}}>
                    <h6>PRIORITY</h6>
                    <Select 
                      value={taskDetailModal.priorityId} 
                      defaultValue={taskDetailModal.priorityTask?.priorityId}
                      onChange={(value) => { handleChange("priorityId", +value) }}
                    >
                      {
                        taskPriorityList.map((priority, index) => {
                          return <Option key={index} value={priority.priorityId}>
                            <i className="fa fa-arrow-up me-1" style={{
                              color: `${ renderSwitchPriority(priority.priorityId) }`
                            }}></i>
                            {priority.priority}
                          </Option>
                        })
                      }
                    </Select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input type="number" min="0" className="form-control" 
                      defaultValue={ taskDetailModal.originalEstimate } 
                      name="originalEstimate"
                      onChange={(e) => handleChange(e.target.name, +e.target.value)}
                    />
                  </div>
                  <div className="time-tracking mt-3">
                    <h6>TIME TRACKING</h6>
                    { renderTimeTracking() }
                  </div>
                  <div style={{color: '#929398'}}>Create at a month ago</div>
                  <div style={{color: '#929398'}}>Update at a few seconds ago</div>
                </div>
              </div>
            </div>
          </div>         
        </div>
      </div>
    </div>
  )
}
