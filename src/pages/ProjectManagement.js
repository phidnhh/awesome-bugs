import React, { useEffect, useState } from 'react'
import { Table, Button, Space } from 'antd';
import ReactHtmlParser from 'react-html-parser';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { GET_PROJECT_CATEGORY_API, GET_PROJECT_LIST_API, OPEN_FORM_EDIT_PROJECT, SET_PROJECT_EDIT } from '../redux/constants/AwesomeBugs';
import { Tag, Divider } from 'antd';
import _ from "lodash";
import FormEditProject from '../components/form/FormEditProject';

export default function ProjectManagement() {
  const {projectList, projectCategory} = useSelector(state => state.ProjectReducer);
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,    
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_LIST_API
    });
    dispatch({
      type: GET_PROJECT_CATEGORY_API
    });    
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  let projectCategoryFilters = [];
  projectCategory?.map((item) => {
    projectCategoryFilters.push({
      text: item.projectCategoryName,
      value: item.projectCategoryName
    });
  })  


  let creatorFilters = [];
  projectList?.map((item) => {
    creatorFilters.push({
      text: item.creator.name,
      value: item.creator.name
    });
  });
  creatorFilters = _.uniqWith(creatorFilters, _.isEqual);

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => item2.id - item1.id
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => item2.projectName > item1.projectName? 1: -1
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      filters: projectCategoryFilters,
      sorter: (item2, item1) => item2.categoryName > item1.categoryName? 1: -1,
      onFilter: (value, record) => record.categoryName.includes(value)   
    },
    {
      title: "Creator",
      key: "creator",
      filters: creatorFilters,
      render: (text, record, index) => <Tag color="blue">{record.creator?.name}</Tag>,
      sorter: (item2, item1) => item2.creator?.name > item1.creator?.name? 1: -1,
      onFilter: (value, record) => record.creator?.name.includes(value)   
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: html => <div className="html-description">{ ReactHtmlParser(html) }</div>
    // },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <span onClick={() => {
            dispatch({
              type: OPEN_FORM_EDIT_PROJECT,
              Component: <FormEditProject/>,
            });

            dispatch({
              type: SET_PROJECT_EDIT,
              projectEdit: record
            });
          }}className="action-icon"><EditOutlined/></span>
          <span className="action-icon"><DeleteOutlined/></span>
        </Space>
      ),
    },
  ];  

  return (
    <div className="container table-project-management ">
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
  </div>
  )
}
