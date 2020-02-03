import React from 'react';
import { connect } from 'react-redux';

import Category from '../../Category/Category';
import EditCategory from '../../Category/EditCategory/EditCategory';
import Wrapper from '../../Layout/Wrapper/Wrapper';

const dashboard = props => {
  let categories = null;
  if (props.categories) {
    categories = Object.keys(props.categories).map(key => {
      if (props.categories[key].children) {
        return (
          <Category 
            icon={props.categories[key].icon}
            count={props.categories[key].children.length}
            name={key}
            key={key} />
        );
      } else {
        return (
          <Category 
            icon={props.categories[key].icon}
            count="0"
            name={key}
            key={key} />
        )
      };
    });
  };

  return (
    <div className="Dashboard">
      <section>
        <Wrapper>
          {categories}
        </Wrapper>
      </section>
      <section>
        <Wrapper>
          <EditCategory action='add' />
        </Wrapper>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.core
  }
} 

export default connect (mapStateToProps) (dashboard);