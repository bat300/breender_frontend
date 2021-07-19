import HttpService from './HttpService';

export default class SubscriptionService {
    static baseURL() {
        return 'http://localhost:4000/subscription';
    }

    static update(id, subscriptionPlan, paymentPlan, paymentMethod) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${SubscriptionService.baseURL()}/update`,
                { id: id,
                   subscriptionPlan: subscriptionPlan,
                   paymentPlan: paymentPlan,
                   paymentMethod: paymentMethod
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
}