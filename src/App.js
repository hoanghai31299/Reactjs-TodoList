import React,{Component} from 'react';
import './App.css';
import classNames from 'classnames';
import TodoItem from './components/TodoItem';
const localStorageKey = 'todoKey';
let localTodoList = JSON.parse(localStorage.getItem(localStorageKey));
if(!localTodoList) localTodoList = [];
class App extends Component {
  constructor(props){
    super(props);
    this.checkAll = true;
    this.state = {
      filter: 'all',
      todoList:[
        ...localTodoList,
      ],
      currentInput: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onClickItem = this.onClickItem.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.checkAllClick = this.checkAllClick.bind(this);
    this.onFilterAllClick = this.onFilterAllClick.bind(this);
    this.onFilterCompleteClick = this.onFilterCompleteClick.bind(this);
    this.onFilterUncompleteClick = this.onFilterUncompleteClick.bind(this);
    this.onClearCompleteClick = this.onClearCompleteClick.bind(this);
    this.onDeleteItemClick = this.onDeleteItemClick.bind(this);
  }
  onClickItem(item){
    return ()=>{
    const {todoList} = this.state;
    const index = todoList.indexOf(item);
    this.setState({
      todoList: [ 
        ...todoList.slice(0,index),
        {...todoList[index],isComplete: !todoList[index].isComplete},
        ...todoList.slice(index+1)
      ]
      })
    
  }
  }
  onKeyUp(event){
    let text = event.target.value;
      if(event.keyCode !== 13){
        this.setState({
          currentInput:text
        })
      }
      else {
        if(!text.trim())
          return;
        else{
          this.setState({
            currentInput: '',
            todoList:[
            {content:text,isComplete:false},
            ...this.state.todoList
            ]
          });
        }
      }
  }
  onChange(event){
    this.setState({
      currentInput: event.target.value
    })
  }
  checkAllClick(){ 
    let shallowTodo = [...this.state.todoList];
    shallowTodo.forEach(el=>{
      el.isComplete = this.checkAll;
    })
    this.setState({
      todoList:[
        ...shallowTodo
      ]
    })
    this.checkAll = !this.checkAll;
  }
  onFilterAllClick(){
    this.setState({
      ...this.state,
      filter: 'all'
    }); 
  }
  onFilterCompleteClick(){
    this.setState({
      ...this.state,
      filter: 'complete'
    }); 
  }
  onFilterUncompleteClick(){
    this.setState({
      ...this.state,
      filter: 'uncomplete'
    }); 
  }
  onClearCompleteClick(){
    this.setState(
      {
        todoList: [...this.state.todoList.filter(item=>!item.isComplete)]
      }
    )
  }
  onDeleteItemClick(item){
    return ()=>{
      let index = this.state.todoList.indexOf(item);
      this.setState((oldState)=>{
      return{
        todoList: this.state.todoList.filter((it,i)=>{
           return i !== index;
        })
      }
      })
    }
  }
  render(){
    localStorage.setItem(localStorageKey,JSON.stringify([...this.state.todoList]));
    const {todoList,currentInput,filter} = this.state;
    let listFelted = [...todoList];
    if (filter === 'complete') listFelted = listFelted.filter(item=>item.isComplete)
    if (filter ==='uncomplete')  listFelted = listFelted.filter(item=>!(item.isComplete))
    let countUncomplete = todoList.filter(item=>!item.isComplete).length;
    let countComplete = todoList.filter(item=>item.isComplete).length;
  return (
    <div className="App">
      <h1 className = "title">todos</h1>
        <div className = "wrapper">
        <div className = "input">
            <div className = "check-control">
               <span onClick = {this.checkAllClick} role="img" aria-labelledby="circle">🔰</span>
            </div>
            <input id="inputTodo" type="text"
              value = {currentInput}
              autoFocus
              placeholder="Type your todo" 
              onChange={this.onChange}
              onKeyUp={this.onKeyUp} />
        </div>
        {
          listFelted.map((item,index)=>{
              return <TodoItem className = "todo"
               key={index} 
               item = {item} 
               onClickItem={this.onClickItem(item)}
               onDeleteItemClick = {this.onDeleteItemClick(item)}
                 />
          })
        }
        <div className = "footer">
          <span>{countUncomplete===1?"1 item left":countUncomplete+" items left"}</span>
          <div className = "filter">
            <button className={classNames({active: filter === 'all'})}
             onClick={this.onFilterAllClick}>All</button>
            <button className={classNames({active: filter === 'complete'})}
             onClick={this.onFilterCompleteClick}>Complete</button>
            <button className={classNames({active: filter === 'uncomplete'})}
             onClick={this.onFilterUncompleteClick}>Uncomplete</button>
        </div>
        <button className = {classNames("clear-complete",{active:countComplete})}
        onClick = {this.onClearCompleteClick}>Clear Completed</button>
      </div>
      </div>
    </div>
  );
  }
}

export default App;
