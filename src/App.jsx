import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Practices from "./pages/PracticePages/Practices";
import DPPPage from './pages/PracticePages/DPPPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/LoginInPage';
import AddDPP from './components/practice/dpp/AddDpp';
import EditDPP from './components/practice/dpp/EditDpp';
import AddImportantQuestion from './components/practice/impQuestions/AddImportantQuestion';
import EditImportantQuestion from './components/practice/impQuestions/EditImportantQuestion';
import ImportantQuestionPage from './pages/PracticePages/ImportantQuestionsPage';
import SearchQuestions from './components/practice/impQuestions/SearchQuestions';
import AskQuestion from './components/AskDoubt/AskQuestion';
import AnswerList from './components/AskDoubt/AnswerList';
import PeerCollaboration from './components/AskDoubt/PeerCollaboration';
import AskDoubtPage from './pages/AskDoubtPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import CourseDetailPage from './pages/CourseDetailPage';
import CoursesPage from './pages/CoursesPage';
import CreateCoursePage from './components/courses/CreateCoursePage';
import UpdateCoursePage from './components/courses/UpdateCoursePage';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromStorage } from './store/AuthSlice';
import Cookies from 'js-cookie';
import AddLectures from './components/courses/AddLectures';



function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = Cookies.get('user');
    console.log(user) ; 
    if (user) {
      dispatch(setUserFromStorage(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    
    <Router>
      <Routes>
        {
          isLoggedIn ?    <Route path="/" element={<CoursesPage/>} />
           :  ( <Route path="/" element={<Home />} />)
        }
       
        {/* About Page */}
        <Route path="/about" element={<About />} />

        {/* Auth Pages */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Practice Pages */}
        <Route path="/practice" element={<Practices />} />
        
        {/* DPP Pages */}
        <Route path="/practice/alldpp" element={<DPPPage />} />
        <Route path="/practice/dpp/add" element={<AddDPP />} />
        <Route path="/practice/dpp/edit/:id" element={<EditDPP />} />

        {/* Important Questions Pages */}
        <Route path="/practice/importantquestions/all"  element={<ImportantQuestionPage />}/>
        <Route path="/practice/importantquestions/add" element={<AddImportantQuestion />} />
        <Route path="/practice/importantquestions/edit/:id" element={<EditImportantQuestion />} />
        <Route path="/practice/importantquestions/search" element={<SearchQuestions />} />

        {/* Ask Doubt Section */}
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/answers/:questionId" element={<AnswerList />} />
        <Route path="/peer-collaboration/:questionId" element={<PeerCollaboration />} />
        <Route path="/askdoubt" element={<AskDoubtPage/>} />
        <Route path="/askdoubt/questions/:questionId" element={<QuestionDetailPage/>} />

        <Route path="/courses" element={<CoursesPage/>} />
        <Route path="/courses/add" element={<CreateCoursePage/>} />
        <Route path="/courses/edit/:courseId" element={<UpdateCoursePage/>} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route path="/courses/:courseId/addlecture" element={<AddLectures />} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
