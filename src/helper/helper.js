
export const showPremiumBanner = (loggedInUser) => !loggedInUser || (loggedInUser.subscriptionPlan === 'free' && loggedInUser.role !== 'admin');