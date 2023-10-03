import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createContext } from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useCookies } from 'react-cookie'
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export const ThemeContext = createContext(null)

function App() {
  const [cookies, setCookie] = useCookies(["theme"]);

  const [theme, setTheme] = useState(cookies.theme?cookies.theme:'light');

  window.addEventListener('load', () => {
    const bodyStyle = document.getElementsByTagName('body')[0].style
    if(!cookies.theme || cookies.theme == 'light') {
      bodyStyle.backgroundColor = '#fff'
      bodyStyle.color = 'rgb(22, 21, 21)' 
    }else{
      bodyStyle.backgroundColor = 'rgb(22, 21, 21)'
      bodyStyle.color = '#ebecec'
    }
  })

  const toggleTheme = () => {
    const bodyStyle = document.getElementsByTagName('body')[0].style
    if(theme == 'dark') {
      bodyStyle.backgroundColor = '#fff'
      bodyStyle.color = 'rgb(22, 21, 21)'
    }else{
      bodyStyle.backgroundColor = 'rgb(22, 21, 21)'
      bodyStyle.color = '#ebecec'
    }
    setCookie("theme", theme == 'light'? 'dark':'light', { path: "/" });
    setTheme(theme == 'light'? 'dark':'light')
  }

  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  })

  return (<>
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ApolloProvider client={client}>
        <Router>
          <div id={theme}>
            <div className={`container-fluid p-0 vh-500`}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ApolloProvider>
    </ThemeContext.Provider>
  </>)
}

export default App
