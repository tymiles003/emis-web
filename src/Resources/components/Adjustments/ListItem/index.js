import { Icon, Avatar, Col, Row, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import './styles.css';

/**
 * @class
 * @name AdjustmentListItem
 * @description Single adjustment list item component.
 * Render single adjustment item details
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class AdjustmentListItem extends Component {
  /* props validation */
  static propTypes = {
    itemName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    warehouseName: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    onDeselectItem: PropTypes.func.isRequired,
  };

  state = {
    isHovered: false,
  };

  /**
   * @function
   * @name handleMouseEnter
   * @description show item actions on hover
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  /**
   * @function
   * @name handleMouseLeave
   * @description hide item actions on hover
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  /**
   * @function
   * @name handleToggleSelect
   * @description Handle toggling list item checkbox
   *
   * @param {Object} event Event object
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleToggleSelect = event => {
    const { isSelected } = this.state;
    const { onSelectItem, onDeselectItem } = this.props;

    this.setState({ isSelected: !isSelected });

    if (event.target.checked) {
      onSelectItem();
    } else {
      onDeselectItem();
    }
  };

  render() {
    const {
      itemName,
      type,
      warehouseName,
      quantity,
      cost,
      reason,
      color,
      isSelected,
    } = this.props;
    const { isHovered } = this.state;
    let sideComponent = null;

    if (isSelected) {
      sideComponent = (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      );
    } else {
      sideComponent = isHovered ? (
        <Checkbox
          className="Checkbox"
          onChange={this.handleToggleSelect}
          checked={isSelected}
        />
      ) : (
        <Avatar style={{ backgroundColor: color }}>
          {itemName.toUpperCase().charAt(0)}
        </Avatar>
      );
    }

    return (
      <div
        className="AdjustmentListItem"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Row>
          <Col span={1}>{sideComponent} </Col>
          <Col span={4}>{itemName}</Col>
          <Col span={3}>{type}</Col>
          <Col span={2}>{quantity}</Col>
          <Col span={3}>{cost}</Col>
          <Col span={4}>{reason}</Col>
          <Col span={4}>{warehouseName}</Col>
          <Col span={3}>
            {isHovered && (
              <Fragment>
                <Icon
                  type="database"
                  title="Archive adjustment"
                  className="actionIcon"
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AdjustmentListItem;
