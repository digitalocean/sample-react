import React, {Component} from "react";
import templates from "./templates";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export class TemplatesData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      visible: 9,
      error: false,
      count:0
    };

    this.loadMore = this.loadMore.bind(this);
  }

  loadMore() {
    this.setState((prev) => {
      return {visible: prev.visible + 9};
    });
  }

  componentDidMount() {
    this.setState({items: templates})
  }

  viewTeplate = (id, e) => {
    e.preventDefault();
    alert(id);
  }

  render() {
    return (
      <section className="templateFeed feeds">
        <div className="tiles" aria-live="polite">
          {this.state.items.slice(0, this.state.visible).map((item, index) => {
              return (
                <div className="tile fade-in" key={item.id} value={item.id}>
                  <div className="imageBlk" value={index+1}  onClick={(e) => this.viewTeplate(item.id, e)}><img src={`/media/template/`+item.image} height="auto" width="100%" /></div>
                  <div className="feedBase"><span className="tempTitle">{item.title}</span> <span className="option-label">{item.element}</span>  <span className="option-label">{item.cat}</span></div>
                </div>
              );
            })}
          </div>
          {this.state.visible < this.state.items.length &&
              <Button variant="contained" className='load-more' onClick={this.loadMore}> Load more </Button>
          }
        </section>
    );
  }
}

export default TemplatesData;