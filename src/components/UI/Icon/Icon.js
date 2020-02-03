import React from 'react';

const icon = props => {
  let classes = ["Icon"];
  let size = "20";
  if (props.size) {
    size = props.size;
  }

  switch (props.shape) {
    case "add":
        classes.push('far fa-plus-square');
        break;

    case "back":
      classes.push('fa fa-arrow-left');
      break;
      
    case "calendar":
      classes.push('far fa-calendar');
      break;

    case "checked": 
      classes.push('far fa-check-square');
      break;

    case "clock":
      classes.push('far fa-clock');
      break;

    case 'delete':
      classes.push("far fa-trash-alt");
      break;

    case "edit":
      classes.push('far fa-edit');
      break;

    case "fire":
      classes.push('fas fa-fire-alt');
      break;

    case "list":
      classes.push('fas fa-list');
      break;
    
    case "logout":
      classes.push('fas fa-sign-out-alt');
      break;

    case "menu":
      classes.push('fa fa-ellipsis-v');
      break;

    case "react":
      classes.push('fab fa-react');
      break;

    case "search":
      classes.push('fa fa-search');
      break;
    
    case "shield":
      classes.push("fas fa-shield-alt");
      break;
  
    case "square":
      classes.push('far fa-square');
      break;
    
    case "star":
      classes.push('far fa-star');
      break;
    

    default:
      classes = ["Icon"];
  }

  return (
    <i 
      className={classes.join(' ')}
      onClick={props.clicked}
      style={{fontSize: size + "px"}}
    ></i>
  );
}

export default icon;