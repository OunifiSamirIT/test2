import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, Login, Profile,HomeGlobal,EditPage,AddFriends, Register,Gallery ,RegisterStep,PostCard,ResetPasswordwithEmail, ResetPassword,PlayerInfo,Terrain } from "./pages";
import { EditProfile ,MyModal } from "./components";
// function Layout() {
//   const { user } = useSelector((state) => state.user);
//   const location = useLocation();

//   return user?.token ? ( 
//     <Outlet />
//   ) : (
//     <Navigate to='/login' state={{ from: location }} replace />
//   );
// }

function App() {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div data-theme={theme} className='w-full min-h-[100vh]'>
      <Routes> 
        {/* <Route element={<Layout />}> */}
        <Route path='/home' element={<Home />} />
        <Route path='/Terrain' element={<Terrain />} />
        <Route path='/PlayerInfo/:id?' element={<PlayerInfo />} />
          <Route exact path='/' element={<HomeGlobal />} />
          <Route path='/profile/:id?' element={<Profile />} />
          <Route path='/profile/edit' element={<EditProfile />} />
        {/* </Route> */}
        <Route path="/edit/:articleId" element={<EditPage />} />
        <Route path="/addFriend" element={<AddFriends />} />
        
        <Route exact path='/gallery/:id' element={<Gallery />} />
        <Route exact path='/testCard' element={<PostCard />} />
        <Route path='/register' element={<RegisterStep />} />
        <Route path='/login' element={<Login />} />
        <Route path='/login/:token' element={< ResetPasswordwithEmail/>} />
        <Route path='/reset-password' element={< ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
