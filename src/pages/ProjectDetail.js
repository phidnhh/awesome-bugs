import React, { useEffect } from 'react'
import Content from '../components/main/Content'
import Header from '../components/main/Header'
import Info from '../components/main/Info'
import { useSelector, useDispatch } from "react-redux";
import { GET_PROJECT_DETAIL_API } from '../redux/constants/AwesomeBugs';

export default function ProjectDetail(props) {
  const dispatch = useDispatch();
  const projectDetail = useSelector(state => state.ProjectReducer.projectDetail);
  console.log("~ projectDetail", projectDetail);

  useEffect(() => {
    let projectId = props.match?.params.projectId;
    if(projectId) {
      dispatch({
        type: GET_PROJECT_DETAIL_API,
        projectId: projectId
      });
    }
  }, []);

  return (
    <div className="main">
      <Header breadcrumb={[projectDetail.projectName, "Awesome Board"]}/>
      <Info projectDetail={projectDetail}/>
      <Content projectDetail={projectDetail}/>
    </div>
  )
}
