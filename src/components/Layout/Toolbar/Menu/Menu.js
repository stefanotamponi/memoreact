import React from 'react';
import { connect } from 'react-redux';

import { pageInfo } from '../../../../shared/utility';
import EditCategory from '../../../Category/EditCategory/EditCategory';
import EditToDo from '../../../ToDo/EditToDo/EditToDo';
import EditUser from '../../../User/EditUser';
import Tile from '../../../UI/Tile/Tile';
import * as actions from '../../../../store/actions';
import './Menu.css';

const menu = props => {
  let pageType = pageInfo(props.location.pathname).type;
  let pageName = pageInfo(props.location.pathname).location;
  let menuOps = null;

  switch (pageType) {
    case 'home':
      menuOps = (
        <nav>
          <h3 className="Menu__title">Homepage Placeholders</h3>
          <hr />
          <ul>
            <li><EditUser action="logout" /></li>
            <li><EditUser action="delete" /></li>

          </ul>
        </nav>
      );
      break;

    case 'category':
      menuOps = (
        <nav>
          <h3 className="Menu__title">Category Options</h3>
          <hr />
          <ul>
            <li><EditCategory action="edit" category={pageName} /></li>
            <li><EditCategory action="delete" category={pageName} /></li>
          </ul>
        </nav>
      );
      break;
    
      case 'todo':
        menuOps = (
          <nav>
            <h3 className="Menu__title">{pageName}</h3>
            <hr />
            <ul>
              <li><EditToDo action="delete" todo={pageName} /></li>
            </ul>
          </nav>
        )

    default:
      break;
  }


  return (
    <div className="Menu">
      {menuOps}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  }
}

export default connect (mapStateToProps) (menu);