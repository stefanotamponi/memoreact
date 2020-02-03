import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import EditToDo from '../../ToDo/EditToDo/EditToDo';
import ToDo from '../../ToDo/ToDo';
import Wrapper from '../../Layout/Wrapper/Wrapper';
import "./CategoryView.css";


const categoryView = props => {
  let { category } = useParams();
  let completedTodo = [];
  let todo = [];

  if (props.categories[category]) {
    if (props.categories[category].children) {
      props.categories[category].children.map(el => {
        if (el.completed) {
          completedTodo.push(el);
        } else {
          todo.push(el);
        }
      })
    }
  } 

  let todoMap = todo.map(el => (
    <ToDo title={el.title} key={el.title} completed={el.completed} />
  ));

  let completedMap = completedTodo.map(el => (
    <ToDo title={el.title} key={el.title} completed={el.completed} />
  ));
  
  return (
    <div className="CategoryView" >
      <section>
        <Wrapper>
          {todoMap}
        </Wrapper>
      </section>
      <section className="CategoryView__completed">
        <Wrapper>
          <h5 className="CategoryView__title">
            Completed
          </h5>
        </Wrapper>
        <hr></hr>
        <Wrapper>
          {completedMap}
        </Wrapper>
      </section>
      <section>
        <Wrapper>
          <EditToDo parent={category} />
        </Wrapper>
      </section>
      {/*Go back, you're not a category!*/}
      {(category == 'auth') ? <Redirect to="/" /> : null} 
    </div>
  );
}

const mapStateToProps = state => {
  return {
    categories: state.core
  }
}

export default connect (mapStateToProps) (categoryView);
