import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT_CATEGORY_API, SET_SUBMIT_EDIT_PROJECT_FUNC, UPDATE_PROJECT_API } from "./../../redux/constants/AwesomeBugs";
import { withFormik } from 'formik';
import * as yup from 'yup';

function FormEditProject(props) {
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
    // send handleSubmit func of withFormik to hocs/Drawer.js
    dispatch({
      type: SET_SUBMIT_EDIT_PROJECT_FUNC,
      submitFunction: handleSubmit
    });

    // fetch data project category with redux-saga
    dispatch({
      type: GET_PROJECT_CATEGORY_API,
    });    
  }, []);
  
  const projectCategory = useSelector(state => state.ProjectReducer.projectCategory);

  let handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  }

  return (
    <form className="container">
      <div className="row mb-3">
        <div className="form-group col-2">
          <label>Id</label>
          <input value={values.id} disabled type="text" name="id" className="form-control"/>
        </div>
        <div className="form-group col-5">
          <label>Project name</label>
          <input value={values.projectName} onChange={handleChange} type="text" name="projectName" className="form-control"/>
        </div>
        <div className="form-group col-5">
          <label>Project Category</label>
          <div className="form-group">
            <select onChange={handleChange} className="form-control" name="categoryId"> value={values.categoryId}
              {
                projectCategory.map((item, index) => {
                  return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="form-group">
          <label>Description</label>
          <Editor
            name="description"
            initialValue={values.description}
            value={values.description}
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
            onEditorChange={handleEditorChange}
          ></Editor>
        </div>
      </div>
    </form>
  )
}


const formEditProjectWithFormik  = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    let projectEdit = props.projectEdit;
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      description: projectEdit?.description,
      categoryId: projectEdit?.categoryId
    }
  },
  validationSchema: yup.object().shape({
    // email: Yup.string()
    //   .required("Vui lòng nhập email.")
    //   .email("Email không hợp lệ."),
    // password: Yup.string()
    //   .required("Vui lòng nhập mật khẩu.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let projectUpdate = {
      ...values,
      creator: props.projectEdit?.creator?.id
    }

    setSubmitting(true);
    props.dispatch({
      type: UPDATE_PROJECT_API,
      projectUpdate: projectUpdate
    });
  },
})(FormEditProject);

const mapStateToProps = (state) => {
  return {
    projectEdit: state.ProjectReducer.projectEdit
  }
}
export default connect(mapStateToProps)(formEditProjectWithFormik);