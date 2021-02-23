import React, { useEffect, useState } from 'react'
import { Table, Button, Space } from 'antd';
// import ReactHtmlParser from 'react-html-parser';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { DELETE_PROJECT_API, GET_PROJECT_CATEGORY_API, GET_PROJECT_LIST_API, OPEN_FORM_EDIT_PROJECT, SET_PROJECT_EDIT } from '../redux/constants/AwesomeBugs';
import { Tag } from 'antd';
import _ from "lodash";
import FormEditProject from '../components/form/FormEditProject';
import { Popconfirm, message } from 'antd';

export default function ProjectManagement() {
  const {projectList, projectCategory} = useSelector(state => state.ProjectReducer);
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: {
      column: {
        dataIndex: "id",
        ellipsis: true,
        key: "id",
        sortOrder: "descend"
      },
      columnKey: "id",
      field: "id",
      order: "descend",
    },
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
    setState({
      ...state,
      filteredInfo: null
    });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
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
      sorter: (item2, item1) => item2.id - item1.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => item2.projectName > item1.projectName? 1: -1,
      sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      filters: projectCategoryFilters,
      filteredValue: filteredInfo.categoryName || null,
      onFilter: (value, record) => record.categoryName.includes(value),
      sorter: (item2, item1) => item2.categoryName > item1.categoryName? 1: -1,
      sortOrder: sortedInfo.columnKey === 'categoryName' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: "Creator",
      key: "creator",
      filters: creatorFilters,
      filteredValue: filteredInfo.creator || null,
      render: (text, record, index) => <Tag color="blue">{record.creator?.name}</Tag>,
      onFilter: (value, record) => record.creator?.name.includes(value),
      sorter: (item2, item1) => item2.creator?.name > item1.creator?.name? 1: -1,
      sortOrder: sortedInfo.columnKey === 'creator' && sortedInfo.order,
      ellipsis: true,
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
  
          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              dispatch({
                type: DELETE_PROJECT_API,
                projectId: record.id
              });              
            }}
            okText="Yes"
            cancelText="No"
          >
            <span className="action-icon"><DeleteOutlined/></span>
          </Popconfirm>          
        </Space>
      ),
    },
  ];  

  return (
    <div className="container table-project-management ">
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
  </div>
  )
}
