import React, { useEffect } from 'react'
import Header from '../components/main/Header'
import { Editor } from '@tinymce/tinymce-react';
import { connect, useDispatch, useSelector } from "react-redux";
import { withFormik } from 'formik';
import * as Yup from "yup";
import { CREATE_PROJECT_API, GET_PROJECT_CATEGORY_API } from '../redux/constants/AwesomeBugs';

function CreateProject(props) { 
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue
  } = props;  

  let handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: GET_PROJECT_CATEGORY_API,
    });
  }, []);

  const projectCategory = useSelector(state => state.ProjectReducer.projectCategory);

  return (
    <div className="container w-50">
      <Header breadcrumb={ ["Awesome Bugs 1.0", "Create Project"] } />
      <form onSubmit={handleSubmit} className="form-create-project">
        <div className="form-group">
          <label>Name</label>
          <input onChange={handleChange} className="form-control" name="projectName"/>
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
            onEditorChange={handleEditorChange}
          />          
        </div>
        <div className="form-group">
          <label>Project Category</label>
          <select onChange={handleChange} className="form-control" name="categoryId">
            {
              projectCategory.map((item, index) => {
                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
              })
            }
          </select>
        </div>
        <button type="submit" className="btn btn-info mt-2">Create project</button>
      </form>
    </div>
  )
}

const createProjectWithFormik  = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.projectCategory[0]?.id
    }
  },
  validationSchema: Yup.object().shape({
    // email: Yup.string()
    //   .required("Vui lòng nhập email.")
    //   .email("Email không hợp lệ."),
    // password: Yup.string()
    //   .required("Vui lòng nhập mật khẩu.")
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(true);
    props.dispatch({
      type: CREATE_PROJECT_API,
      newProject: values
    })
  },
})(CreateProject);

const mapStateToProps = (state) => {
  return {
    projectCategory: state.ProjectReducer.projectCategory
  }
}
export default connect(mapStateToProps)(createProjectWithFormik);