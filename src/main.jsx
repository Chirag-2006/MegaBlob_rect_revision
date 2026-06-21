import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AddPost,
  AllPosts,
  EditPost,
  Home,
  LoginPage,
  Post,
  SignUpPage,
} from "./pages/";
import { AuthLayout } from "./components/index.js";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route
//       index
//         // path="/"
//         element={
//           <AuthLayout authentication={false}>
//             <Home />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/login"
//         element={
//           <AuthLayout authentication={false}>
//             <LoginPage />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <AuthLayout authentication={false}>
//             <SignUpPage />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/all-post"
//         element={
//           <AuthLayout authentication>
//             <AllPosts />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/add-post"
//         element={
//           <AuthLayout authentication={true}>
//             <AddPost />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/edit-post/:id"
//         element={
//           <AuthLayout authentication={true}>
//             <EditPost />
//           </AuthLayout>
//         }
//       />
//       <Route
//         path="/post/:id"
//         element={
//           <AuthLayout authentication={true}>
//             <Post />
//           </AuthLayout>
//         }
//       />
//     </Route>,
//   ),
// );


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={
        <AuthLayout authentication={false}>
          <Home />
        </AuthLayout>
      } />
      <Route path="login" element={
        <AuthLayout authentication={false}>
          <LoginPage />
        </AuthLayout>
      } />
      <Route path="signup" element={
        <AuthLayout authentication={false}>
          <SignUpPage />
        </AuthLayout>
      } />
      <Route path="all-post" element={
        <AuthLayout authentication={true}>
          <AllPosts />
        </AuthLayout>
      } />
      <Route path="add-post" element={
        <AuthLayout authentication={true}>
          <AddPost />
        </AuthLayout>
      } />
      <Route path="edit-post/:id" element={
        <AuthLayout authentication={true}>
          <EditPost />
        </AuthLayout>
      } />
      <Route path="post/:id" element={
        <AuthLayout authentication={true}>
          <Post />
        </AuthLayout>
      } />
    </Route>
  )
);
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/login",
//         element: (
//           <AuthLayout authentication={false}>
//             <LoginPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/signup",
//         element: (
//           <AuthLayout authentication={false}>
//             <SignUpPage />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/all-posts",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <AllPosts />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/add-post",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <AddPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/edit-post/:slug",
//         element: (
//           <AuthLayout authentication>
//             {" "}
//             <EditPost />
//           </AuthLayout>
//         ),
//       },
//       {
//         path: "/post/:slug",
//         element: <Post />,
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
