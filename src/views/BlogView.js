// components import
import BlogComponent from '../components/blog/BlogComponent';
import Loading from '../components/Loading';
// helper imports
import PremiumBanner from 'components/PremiumBanner';
import { useLoggedInUser } from 'helper/hooks/auth.hooks';
import { showPremiumBanner } from 'helper/helpers';
import { connect } from 'react-redux';

function BlogView(props) {
    const loggedInUser = useLoggedInUser();
    const isDummyLoaded = true;

    return !isDummyLoaded ? (
        <Loading />
    ) : (
        <>
            {showPremiumBanner(loggedInUser) ? <PremiumBanner /> : null}
            <BlogComponent />
        </>
    );
}

// connect() establishes allows the usage of redux functionality
export default connect()(BlogView);
