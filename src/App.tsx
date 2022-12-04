/*
 * @Author: yanbinru 18303671156@163.com
 * @Date: 2022-12-04 13:53:15
 * @LastEditors: yanbinru 18303671156@163.com
 * @LastEditTime: 2022-12-04 22:15:07
 * @FilePath: /webpack-react/src/App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import './app.scss'
function App(){
    const handle=()=>{
        alert('请点击')
    }
    return (
        <div className='appWrapper'>
  hello word    
  <button onClick={handle}> 点击 </button>
    </div>
      
    )
}
export default App