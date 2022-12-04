/*
 * @Author: yanbinru 18303671156@163.com
 * @Date: 2022-12-04 13:53:15
 * @LastEditors: yanbinru 18303671156@163.com
 * @LastEditTime: 2022-12-04 20:48:43
 * @FilePath: /webpack-react/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import './app.scss'
import bg from "./image/bg1.jpeg"
// import applogin from "/image/app.jpeg" 

// import logo from "./image/logo512.png"
const App = ()=>{
    return (
        <div className='appWrapper'>
  hello word    
  <img src={bg} alt="" />  
    </div>
      
    )
}
export default App