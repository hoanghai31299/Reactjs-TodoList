import React,{Component} from 'react';
import './TodoItem.css'
import classNames from 'classnames'
class TodoItem extends Component{
    onInputEnter = e=>{
        if(e.keyCode === 13)
        this.props.onNotEdit();
    }
    render(){
        const {item,onClickItem,onDeleteItemClick,onEditItemClick,onNotEdit,onEditChange} = this.props;
        return (
            <div className = "TodoItem">
                <div className = "uncheck" 
                 onClick = {onClickItem}> {item.isComplete?"✔":""}
                </div>
                {  
                item.isEditing?
                <input onChange={onEditChange}
                onKeyUp={this.onInputEnter}
                 autoFocus onBlur={onNotEdit} type = "text" className = "input-edit" value={item.content}/>
                :<p onDoubleClick={onEditItemClick}
                className = {classNames({complete:item.isComplete})}>{item.content}</p> }
                <span className = "delete" role="img" aria-labelledby="delete" onClick={onDeleteItemClick}>❌</span>
            </div>
        )
    }
}
export default TodoItem;