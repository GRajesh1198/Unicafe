import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const Button=({handleClick,text})=>{
  return(
    <button onClick={handleClick}>{text}</button>
  )
}
const Statistics=({count,text})=>
(
      <>
            <td>{text}</td>
            <td>{count}</td>
  
      </>
  )
const Display=({totalCount,text})=>{
  return(
    <>
      <td>{text}</td>
      <td>{totalCount}</td>
    </>
  )
}
const Average=({totalCount,text,average})=>{
  if(totalCount===0){
    return(
      <>
        <td>{text}</td>
        <td>{totalCount}</td>
      </>
    )
  }
  return(
    <>
      <td>{text}</td>
      <td>{((average)/(totalCount)).toPrecision(2)}</td>
    </>
  )
}
const Positive=({totalCount,text,good})=>{
  if(good===0){
    return(
      <>
        <td>{text}</td>
        <td>{good}</td>
      </>
    )
  }
  return(
    <>
      <td>{text}</td> 
      <td>{(good/(totalCount)*100).toFixed(2)} %</td>
    </>
  )
}
const StatisticsTotal=({feedback})=>{
  const totalCount=feedback.good + feedback.bad+ feedback.neutral
  if(feedback.good===0 && feedback.bad===0 && feedback.neutral===0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
    <table>
    <tbody>
     <tr>
     <Statistics count={feedback.good} text="good"/>
     </tr>
     <tr>
     <Statistics count={feedback.neutral} text="neutral"/>
     </tr>
     <tr>
     <Statistics count={feedback.bad} text="bad"/>
     </tr>
     <tr>
     <Display totalCount={totalCount} text="all"/>
     </tr>
     <tr>
     <Average totalCount={totalCount} text="average" average={feedback.good-feedback.bad}/>
     </tr>
     <tr>
     <Positive totalCount={totalCount} text="positive"good={feedback.good}/>
     </tr>
     </tbody>
    </table>
    </div>
  )
}

const App=()=>{
  const [feedback,setFeedback]=useState({good:0,neutral:0,bad:0})
  const feedbackHandlerGood=()=>{
    const newFeedback={...feedback,good:feedback.good+1}
    setFeedback(newFeedback)
    //console.log("Good Feedback Received",newFeedback.good)
  }

  const feedbackHandlerNeutral=()=>{
    const newFeedback={...feedback,neutral:feedback.neutral+1}
    setFeedback(newFeedback)
    
    //console.log("Neutal Feedback Received")
  }

  const feedbackHandlerBad=()=>{
    const newFeedback={...feedback,bad:feedback.bad+1}
    setFeedback(newFeedback)
    //console.log("Bad feedback Received")
  }

  return(
    <>
      <h1>give feedback</h1>
      <br/>
      <Button handleClick={feedbackHandlerGood} text="good"/>
      <Button handleClick={feedbackHandlerNeutral} text="neutral"/>
      <Button handleClick={feedbackHandlerBad} text="bad"/>
      <br />
      <h1>Statistics</h1>
      <br/>
      <StatisticsTotal feedback={feedback}/>
    </>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))

