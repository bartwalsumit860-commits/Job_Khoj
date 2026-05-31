import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home"
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/Admin_components/Companies";
import CreateCompany from "./components/Admin_components/CreateCompany";
import CompanySetup from "./components/Admin_components/CompanySetup";
import AdminJobs from "./components/Admin_components/AdminJobs";
import Jobs from "./components/Jobs";
import PostJobs from "./components/Admin_components/PostJobs";
import Applicants from "./components/Admin_components/Applicants";
import { Toaster } from "./components/ui/sonner";
import ProtectedRoute from "./components/Admin_components/ProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },{
    path:"/jobs/description/:id",
    element:<JobDescription/>
  },
  
  //admin
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  }
  ,
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/edit/:id",
    element:<ProtectedRoute><PostJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }

])
function App() {

  return (
    <>
      <RouterProvider router = {appRouter}/>
      <Toaster richColors position="top-center" />
    </>
  )
}

export default App;
