import { Badge, Button, Card, Col, Popover, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './styles.css';

/**
 * @function
 * @name PlanOptions
 * @description Plan Options
 *
 * @param {object} props props object
 * @param {Function} props.onEditPlan callback for edit action
 *
 * @returns {object} React element
 *
 * @version 0.1.0
 * @since 0.1.0
 */
const PlanOptions = ({ onEditPlan }) => (
  <>
    <div>
      <Button icon="poweroff" className="b-0">
        Activate
      </Button>
    </div>
    <div>
      <Button icon="sound" className="b-0">
        Disseminate
      </Button>
    </div>
    <div>
      <Button icon="edit" className="b-0" onClick={onEditPlan}>
        Edit Plan
      </Button>
    </div>
    <div>
      <Button icon="hdd" className="b-0">
        Archive Plan
      </Button>
    </div>
  </>
);

/**
 * @class
 * @name PlansGridListItem
 * @description Plan card component
 * A card component renders in plan list
 *
 * @version 0.1.0
 * @since 0.1.0
 */
class PlansGridListItem extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = { showPopover: false };

  /**
   * @function
   * @name handlePopoverVisibilityChange
   * @description Handle popover visibility change
   *
   * @param {boolean} isVisible flag for showing popover component
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handlePopoverVisibilityChange = isVisible => {
    this.setState({ showPopover: isVisible });
  };

  /**
   * @function
   * @name handleHidePopover
   * @description Handle hide popover component
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleHidePopover = () => {
    this.setState({ showPopover: false });
  };

  /**
   * @function
   * @name handleEditPlan
   * @description Handle edit plan action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleEditPlan = () => {
    const { onEditPlan } = this.props;
    onEditPlan();
    this.handleHidePopover();
  };

  /**
   * @function
   * @name handleDisseminatePlan
   * @description Handle disseminate plan action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleDisseminatePlan = () => {
    this.handleHidePopover();
  };

  /**
   * @function
   * @name handleActivatePlan
   * @description Handle activate plan action
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  handleActivatePlan = () => {
    this.handleHidePopover();
  };

  render() {
    const { showPopover } = this.state;

    const {
      id,
      incidentType,
      jurisdiction,
      level,
      description,
      match,
      nature,
      family,
      owner,
      activityCount,
      color,
      updatedAt,
    } = this.props;

    return (
      <Card
        className="PlansGridListItem"
        style={{
          borderLeft: `3px solid ${color}`,
          padding: 0,
        }}
      >
        <Link to={`${match.url}/${id}`} title={description}>
          <Row justify="space-between">
            <Col span={21} xl={18} xxl={20}>
              <h3 title={incidentType}>{incidentType}</h3>
              <p
                className="subtitle"
                style={{ fontSize: '11px', color: '#0092df' }}
              >
                {`${nature} > ${family}`}
              </p>
              <p className="subtitle">{`Area: ${jurisdiction} (${level})`}</p>
              <p className="subtitle">{`Created by: ${owner}`}</p>
            </Col>
            <Col span={3} xl={6} xxl={4} className="activitiesBadge">
              <Badge
                count={activityCount}
                style={{
                  backgroundColor: '#fff',
                  color: '#999',
                  boxShadow: '0 0 0 1px #d9d9d9 inset',
                }}
              />
              <p className="activitiesBadgeTitle">Activities</p>
            </Col>
          </Row>
          <p className="subtitle">
            Last Review Date:{' '}
            {new Intl.DateTimeFormat('en-GB').format(new Date(updatedAt))}
          </p>
        </Link>
        <Popover
          content={<PlanOptions onEditPlan={this.handleEditPlan} />}
          trigger="hover"
          placement="bottomRight"
          visible={showPopover}
          onVisibleChange={this.handlePopoverVisibilityChange}
        >
          <Button icon="ellipsis" className="ActionButton" />
        </Popover>
      </Card>
    );
  }
}

PlansGridListItem.propTypes = {
  activityCount: PropTypes.number,
  color: PropTypes.string,
  description: PropTypes.string,
  family: PropTypes.string,
  id: PropTypes.string.isRequired,
  incidentType: PropTypes.string.isRequired,
  jurisdiction: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  match: PropTypes.shape({ url: PropTypes.string }).isRequired,
  nature: PropTypes.string,
  onEditPlan: PropTypes.func.isRequired,
  owner: PropTypes.string,
  updatedAt: PropTypes.string.isRequired,
};

PlansGridListItem.defaultProps = {
  activityCount: 0,
  color: '#0071fc',
  nature: 'N/A',
  family: 'N/A',
  owner: 'N/A',
  description: '',
};

PlanOptions.propTypes = {
  onEditPlan: PropTypes.func.isRequired,
};

export default withRouter(PlansGridListItem);
