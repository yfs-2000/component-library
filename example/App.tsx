import React, { useState, useEffect } from "react";
const Index: React.FC<{ consoleFiber: () => void }> = ({ consoleFiber }) => {
  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(0);
  useEffect(() => {
    //第一次渲染 为 0 缓存树为null
    //第二次渲染为  1  缓存树为0
    //第二次渲染 缓存树与值不一致 渲染为1  缓存树为1
    //第三次一致  缓存树与值一致 不动
    //
    consoleFiber(); // 每次fiber更新后，打印 fiber 检测 fiber变化
  });
  console.log(number);
  return (
    <div className="page">
      <div className="content">
        <span>{number}</span>
        <br />
        <button onClick={() => setNumber(1)}>将number设置成1</button>
        <button onClick={() => setNumber1(2)}>将number设置成2</button>
        <br />
      </div>
    </div>
  );
};
export default class Home extends React.Component {
  consoleChildrenFiber = () => {
    // console.log(
    //   // @ts-ignore
    //   this._reactInternals.child
    // ); /* 用来打印函数组件 Index 对应的fiber */
  };
  render() {
    return <Index consoleFiber={this.consoleChildrenFiber} />;
  }
}
