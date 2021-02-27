import React from "react"
import { Avatar } from "antd";
import { GET_TASK_DETAIL_MODAL_API, UPDATE_STATUS_TASK_API } from "../../redux/constants/AwesomeBugs";
import { useDispatch } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Content(props) {
  const dispatch = useDispatch();
  const projectDetail = props.projectDetail;
  
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
  
  const handleDragEnd = (result) => {
    console.log("~ result", result);
    let { destination, source } = result;
    if(!destination) {
      return;
    }
    if(source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }
    dispatch({
      type: UPDATE_STATUS_TASK_API,
      taskStatus: {
        taskId: result.draggableId,
        statusId: destination.droppableId
      },
      projectId: projectDetail.id
    })
  }

  const renderCardTaskList = () => {
    return <DragDropContext onDragEnd={handleDragEnd}>
      {
        projectDetail.lstTask?.map((taskListDetail,index) => {
          return (
            <Droppable 
              key={index}
              droppableId={taskListDetail.statusId}
            >
              {
                (provided) => {
                  return (
                    <div key={index} className="card">
                      <div className="card-header">
                        {taskListDetail.statusName}
                      </div>
                      <ul 
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="list-group list-group-flush"
                      >
                        {
                          taskListDetail.lstTaskDeTail.map((task,index) => {
                            return (
                              <Draggable
                                key={task.taskId.toString()}
                                index={index}
                                draggableId={task.taskId.toString()}
                              >
                                {
                                  (provided) => {
                                    return (
                                      <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        key={index} 
                                        className="list-group-item" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#infoModal"
                                        onClick={() => {
                                          dispatch({
                                            type: GET_TASK_DETAIL_MODAL_API,
                                            taskId: task.taskId
                                          });
                                        }}
                                      >
                                        <p>
                                          {task.taskName}
                                        </p>
                                        <div className="block" style={{display: 'flex'}}>
                                          <div className="block-left">
                                            {
                                              task.taskTypeDetail?.id == 1? 
                                                <i className="fa fa-exclamation-circle me-1"></i>:
                                                <i className="fa fa-check-square me-1" />
                                            }
                                            <i className="fa fa-arrow-up" style={{
                                              color: `${ renderSwitchPriority(task.priorityTask.priorityId) }`
                                            }}></i>

                                          </div>
                                          <div className="block-right">
                                            <div className="avatar-group" style={{display: 'flex'}}>
                                              {
                                                task.assigness.map((assignee, index) => {
                                                  return <Avatar key={index} src={`${assignee.avatar}&background=random&color=random`} />
                                                })
                                              }
                                            </div>
                                          </div>
                                        </div>
                                      </li>                                      
                                    )
                                  }
                                }
                              </Draggable>
                            );
                          })
                        }
                        {provided.placeholder}
                      </ul>
                    </div>                    
                  )
                }
              }
            </Droppable>
          );
        })
      }
    </DragDropContext>
  }
  return (
    <>
      <div className="content" style={{display: 'flex'}}>
        {renderCardTaskList()}
      </div>
      <br/><br/>
    </>
  )
}

{/* <div className="card" style={{width: '17rem', height: '25rem'}}>
<div className="card-header">
  BACKLOG 3
</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item" data-bs-toggle="modal" data-bs-target="#infoModal" style={{cursor: 'pointer'}}>
    <p>
      Each issue has a single reporter but can have multiple
      assignees
    </p>
    <div className="block" style={{display: 'flex'}}>
      <div className="block-left">
        <i className="fa fa-bookmark" />
        <i className="fa fa-arrow-up" />
      </div>
      <div className="block-right">
        <div className="avatar-group" style={{display: 'flex'}}>
          <div className="avatar">
            <img src={avatar1} alt="avatar" />
          </div>
          <div className="avatar">
            <img src={avatar2} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  </li>
  <li className="list-group-item">
    <p>
      Each issue has a single reporter but can have multiple
      assignees
    </p>
    <div className="block" style={{display: 'flex'}}>
      <div className="block-left">
        <i className="fa fa-check-square" />
        <i className="fa fa-arrow-up" />
      </div>
      <div className="block-right">
        <div className="avatar-group" style={{display: 'flex'}}>
          <div className="avatar">
            <img src={avatar1} alt="avatar" />
          </div>
          <div className="avatar">
            <img src={avatar2} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  </li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div>

<div className="card" style={{width: '17rem', height: '25rem'}}>
<div className="card-header">
  SELECTED FOR DEVELOPMENT 2
</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>

<div className="card" style={{width: '17rem', height: '25rem'}}>
<div className="card-header">
  IN PROGRESS 2
</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
</ul>
</div>

<div className="card" style={{width: '17rem', height: '25rem'}}>
<div className="card-header">
  DONE 3
</div>
<ul className="list-group list-group-flush">
  <li className="list-group-item">Cras justo odio</li>
  <li className="list-group-item">Dapibus ac facilisis in</li>
  <li className="list-group-item">Vestibulum at eros</li>
</ul>
</div> */}
