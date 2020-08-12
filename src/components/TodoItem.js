import React,{Component} from 'react';
import './TodoItem.css'
import classNames from 'classnames'
class TodoItem extends Component{
    render(){
        const {item,onClickItem,onDeleteItemClick} = this.props;
        return (
            <div className = "TodoItem">
                <div className = "uncheck" 
                 onClick = {onClickItem}> {item.isComplete?"✔":""}
                </div>
                <p className = {classNames({complete:item.isComplete})}>{item.content}</p>
                <span className = "delete" role="img" aria-labelledby="delete" onClick={onDeleteItemClick}>❌</span>
            </div>
        )
    }
}
export default TodoItem;