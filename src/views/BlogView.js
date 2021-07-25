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
    const dummyPost1 = {
        image: 'https://cbsnews3.cbsistatic.com/hub/i/r/2021/06/14/9d3833d6-9ece-4e9d-8a49-58de8ea170ed/thumbnail/620x413/0da11f0cec1da21e2c6e28d00f357415/2021-06-14t034749z-486606328-rc220o963qso-rtrmadp-3-usa-dogshow-westminster.jpg',
        imageText: 'Wasabi',
        title: 'Westminster Dog Show 2021: The Flavor of the Moment Is Wasabi',
        description: 'Wasabi the Pekingese won Best in Show at Westminster, held this year at a riverside estate in Westchester County',
        linkText: 'Read more...',
        link: 'https://www.nytimes.com/live/2021/06/13/sports/westminster-dog-show',
        text: 'Wasabi, a low-slung Pekingese named through bloodlines for a Michigan sushi restaurant, won Best in Show at the Westminster Kennel Club Dog Show on Sunday, his long tresses winning out in a field that included a trim whippet, a bushy sheepdog and a blinding white Samoyed that was the top-ranked show dog in the country. Wasabi is the son of a champion Pekingese and the great-grandson of Malachy, the 2012 Best in Show winner who was also bred and shown by Wasabi’s owner and handler, David Fitzpatrick.',
    };
    const dummyPost2 = {
        image: 'https://static.dw.com/image/54627079_303.jpg',
        imageText: 'Dog on a walk',
        title: 'Germany: Dogs must be walked twice a day under new rule',
        description: '"Pets are not cuddly toys," German Agricultural Minister Julia Klöckner said',
        linkText: 'Read more...',
        link: 'https://www.dw.com/en/germany-dogs-must-be-walked-twice-a-day-under-new-rule/a-54627195',
        text: 'The German agriculture minister has announced she will introduce a controversial new law that will require dog owners to walk their canine friends at least twice a day, for a total of at least one hour. The rules would also forbid owners from tying up dogs for long periods of time or leaving them alone all day. Around one in five German homes has a dog; over 9 million dogs are kept as pets in the country. "Pets are not cuddly toys — and their needs have to be considered," Agriculture Minister Julia Klöckner said Monday. She said her ministry was acting in accordance with "new scientific research about dog needs."',
    };

    const dummyPosts = [dummyPost1, dummyPost2];

    return !dummyPosts ? (
        <Loading />
    ) : (
        <>
            {showPremiumBanner(loggedInUser) ? <PremiumBanner /> : null}
            <BlogComponent posts={dummyPosts} />
        </>
    );
}

// connect() establishes allows the usage of redux functionality
export default connect()(BlogView);
