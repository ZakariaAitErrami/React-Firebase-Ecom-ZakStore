import React, { Component } from "react";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import "./default.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth, handleUserProfile } from './firebase/utils'
import Registration from "./pages/Registration";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";
import Login from './pages/Login'


const initialState = {
  currentUser: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const useRef = await handleUserProfile(userAuth);
        useRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      })
      // if(!userAuth){
      //   this.setState({
      //     ...initialState
      //   });
      // }
      // this.setState({
      //   currentUser: userAuth
      // });

    });
  }

  componentWillUnmount() {
    this.authListener(); 
  }

  render() {

    const { currentUser } = this.state;
    return (
      <div className="App">
          {/* <Homepage /> */}
          <Routes>
            <Route exact path="/" element={<HomepageLayout currentUser={currentUser}>
              <Homepage/>
            </HomepageLayout>} />
            
            <Route exact path="/registration" element={ currentUser ? <Navigate to="/" /> : (<MainLayout currentUser={currentUser}>
              <Registration/>
            </MainLayout>)}/>
            
            {/* <Route exact path="/login" element={<MainLayout currentUser={currentUser}>
              <Login/>
            </MainLayout>}/> */}

            <Route exact path="/login" 
            element={ currentUser ? <Navigate to="/" /> : (<MainLayout currentUser={currentUser}>
              <Login/>
            </MainLayout>)}/>


          </Routes>
      </div>
    );
  }
}

export default App;
