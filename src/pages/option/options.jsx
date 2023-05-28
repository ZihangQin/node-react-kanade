import React from "react";



export default class Options extends React.Component {
  render() {
    const { options } = this.props;
    return (
      <div>
        {options.map(option => (
          <div key={option.id} style={{ backgroundColor: option.bgColor, height: '82vh', color: '#fff', overflow: 'auto' }}>
            {option.content}
          </div>
        ))}
      </div>
    );
  }
}