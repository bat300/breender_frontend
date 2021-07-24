import React from 'react';
import { connect } from 'react-redux';
import SubscriptionPlanCard from './SubscriptionPlanCard';

/**
 * For choosing subscription plan
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
            excluded: ['Contact pet owners', ' Pay no transaction fees', 'Get pet documents verified', 'Higher position in results', 'No advertisement banners'],
        },
        {
            id: 'premium',
            title: 'Premium',
            price: '4.99',
            included: [
                'View all applications',
                'Phone & Email support',
                'Contact pet owners',
                'Pay no transaction fees',
                'Get pet documents verified',
                'Higher position in results',
                'No advertisement banners',
            ],
            excluded: [],
        },
    ];
    return plans.map((planObject) =>
        planObject.id === 'free' ? (
            <SubscriptionPlanCard plan={planObject} onClick={selectFreePlan} subscriptionPlan={props.subscriptionPlan} />
        ) : (
            <SubscriptionPlanCard plan={planObject} onClick={selectPremiumPlan} subscriptionPlan={props.subscriptionPlan} />
        )
    );
}

export default connect()(SubscriptionPlanComponent);
