import React, { Component } from 'react';

export default class Prime extends React.Component {
  //ーーーーーーー戻り値関数ーーーーーーーーーー
  //約数の配列：任意の自然数
  divisor = (num) => {
    var results = [];
    for(var i=2; i<=num; i++) {
        if( (num%i == 0) ) {
            results.push(i);
        }
    }
    return results;
  }
  //共通約数の配列：2つの数
  divisorCheck = (firstDivs, secondDivs) => {
    // let testDivs = ['2','3','4']
    var commonDivs = [];
    for(var i = 0; i < firstDivs.length; i++){
      for(var j = 0;  j < secondDivs.length; j++){
        if(firstDivs[i] == secondDivs[j]){
          commonDivs.push(firstDivs[i]);
        }
      }
    }
    return commonDivs;
  }
　//ーーーーーーーステート関数ーーーーーーーーー
  //入力の固定？
  handleChange (e) {
      this.setState({value: e.target.value})
  }
  //最大文字数の入力制限
  maxLengthCheck = (e) => {
   if (e.target.value.length > e.target.maxLength) {
    e.target.value = e.target.value.slice(0, e.target.maxLength)
     }
  }
  //ステート,handleChange
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      name: '',
      firstNum: '',
      secondNum: '',
      message: '相性の良いペアを入力すると良いことがあるかも、、、',
      commonComment: '',
      specialComment: '',
      debug: 'debug',
    };
    this.handleChange = this.handleChange.bind(this)
  }
  //1,2個目の数字を反映
  setFirstNum = (e) => {
    this.setState({
      firstNum: e.target.value
    });
    this.maxLengthCheck(e)
  }
  setSecondNum = (e) => {
    this.setState({
      secondNum: e.target.value
    });
    this.maxLengthCheck(e)
  }
  //乱数自動生成、putNumbers(),
  setRandomNums = () => {
    var randoms = [Math.floor(Math.random() * 1000),Math.floor(Math.random() * 1000)];

    this.setState({
      debug: `デバッグ\n自動生成数FirstのState:${randoms[0]}自動生成SecondのState:${randoms[1]}`,
      firstNum: randoms[0],
      secondNum: randoms[1],
    })
    this.putMessages();
  }
  setCommonComment = (quantity) => {
    var commonComment;
    if(quantity == 2){
      commonComment = `21組に1組のカップルです！`;
    }else if(quantity == 3){
      commonComment = `21組に1組のカップルです！`;
    }else if(quantity == 4){
      commonComment = `405組に1組のカップルです！`;
    }else if(quantity == 5){
      commonComment = `88組に1組のカップルです！`;
    }else if(6 <= quantity){
      commonComment = `運命の人です！！`;
    }
    this.setState({
      commonComment: commonComment,
    })
  }
  //特殊コメントの設置
  setSpecialComment = (array) => {
    var specialComment;
    const first = array[0];
    const second = array[1];
    //友愛数チェック
    const fraternitys = ['220','284'];
    const fraCheck = JSON.stringify(fraternitys) == JSON.stringify(array);

    //婚約数チェック
    const engagements = [['48','75'],['140','195']];
    let i = 0;
    while(i < engagements.length){
      var engCheck = JSON.stringify(engagements[i]) == JSON.stringify(array);
      if( engCheck ){
        break;
      }
      i ++;
    }

    if(fraCheck){
      specialComment = '友愛数です！！';
      console.debug(specialComment);
    }else if(engCheck){
      specialComment = '婚約数です！！';
      console.debug(specialComment);
    }else if(first == second && first != ''){
      specialComment = '同じ数です!';
    }else if(first % second == 0){
      specialComment = `数Aが数Bの倍数です！`;
      console.debug(specialComment);
    }else if(second % first == 0){
      specialComment = `数Bが数Aの倍数です！`;
      console.debug(specialComment);
    }
    this.setState({
      specialComment: specialComment,
    });
  }
  putMessages = () => {
    //数字を取得
    let first = this.state.firstNum;
    let second = this.state.secondNum;
    //それぞれの数字の約数の配列を取得
    const firstDivs = this.divisor(first);
    const secondDivs = this.divisor(second);
    const commonDivs = this.divisorCheck(firstDivs, secondDivs);
    console.debug(commonDivs);
    var quantity = commonDivs.length;
    var message;
    //入力された数字を昇順に並び替え
    var array = [first,second];
    array.sort(function(a,b){
      return a - b;
    });


    //ーーーーーーーデバッグーーーーーー
    // console.debug(array)
    // console.debug(fraternitys)
    // <input type="number"/>で入力されるのは文字列だと言う事が判明した、詐欺

    // var div = this.divisor(140);
    // console.debug(div);
    // this.setState({
    //   debug: div,
    // });
    //ーーーーーーーーーーーーーーーーー
    var aboutDiv = this.getComDivData(quantity);
    if(quantity == 0){
      message = '互いに素です'
    }else{
      message = `共通の約数を${quantity+1}個持っています！`;
      message += `共通の約数が${quantity+1}個ある確率は${aboutDiv[1]}%です`;
    }
    //共通約数の個数で場合分けする関数作りたい
    // console.debug(message);
    //メッセージのカテゴライジング
    // if(first == second && first != ''){
    //   message = '同じ数です!';
    // }else if(first % second == 0){
    //   message = `数Aが数Bの倍数です！共通の約数を${quantity}個持っています！`;
    //   message += `共通の約数が${quantity}個ある確率は${this.getComDivData(quantity)[1]}%です`;
    //   console.debug(message);
    // }else if(second % first == 0){
    //   message = `数Bが数Aの倍数です！共通の約数を${quantity}個持っています！`;
    //   message += `共通の約数が${quantity}個ある確率は${this.getComDivData(quantity)[1]}%です`;
    //   console.debug(message);
    // }else if(quantity > 0){
    //
    // }else{
    //   message = '互いに素';
    //   message += 'です';
    // }
    // ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
    //commentのセット関数＊２

    this.setState({
      message: message
    });
    this.setSpecialComment(array);
    this.setCommonComment(quantity);
  }

  //共通約数のパーセント
  getComDivData = (quantity) => {
    var data = [[0, 60.8383], [1, 27.5034], [2, 4.6931], [3, 4.8886], [4, 0.2475], [5, 1.1412], [6, 0.0144], [7, 0.4366], [8, 0.0566],[9, 0.0478], [11, 0.0977], [13, 0.0031], [14, 0.0034], [15, 0.0172], [17, 0.0059], [19, 0.0025], [20, 0.0001], [23, 0.0022], [26, 0.0001], [27, 0.0001], [29, 0.0001], [31, 0.0001]];
    for(var i = 0;i < data.length; i++){
      if(quantity == data[i][0]){
        return data[i];
      }
    }
    // return data[6];
  }
  render() {
    const { todos } = this.state;
    return (
    <div>
      <h1>カップル数占い</h1>
      <input type="number" min={1} max={999} maxLength={3}
        placeholder='数を入力する' value={this.state.firstNum}
        onInput={this.maxLengthCheck} onChange={this.setFirstNum} class ='firstInput'/>
      <input type="number" min={1} max={999} maxLength={3}
        placeholder='数を入力する' value={this.state.secondNum}
        onInput={this.maxLengthCheck} onChange={this.setSecondNum} />

      {
      // <h2>{this.state.firstNum}</h2>
      // <h2>{this.state.secondNum}</h2>
      }
      <button onClick={
        () => this.putMessages()} >登録</button>
      <button onClick={
          () => this.setRandomNums()}>自動生成</button>
        <h2>message:{this.state.message}</h2>
      <h2>commonComment:{this.state.commonComment}</h2>
      <h2>specialComment:{this.state.specialComment}</h2>
      <h3>{this.state.debug}</h3>

      {
      // <input min={1} max={999} maxLength={3} step = "11" placeholder='数を入力する'
      //   value={this.state.debug} onChange={this.handleChange} />
      // <h3>数Aの値：{this.state.firstNum}</h3>
      // <ul>
      //   {todos.map((todo, index) => <li key={index}>
      //     {todo}
      //     <button onClick={() => { this.removeTodo(index) }}>削除</button>
      //   </li>)}
      // </ul>
      }
    </div>
  
  );
  }
}
