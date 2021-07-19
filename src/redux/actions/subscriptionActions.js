import SubscriptionService from "services/SubscriptionService";

export function update(id, subscriptionPlan, paymentPlan, paymentMethod,onSuccess=() => null, onError=(err) => null) {
    const updateUserAction = (user) => {
        onSuccess();
        return { type: 'UPDATE_SUCCESS', user: user };
    };

    return async (dispatch) => {
        await SubscriptionService.update(id, subscriptionPlan, paymentPlan, paymentMethod).then((resp) => dispatch(updateUserAction(resp.user))).catch((e) => {
                onError(e);
            });
            
    };
}

