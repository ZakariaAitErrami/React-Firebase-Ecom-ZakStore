import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { checkUserSession } from './redux/User/user.actions';

//components
import AdminToolbar from './components/AdminToolbar';

// hoc
import WithAuth from './hoc/withAuth';
import WithAdminAuth from './hoc/withAdminAuth';

// layouts
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// pages
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Revovery';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import './default.scss';

const App = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession())
  }, []);

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path="/" render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )}
        />
        <Route path="/registration" render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
        <Route path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path="/recovery" render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path="/dashboard" render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />
        <Route path="/admin" render={() => (
          <WithAdminAuth>
            <MainLayout>
              <Admin />
            </MainLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;
// const initialState = {
//   currentUser: null
// };

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       ...initialState
//     }
//   }

//   authListener = null;

//   componentDidMount() {
//     this.authListener = auth.onAuthStateChanged(async userAuth => {
//       if(userAuth){
//         const useRef = await handleUserProfile(userAuth);
//         useRef.onSnapshot(snapshot => {
//           this.setState({
//             currentUser: {
//               id: snapshot.id,
//               ...snapshot.data()
//             }
//           })
//         })
//       }

//       this.setState({
//         ...initialState
//       })
//       // if(!userAuth){
//       //   this.setState({
//       //     ...initialState
//       //   });
//       // }
//       // this.setState({
//       //   currentUser: userAuth
//       // });

//     });
//   }

//   componentWillUnmount() {
//     this.authListener();
//   }

//   render() {

//     const { currentUser } = this.state;
//     return (
//       <div className="App">
//           {/* <Homepage /> */}
//           <Routes>
//             <Route exact path="/" element={<HomepageLayout currentUser={currentUser}>
//               <Homepage/>
//             </HomepageLayout>} />

//             <Route exact path="/registration" element={ currentUser ? <Navigate to="/" /> : (<MainLayout currentUser={currentUser}>
//               <Registration/>
//             </MainLayout>)}/>

//             {/* <Route exact path="/login" element={<MainLayout currentUser={currentUser}>
//               <Login/>
//             </MainLayout>}/> */}

//             <Route exact path="/login"
//             element={ currentUser ? <Navigate to="/" /> : (<MainLayout currentUser={currentUser}>
//               <Login/>
//             </MainLayout>)}/>

//               <Route exact path="/recovery" element={<MainLayout>
//                 <Recovery />
//               </MainLayout>}/>
//           </Routes>
//       </div>
//     );
//   }
// }

// export default App;
