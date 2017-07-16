import PropTypes from 'prop-types';

const Contents = ({elements}) =>
  elements.map((node, i) => {
    var id = 'content' + i;
    return (
      <div id={id} className="tab show-content">
        {node}
      </div>
    )
  })

Contents.propTypes = {
  elements: PropTypes.array.isRequired
}

export default Contents;
