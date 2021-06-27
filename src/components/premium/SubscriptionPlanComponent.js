import React from 'react';
import { connect} from 'react-redux';
import SubscriptionPlanCard from "./SubscriptionPlanCard";

/**
 * For user login
 * @param {props} props
 */
function SubscriptionPlanComponent(props) {

      function selectFreePlan() {
        props.onClick('free');
    }
    function selectPremiumPlan() {
        props.onClick('premium');
    }


    const plans = [
        {
            id: 'free',
            title: 'Free',
            price: '0.00',
            included: ['View all applications', 'Phone & Email support'],
            excluded: ['Contact pet owners', ' Pay no transaction fees', 'Verify pet documents', 'Higher position in results', 'No advertisement banners'],
            buttonText: 'choose',
            buttonVariant: 'contained',
        },
        {
            id: 'premium',
            title: 'Premium',
            subheader: 'Most popular',
            price: '9.00',
            included: ['View all applications', 'Phone & Email support', 'Contact pet owners', 'Pay no transaction fees', 'Verify pet documents', 'Higher position in results', 'No advertisement banners'],
            excluded: [],
            buttonText: 'choose',
            buttonVariant: 'contained',
        },
        
    ];
        return plans.map((planObject) => planObject.id === 'free'? <SubscriptionPlanCard plan={planObject} onClick={selectFreePlan} /> : <SubscriptionPlanCard plan={planObject} onClick={selectPremiumPlan} />);
   

}

export default connect()(SubscriptionPlanComponent);
