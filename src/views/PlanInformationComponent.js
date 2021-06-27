import React from 'react';
import { connect}from 'react-redux';
import SubscriptionPlanCard from "./SubscriptionPlanCard";

/**
 * For user login
 * @param {props} props
 */
function PlanIformationComponent(props) {
        return props.plans.map((planObject) => <SubscriptionPlanCard plan={planObject} key={planObject.id} />);
   

}

export default connect()(PlanInformationComponent);
