import React,{Component} from 'react';
import checkMark from '../images/check.svg';
import './TodoItem.css'
import classNames from 'classnames'
class TodoItem extends Component{
    render(){
        const {item,onClickItem} = this.props;
        return (
            <div className = "TodoItem">
                {item.isComplete && <img src = {checkMark}
                width = {32} height = {32} 
                alt="check-mark" 
                onClick = {onClickItem} />}
                {!item.isComplete && 
                <div className = "uncheck"
                 onClick = {onClickItem}>
                </div>}
                <p className = {classNames({complete:item.isComplete})}>{item.content}</p>
            </div>
        )
    }
}
export default TodoItem;