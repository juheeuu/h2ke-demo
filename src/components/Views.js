import React, { useState, useEffect } from 'react';
import {Button, Table} from 'react-bootstrap'

function Item(props) {
    return (
        <div> 
            <b> {props.title} </b>
            <Table striped bordered hover style={styles.itemTableStyle}>
                <tbody >
                    <tr>
                    <th width="50px"> Hanja</th>
                    <td> {props.hj} </td>
                    </tr>
                    <tr>
                    <th> gt-oKo </th>
                    <td> {props.gt_oko} </td>
                    </tr>
                    {
                        (props.gt_nko)
                        ?    <tr>
                        <th> gt-nKo </th>
                        <td> {props.gt_nko} </td>
                        </tr>
                        : null
                    }
                    {
                        (props.gt_en)
                        ?    <tr>
                        <th> gt-EN </th>
                        <td> {props.gt_en} </td>
                        </tr>
                        : null
                    }
                    {
                        props.h2ke_nko
                        ? <tr>
                        <th> H2KE-nKo </th>
                        <td> {props.h2ke_nko} </td>
                        </tr>
                        : null
                    }
                    {
                        props.h2ke_en
                        ? <tr>
                        <th> H2KE-EN </th>
                        <td> {props.h2ke_en} </td>
                        </tr>
                        : null
                    }
                </tbody>
            </Table>
        </div>
    )
}

function DayView(props) {
    const articles = Object.keys(props.articles).sort((a, b)=> parseInt(a)-parseInt(b))
    return (
        <div style={styles.itemContainerStyle}> 
        {
            articles.map((key, i) => (
                <Item
                    key={`${props.key}-${key}`}
                    title={`Article #${key}`}
                    hj={props.articles[key]['hj']}
                    gt_oko={props.articles[key]['gt-oKo']}
                    gt_nko={props.articles[key]['gt-nKo']}
                    gt_en={props.articles[key]['gt-EN']}
                    h2ke_nko={props.articles[key]['H2KE-nKo']}
                    h2ke_en={props.articles[key]['H2KE-EN']}
                />
            ))
        }
        </div>
    )
}


function MonthView(props) {
    const days = Object.keys(
                    props.contents_m).sort(
                        (a, b)=> parseInt(a)-parseInt(b))
    
    const [dayValue, setDayValue] = useState(-1)

    function dayInttoString(int_str) {
        const int = parseInt(int_str)
        if (int % 10 === 1) {
            return int.toString() +'st'
        } else if (int === 2 || int === 22) {
            return int.toString() +'nd'
        } else if (int === 3 || int === 23) {
            return int.toString() +'rd'
        }
        return int.toString() + 'th'
    }

    return (
        <div style={styles.monthViewStyle}> 
            <div style={styles.monthTextStyle}>
                <b> 
                    {props.name_m}
                </b>
            </div>
            <div style={styles.dayContainerStyle}> 
            <div style={styles.dayButtonsStyle}>
                {
                    days.map((key, i) => (
                        <div style={styles.dayButtonStyle}
                            key={`${props.king_n}-${props.year_n}-${key}`}
                        >
                        <Button
                            variant={
                                dayValue === i ? "secondary"
                                : "outline-secondary"
                            }
                            size="sm"
                            onClick={()=> {
                                setDayValue(
                                    dayValue === i ? -1 : i
                                )
                            }}
                        >
                            {
                                dayInttoString(key)
                            }
                        </Button>
                        </div>
                    ))
                }
            </div> 
            <div> 
                {
                    dayValue !== -1
                    ? <DayView 
                        day={days[dayValue]}
                        articles={props.contents_m[days[dayValue]]}
                        />
                    : <div></div>
                }
            </div>
            </div>
        </div>
    )
}

export function IntroView(props) {
    return (<div style={{...styles.marinContainerStyle, 
                            display: 'flex', 
                            justifyContent: 'space-between'
                            }}> 
        <div style={styles.introTextStyle}>
        <b>The Annals of Joseon Dynasty (AJD)</b> contain the daily records of the Kings of Joseon, 
        the 500-year kingdom preceding the modern nation of Korea. 
        The Annals were originally written in an archaic Korean writing system, <b>Hanja</b>, 
        and translated into Korean from 1968 to 1993. <br/> <br/>
        However, this translation was literal and contained many archaic Korean words;  
        thus a new expert translation effort began in 2012, completing the records of only one king in a decade.
        Also, expert translators are working on an English translation, of which only one king's records are 
        available because of the high cost and slow progress. <br/> <br/>
        Thus, we propose <b>H2KE</b>, the neural machine translation model that <b>translates 
        Hanja historical documents to understandable Korean and English.</b>
        Based on the multilingual neural machine translation approach, 
        it translates the historical document written in Hanja, using both
        the full dataset of outdated Korean translation and a small dataset of recently translated Korean and English. <br/> <br/>
        We translate the entire AJD to <b>new Korean</b> and <b>English</b> and openly release the translations to the public in this page.
        </div>
        <Table striped bordered  
            style={{
                width: '40%', 
                verticalAlign: 'middle',
                // paddingLeft: '30px',
                marginRight: '10%',
                height: '35em'
        }}>
        <tbody>
            <tr>
            <th style={{textAlign: 'center'}}> Hanja</th>
            <td> 
                改淸州牧爲西原縣. 以<span style={{color: 'red'}}>劇賊</span> 
                胎生邑, <span style={{color: 'blue'}}>降號</span>也. 
            </td>
            </tr>
            <tr>
            <th style={{textAlign: 'center'}}> Original <br/> Korean Translations <br/> (gt-oKo) </th>
            <td> 
                청주목을 서원현으로 고쳤다. <span style={{color: 'red'}}>극적</span>이 태생한 고을은 <span style={{color: 'blue'}}>강호</span>하기 때문이다. <br/><br/>
                Eng.) Cheongju-mok was renamed Seowon-hyeon. It is because the town gets <span style={{color: 'blue'}}>gangho</span>
                if <span style={{color: 'red'}}>geukjeok</span> is born.
            </td>
            </tr>
            <tr>
            <th style={{textAlign: 'center'}}> New <br/> Korean Translations <br/> (gt-nKo) </th>
            <td> 
                청주목을 서원현으로 고쳤다.  <span style={{color: 'red'}}>극악한 역적</span>
                이 태어난 고을이므로 읍호를 강등한 것이다. <br/><br/>
                Eng.) Cheongju-mok was renamed Seowon-hyeon. 
                Since it is a town where <span style={{color: 'red'}}>a vicious traitor</span> was born, 
                the town was <span style={{color: 'blue'}}>demoted</span>.
            </td>
            </tr>
        </tbody>
        </Table>
    </div>)
}

export function YearView(props) {

    const [ data, setData ] = useState({})
    const getData = () => {
        fetch(`data/${props.king_n}-${props.year_n}.json`, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }
        ).then((res) => res.json()).then((res) => {
            setData(res)
        })
    }

    useEffect (()=>{
        getData()
      })

    function convertMonth(month) {
        const month_info = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug", 9: "Sep", 10: "Oct", 
            11: "Nov", 12: "Dec"
        }
        if (month.startsWith("leap month")) {
            const num = parseInt(month.split(" ")[2])
            return month_info[num] + " (leap month)"
        } else {
            return month_info[parseInt(month)]
        }
    }


    return(
        <div style={styles.marinContainerStyle}>
        <h3>{props.king_name} - Year {props.year_n}</h3>
        <div style={styles.monthsContainerStyle}>
        {
            Object.keys(data).sort(
                function(a, b) {
                    const new_a = a.startsWith("leap month") 
                                ? parseFloat(a.split(" ")[2]) + 0.5 
                                : parseFloat(a)
                    const new_b = b.startsWith("leap month") 
                                ? parseFloat(b.split(" ")[2]) + 0.5 
                                : parseFloat(b)
                    return  new_a - new_b
                }
            ).map((key) => (
                <MonthView 
                    key={`${props.king_n}-${props.year_n}-${key}`}
                    king_n={props.king_n}
                    year_n={props.year_n}
                    name_m={convertMonth(key)}
                    contents_m={data[key]} 
                />
            ))
        }
        </div>
    </div>)
}

const styles = {
    monthViewStyle: {
        padding: '12px 12px'
    },
    monthTextStyle: {
        color: '#21358b',
        fontSize: '1.3em',
    },
    dayButtonsStyle: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    dayContainerStyle: {
        padding: "12px 12px"
    },
    dayButtonStyle: {
        padding: "3px 3px"
    },
    marinContainerStyle: {
        padding: "20px 0px 0px 40px",
        width: "80%"
    },
    introTextStyle: {
        paddingRight: "40px",
        width: "45%",
    },
    itemContainerStyle: {
        paddingLeft: "20px",
        paddingTop: "10px"
    }, 
    itemTableStyle: {
        marginTop: "8px",
        marginBottom: "12px"
    }, 
    monthsContainerStyle: {
        paddingTop: "13px"
    }
}