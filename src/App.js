
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { 
  BrowserRouter as Router, 
  Link, 
  Route, 
  Routes,
} from 'react-router-dom';
import { YearView, IntroView } from "./components/Views";
import ScrollToTop from './components/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-pro-sidebar/dist/css/styles.css';
import './scss/sidebar.scss';
import year_all_json from './year_all.json'

const king_all = [
  "1st Taejo", 
  "2nd Jeongjong",
  "3rd Taejong",
  "4th Sejong",
  "5th Munjong",
  "6th Danjong",
  "7th Sejo",
  "8th Yejong",
  "9th Seongjong",
  "10th Yeonsangun",
  "11th Jungjong",
  "12th Injong",
  "13th Myeongjong",
  "14th Seonjo",
  "14th Seonjo:revised",
  "15th Gwanghaegun",
  "16th Injo",
  "17th Hyojong",
  "18th Hyeonjong",
  "18th Hyeonjong:revised",
  "19th Sukjong",
  "19th Sukjong:revised",
  "20th Gyeongjong",
  "20th Gyeongjong:revised",
  "21st Yeongjo",
  "22nd Jeongjo",
  "23rd Sunjo",
  "24th Hunjong",
  "25th Cheoljong",
  "26th Gojong",
  "27th Sunjong",
  "27th Sunjong:revised",
]

const year_all = Object(year_all_json)
const data_all = []

function App() {
  
  return (
    <div> 
    <header style={{boxShadow: "0 4px 12px #080a2939"}}>
      <div style={styles.topNavbar}>
        2022 EMNLP 
      </div>
      {/* <div style={styles.topNavbarContents}>
        <a 
          href="./" 
          style={styles.topNavbarlogoText}
        >
          <div> 
            2022 <br />  EMNLP  
          </div>
        </a>
        
            <div style={styles.topNavbarElemText}>
              Code
            </div>
      </div>  */}
    </header>
    <body style={styles.body}> 
    <div style={styles.title} > 
      <b>H2KE: Translating Hanja historical documents to understandable Korean and English</b>
    </div>
    <Router>
    <div style={{'display': 'flex'}}> 
        <ProSidebar>
          <Menu iconShape="square">
            <Link to="/">
              <MenuItem >README</MenuItem>
            </Link>
              {
                king_all.map((e, i) => (
                    <SubMenu title={`${e}`} >
                      {
                        year_all[i+1].map((key) => (
                          <MenuItem>
                            <Link to={`${i+1}_${key}`}> Year {key}</Link>
                          </MenuItem>
                        ))
                      }
                    </SubMenu>
                  ))
              }
          </Menu>
        </ProSidebar>
        <ScrollToTop>
      <Routes>
        
        <Route exact path="/" element={<IntroView/>}/>
        {
          data_all.map((e, i )=> (
                Object.keys(e).map((key, j) => (
                  <Route 
                      path={`${i+1}_${key}`} 
                      element={<YearView 
                                  king_name={king_all[i]}
                                  volume_n={key}
                                  contents={e[key]}
                              />}
                    />
                ))
          ))
        }
        {
          king_all.map((e, i) => 
            year_all[i+1].map(key => 
                <Route 
                  path={`${i+1}_${key}`} 
                  element={
                    <YearView 
                      king_name={e}
                      king_n={i+1}
                      year_n={key}
                      // contents={}
                      />}
                    />    
            )
          )
        }
        
      </Routes>
      </ScrollToTop>
    </div>
    </Router>
    </body>
    </div>
  );
}

export default App;


const styles = {
  title: {
    fontSize: '2em',
    marginBlockStart: '0.67em',
    marginBlockEnd: '0.67em',
    display: 'flex',
    padding: '16px 0px'
  },
  topNavbar: {
    backgroundColor: "#053886",
    width: "100%",
    padding: "0px 36px",
    display: 'flex',
    color: "#ffffff",
    fontWeight: 300,
    fontSize: '0.75rem'
  },
  topNavbarContents: {
    padding: "10px 36px",
    display: "flex",
    flex: 2,
    justifyContent : 'space-between',
    alignItems: 'center',
    paddingTop: '10px',
    boxSizing: 'border-box',

  },
  topNavbarlogoText: {
    display: 'block',
    fontSize: '1.1rem',
    lineHeight: '1.2rem',
    fontWeight: 700,
    color: 'inherit',
    textDecoration: 'none'
  },
  topNavbarElemText: {
    display: 'flex',
  },
  body: {
    padding: "0px 36px"
  }
}