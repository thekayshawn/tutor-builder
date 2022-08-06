import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { api_hosting, user_token, DASHBOARD_URL } from '../constants';
const addFirstpage= async()=>{
    const pathName = window.location.pathname;
    const lm_id = pathName.split('/', 3);
    const title=lm_id[2];
    const description_demo="no description";
    const formData = new FormData()
    formData.append('content_id', lm_id[1]);
    formData.append('title',title );
    formData.append('description', description_demo);
    formData.append('thumbnail', '');
    let user = JSON.parse(localStorage.getItem("user"));
    const authAxios = axios.create({
      headers: { "X-Auth-Token": `${user.access_token}` }
    })
    const res = await authAxios.post(`${api_hosting}/learning-material/add-page`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      
    });
    console.log("page added response",res);
    if(res.status==200){
      localStorage.setItem("first","created");
      
      console.log("ohhh page is created");
      this.setState({
        page_meta_title: title,
        number_of_pages:1,
        currentPage:1
      });
      toast.success("Page Added Successfull!", {
        position: "bottom-right"
      });
    }
}

export default addFirstpage;