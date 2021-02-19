import React from 'react'
import { useSelector } from 'react-redux';
import { Spin } from 'antd';


export default function LoadingComponent() {
    const { isLoading } = useSelector(state => state.LoadingReducer);
    if(isLoading) {
        return (
          <div className="awesomebugs-loading">
            <Spin tip="Đang tải dữ liệu..." size="large"/>
          </div>
        )
    } else {
        return "";
    }
}
